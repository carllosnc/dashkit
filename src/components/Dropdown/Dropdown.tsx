import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDropdown, useDropdownContext, DropdownContext } from './useDropdown';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface DropdownProps {
  children: React.ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
  } = useDropdown();

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect, triggerElement, setTriggerElement }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, setOpen, setTriggerRect, setTriggerElement } = useDropdownContext();

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

export function DropdownContent({
    children,
    className,
    align = 'start',
    side = 'bottom',
    sideOffset = 8
}: {
    children: React.ReactNode;
    className?: string;
    align?: 'start' | 'end' | 'center';
    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;
}) {
  const { open, triggerElement, setTriggerRect, triggerRect } = useDropdownContext();
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

  const dropdownHeight = contentRect?.height || 0;
  const dropdownWidth = contentRect?.width || 0;

  let top = 0;
  let left = 0;
  let actualSide = side;

  if (side === 'bottom' || side === 'top') {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    actualSide = (side === 'bottom' && spaceBelow < dropdownHeight && spaceAbove > spaceBelow) || (side === 'top' && spaceAbove < dropdownHeight && spaceBelow > spaceAbove)
      ? (side === 'bottom' ? 'top' : 'bottom')
      : side;

    top = actualSide === 'top' ? triggerRect.top - dropdownHeight - sideOffset : triggerRect.bottom + sideOffset;

    if (align === 'start') left = triggerRect.left;
    else if (align === 'end') left = triggerRect.right - dropdownWidth;
    else left = triggerRect.left + (triggerRect.width - dropdownWidth) / 2;
  } else {
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    actualSide = (side === 'right' && spaceRight < dropdownWidth && spaceLeft > spaceRight) || (side === 'left' && spaceLeft < dropdownWidth && spaceRight > spaceLeft)
      ? (side === 'right' ? 'left' : 'right')
      : side;

    left = actualSide === 'right' ? triggerRect.right + sideOffset : triggerRect.left - dropdownWidth - sideOffset;

    if (align === 'start') top = triggerRect.top;
    else if (align === 'end') top = triggerRect.bottom - dropdownHeight;
    else top = triggerRect.top + (triggerRect.height - dropdownHeight) / 2;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - dropdownWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - dropdownHeight - 8));

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
           id="dashkit-dropdown-portal"
           initial={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: animProps.y, x: animProps.x }}
           transition={{ duration: 0.15, ease: "easeOut" }}
           style={style}
           className={cn(
             "min-w-[12rem] bg-popover text-popover-fg border border-popover-border ds-rounded shadow-lg p-1 overflow-hidden",
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

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  destructive?: boolean;
  selected?: boolean;
}

export function DropdownItem({
  children,
  onClick,
  className,
  disabled,
  leftIcon,
  rightIcon,
  destructive,
  selected
}: DropdownItemProps) {
  const { setOpen } = useDropdownContext();

  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium ds-rounded transition-colors text-left text-popover-fg hover:bg-popover-item duration-200",
        destructive ? "text-red-500 hover:text-red-600 dark:hover:bg-red-500/10" : "",
        selected && "bg-popover-item-selected text-popover-item-selected-fg font-semibold",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && <span className="shrink-0 text-ds-400">{leftIcon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {selected && <FiCheck className="shrink-0 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg" size={14} />}
      {rightIcon && <span className="shrink-0 text-ds-400">{rightIcon}</span>}
    </button>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ds-400 dark:text-ds-500">
      {children}
    </div>
  );
}

export function DropdownSeparator() {
  return (
    <div className="my-1 h-px bg-border" />
  );
}
