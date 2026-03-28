import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePopover, usePopoverContext, PopoverContext } from './usePopover';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface PopoverProps {
  children: React.ReactNode;
}

export function Popover({ children }: PopoverProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
  } = usePopover();

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect, triggerElement, setTriggerElement }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, setOpen, setTriggerRect, setTriggerElement } = usePopoverContext();

  const toggleOpen = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(!open);
  };

  const internalRef = (node: HTMLElement | null) => {
    setTriggerElement(node);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler; ref?: React.Ref<HTMLElement> }>, {
      ref: internalRef,
      onClick: (e: React.MouseEvent) => {
        (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
        toggleOpen(e);
      },
    });
  }

  return (
    <div ref={internalRef} onClick={toggleOpen} className="cursor-pointer inline-block">
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
  const { open, triggerElement, setTriggerRect, triggerRect } = usePopoverContext();
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

  if (side === 'bottom' || side === 'top') {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const actualSide = (side === 'bottom' && spaceBelow < popoverHeight && spaceAbove > spaceBelow) || (side === 'top' && spaceAbove < popoverHeight && spaceBelow > spaceAbove)
      ? (side === 'bottom' ? 'top' : 'bottom')
      : side;

    top = actualSide === 'top' ? triggerRect.top - popoverHeight - sideOffset : triggerRect.bottom + sideOffset;

    if (align === 'start') left = triggerRect.left;
    else if (align === 'end') left = triggerRect.right - popoverWidth;
    else left = triggerRect.left + (triggerRect.width - popoverWidth) / 2;
  } else {
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    const actualSide = (side === 'right' && spaceRight < popoverWidth && spaceLeft > spaceRight) || (side === 'left' && spaceLeft < popoverWidth && spaceRight > spaceLeft)
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
           ref={contentRef}
           id="dashkit-popover-portal"
           initial={{ opacity: 0, scale: 0.95, y: -4 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: -4 }}
           transition={{ duration: 0.15, ease: "easeOut" }}
           style={style}
           className={cn(
             "w-72 max-w-[calc(100vw-2rem)] bg-popover text-popover-fg border border-popover-border rounded-[var(--radius)] shadow-lg p-4 origin-top overflow-hidden ring-1 ring-black/5 dark:ring-white/5",
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
