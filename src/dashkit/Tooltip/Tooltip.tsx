import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
  triggerEl: HTMLElement | null;
  animate: boolean;
  tooltipId: string;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

export function Tooltip({
  children,
  delay = 0,
  className,
  animate = true
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animate?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = React.useId();

  const handleOpen = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    setTriggerEl(el);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setTriggerRect(rect);
      setOpen(true);
    }, delay);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  // Clear any pending open timer on unmount so a delayed tooltip can't set
  // state after the component is gone.
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect, triggerEl, animate, tooltipId }}>
      <div
        className={cn('inline-block', className)}
        onMouseEnter={(e) => handleOpen(e.currentTarget)}
        onMouseLeave={handleClose}
        onFocus={(e) => handleOpen(e.currentTarget)}
        onBlur={handleClose}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(TooltipContext);
  const describedBy = context?.open ? context.tooltipId : undefined;

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; 'aria-describedby'?: string }>;
    return React.cloneElement(child, {
      className: cn(child.props.className),
      'aria-describedby': [child.props['aria-describedby'], describedBy].filter(Boolean).join(' ') || undefined,
    });
  }
  return <span aria-describedby={describedBy}>{children}</span>;
}

export interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

const arrowSideClasses: Record<NonNullable<TooltipContentProps['side']>, string> = {
  top: 'bottom-[-5px] left-1/2 -translate-x-1/2 border-r border-b',
  bottom: 'top-[-5px] left-1/2 -translate-x-1/2 border-l border-t',
  left: 'right-[-5px] top-1/2 -translate-y-1/2 border-r border-t',
  right: 'left-[-5px] top-1/2 -translate-y-1/2 border-l border-b',
};

export function TooltipContent({
  children,
  className,
  side = 'top',
  sideOffset = 8
}: TooltipContentProps) {
  const context = React.useContext(TooltipContext);
  if (!context) throw new Error('TooltipContent must be used within a Tooltip');

  const { open, triggerRect, triggerEl, animate, tooltipId } = context;
  const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (open && contentRef.current) {
      setContentRect(contentRef.current.getBoundingClientRect());
    }
  }, [open]);

  if (!triggerRect) return null;

  const getPosition = () => {
    if (!contentRect) return { top: 0, left: 0 };

    let top = 0;
    let left = 0;

    switch (side) {
      case 'top':
        top = triggerRect.top - contentRect.height - sideOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - sideOffset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + sideOffset;
        break;
    }

    return { top, left };
  };

  const { top, left } = getPosition();

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          {...getPortalThemeAttrs(triggerEl)}
          id={tooltipId}
          role="tooltip"
          initial={animate ? {
            opacity: 0,
            scale: 0.95,
            y: side === 'top' ? 4 : side === 'bottom' ? -4 : 0,
            x: side === 'left' ? 4 : side === 'right' ? -4 : 0
          } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={animate ? { opacity: 0, scale: 0.95 } : { opacity: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top,
            left,
            zIndex: 9999,
          }}
          className={cn(
            'px-3 py-1.5 text-xs font-medium shadow-lg pointer-events-none relative ds-rounded bg-ds-950 text-ds-0 border border-ds-800 dark:bg-ds-0 dark:text-ds-950 dark:border-ds-200',
            className
          )}
        >
          {children}
          <div
            className={cn(
              'absolute w-2 h-2 rotate-45 bg-ds-950 dark:bg-ds-0 border-ds-800 dark:border-ds-200',
              arrowSideClasses[side]
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

Tooltip.displayName = 'Tooltip';
TooltipTrigger.displayName = 'TooltipTrigger';
TooltipContent.displayName = 'TooltipContent';
