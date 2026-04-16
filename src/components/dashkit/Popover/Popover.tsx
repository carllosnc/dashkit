import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePopover, usePopoverContext, PopoverContext, type PopoverTriggerMode } from './usePopover';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface PopoverProps {
  children: React.ReactNode;
  trigger?: PopoverTriggerMode;
}

export function Popover({ children, trigger = 'click' }: PopoverProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
  } = usePopover();

  const closeTimer = React.useRef<number | null>(null);

  const onMouseEnter = React.useCallback(() => {
    if (trigger !== 'hover') return;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }, [trigger, setOpen]);

  const onMouseLeave = React.useCallback(() => {
    if (trigger !== 'hover') return;
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [trigger, setOpen]);

  // Handle triggerRect update on open for hover
  React.useEffect(() => {
    if (open && trigger === 'hover' && triggerElement) {
        setTriggerRect(triggerElement.getBoundingClientRect());
    }
  }, [open, trigger, triggerElement, setTriggerRect]);

  return (
    <PopoverContext.Provider value={{
        open,
        setOpen,
        triggerRect,
        setTriggerRect,
        triggerElement,
        setTriggerElement,
        triggerMode: trigger,
        onMouseEnter,
        onMouseLeave
    }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, setOpen, setTriggerRect, setTriggerElement, triggerMode, onMouseEnter, onMouseLeave } = usePopoverContext();

  const toggleOpen = (e: React.MouseEvent) => {
    if (triggerMode === 'hover') return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(!open);
  };

  const internalRef = (node: HTMLElement | null) => {
    setTriggerElement(node);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (triggerMode === 'hover') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTriggerRect(rect);
      onMouseEnter?.();
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{
        onClick?: React.MouseEventHandler;
        ref?: React.Ref<HTMLElement>;
        onMouseEnter?: React.MouseEventHandler;
        onMouseLeave?: React.MouseEventHandler;
    }>, {
      ref: internalRef,
      onClick: (e: React.MouseEvent) => {
        (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
        toggleOpen(e);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        (children.props as { onMouseEnter?: React.MouseEventHandler }).onMouseEnter?.(e);
        handleMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        (children.props as { onMouseLeave?: React.MouseEventHandler }).onMouseLeave?.(e);
        onMouseLeave?.();
      },
    });
  }

  return (
    <div
      ref={internalRef}
      onClick={toggleOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer inline-block"
    >
      {children}
    </div>
  );
}

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'end' | 'center';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

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
             "w-72 max-w-[calc(100vw-2rem)] bg-popover text-popover-fg border border-popover-border ds-rounded shadow-xl p-4 overflow-hidden",
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
