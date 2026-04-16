import { useState, useRef, useEffect } from 'react';
import { type PanInfo } from 'framer-motion';

export type FloatActionPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
};

export const menuPositionClasses = {
  'bottom-right': 'bottom-0 right-0 origin-bottom-right',
  'bottom-left': 'bottom-0 left-0 origin-bottom-left',
  'top-right': 'top-0 right-0 origin-top-right',
  'top-left': 'top-0 left-0 origin-top-left',
};

export interface UseFloatActionMenuProps {
  position: FloatActionPosition;
}

export function useFloatActionMenu({ position }: UseFloatActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isRight = position.includes('right');

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    const isClosing = isRight ? info.offset.x > threshold : info.offset.x < -threshold;
    if (isClosing) setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    menuRef,
    isRight,
    handleDragEnd,
    positionClasses,
    menuPositionClasses
  };
}
