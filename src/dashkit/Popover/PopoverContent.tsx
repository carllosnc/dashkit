import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { usePopoverContext } from './usePopover';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';

export interface PopoverContentProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  /** @default 'center' */
  align?: 'start' | 'end' | 'center';
  /** @default 'bottom' */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** @default 8 */
  sideOffset?: number;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      children,
      className,
      align = 'center',
      side = 'bottom',
      sideOffset = 8,
      style: userStyle,
      ...props
    },
    ref
  ) {
    const { open, triggerElement, setTriggerRect, triggerRect, triggerMode, onMouseEnter, onMouseLeave, onFocus, onBlur, portalRef } = usePopoverContext();
    const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);

    const setContentRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        portalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [portalRef, ref]
    );

  React.useLayoutEffect(() => {
    if (open && portalRef.current) {
        setContentRect(portalRef.current.getBoundingClientRect());
    }
  }, [open, portalRef]);

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

  let top: number;
  let left: number;
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
           ref={setContentRef}
           data-slot="popover-content"
           {...getPortalThemeAttrs(triggerElement)}
           initial={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           onMouseEnter={triggerMode === 'hover' ? onMouseEnter : undefined}
           onMouseLeave={triggerMode === 'hover' ? onMouseLeave : undefined}
           onFocus={triggerMode === 'hover' ? onFocus : undefined}
           onBlur={triggerMode === 'hover' ? onBlur : undefined}
           transition={{ duration: 0.15, ease: 'easeOut' }}
           style={{ ...style, ...userStyle }}
           className={cn(
             'w-72 max-w-[calc(100vw-2rem)] bg-popover/95 backdrop-blur-md text-popover-fg border border-popover-border/80 ds-border-width ds-rounded-lg shadow-xl dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_25px_-5px_rgba(0,0,0,0.5)] p-4 overflow-hidden',
             animProps.originClass,
             className
           )}
           {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
});

PopoverContent.displayName = 'PopoverContent';
