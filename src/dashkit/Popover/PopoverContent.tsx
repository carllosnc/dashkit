import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopoverContext } from './usePopover';
import { cn } from '../utils/cn';

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'end' | 'center';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

import './popover.css';

export function PopoverContent({
    children,
    className,
    align = 'center',
    side = 'bottom',
    sideOffset = 8
}: PopoverContentProps) {
  const { open, triggerElement, setTriggerRect, triggerRect, triggerMode, onMouseEnter, onMouseLeave } = usePopoverContext();
  const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (open && contentRef.current) {
        setContentRect(contentRef.current.getBoundingClientRect());
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (triggerElement) {
        setTriggerRect(triggerElement.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, triggerElement, setTriggerRect]);

  if (!triggerRect) return null;

  const popoverHeight = contentRect?.height || 0;
  const popoverWidth = contentRect?.width || 0;

  let top = 0;
  let left = 0;
  let actualSide = side;

  if (side === 'bottom' || side === 'top') {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    actualSide = (side === 'bottom' && spaceBelow < popoverHeight && spaceAbove > spaceBelow) || (side === 'top' && spaceAbove < popoverHeight && spaceBelow > spaceAbove)
      ? (side === 'bottom' ? 'top' : 'bottom')
      : side;

    top = actualSide === 'top' ? triggerRect.top - popoverHeight - sideOffset : triggerRect.bottom + sideOffset;

    if (align === 'start') left = triggerRect.left;
    else if (align === 'end') left = triggerRect.right - popoverWidth;
    else left = triggerRect.left + (triggerRect.width - popoverWidth) / 2;
  } else {
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    actualSide = (side === 'right' && spaceRight < popoverWidth && spaceLeft > spaceRight) || (side === 'left' && spaceLeft < popoverWidth && spaceRight > spaceLeft)
      ? (side === 'right' ? 'left' : 'right')
      : side;

    left = actualSide === 'right' ? triggerRect.right + sideOffset : triggerRect.left - popoverWidth - sideOffset;

    if (align === 'start') top = triggerRect.top;
    else if (align === 'end') top = triggerRect.bottom - popoverHeight;
    else top = triggerRect.top + (triggerRect.height - popoverHeight) / 2;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - popoverHeight - 8));

  const style: React.CSSProperties = {
    position: 'fixed',
    top,
    left,
    zIndex: 9999,
  };

  const getAnimationProps = () => {
    switch (actualSide) {
      case 'top': return { y: 4, x: 0, originClass: 'origin-bottom' };
      case 'bottom': return { y: -4, x: 0, originClass: 'origin-top' };
      case 'left': return { y: 0, x: 4, originClass: 'origin-right' };
      case 'right': return { y: 0, x: -4, originClass: 'origin-left' };
      default: return { y: -4, x: 0, originClass: 'origin-top' };
    }
  };

  const animProps = getAnimationProps();

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
           ref={contentRef}
           id="dashkit-popover-portal"
           initial={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           onMouseEnter={triggerMode === 'hover' ? onMouseEnter : undefined}
           onMouseLeave={triggerMode === 'hover' ? onMouseLeave : undefined}
           transition={{ duration: 0.15, ease: "easeOut" }}
           style={style}
           className={cn(
             "popover__content",
             animProps.originClass,
             className
           )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
