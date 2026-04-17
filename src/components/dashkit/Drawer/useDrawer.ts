import { useEffect } from 'react';
import { type Variants, type PanInfo } from 'framer-motion';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export const POSITION_VARIANTS: Record<DrawerPosition, Variants> = {
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

export function getPositionClasses(position: DrawerPosition) {
  switch (position) {
    case 'left': return 'left-0 top-0 h-full';
    case 'right': return 'right-0 top-0 h-full';
    case 'top': return 'top-0 left-0 w-full';
    case 'bottom': return 'bottom-0 left-0 w-full';
  }
}

export interface UseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position: DrawerPosition;
}

export function useDrawer({ isOpen, onClose, position }: UseDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const defaultSize = (position === 'left' || position === 'right') ? 'max-w-md w-full' : 'max-h-[80vh] h-auto';

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offsetThreshold = 30;
    const velocityThreshold = 100;

    const isClosing =
      (position === 'right' && (info.offset.x > offsetThreshold || info.velocity.x > velocityThreshold)) ||
      (position === 'left' && (info.offset.x < -offsetThreshold || info.velocity.x < -velocityThreshold)) ||
      (position === 'bottom' && (info.offset.y > offsetThreshold || info.velocity.y > velocityThreshold)) ||
      (position === 'top' && (info.offset.y < -offsetThreshold || info.velocity.y < -velocityThreshold));

    if (isClosing) onClose();
  };

  return {
    defaultSize,
    handleDragEnd,
    positionVariants: POSITION_VARIANTS,
    getPositionClasses
  };
}
