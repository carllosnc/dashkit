import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
  triggerElement: HTMLElement | null;
  setTriggerElement: (el: HTMLElement | null) => void;
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined);

function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

export interface DropdownProps {
  children: React.ReactNode;
}

/**
 * Root Dropdown component.
 * Tracks the trigger position to allow the menu to portal out of restricted containers.
 */
export function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If portal is used, we need to check both container and the menu itself
      const menu = document.getElementById('dashkit-dropdown-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const handleScroll = () => {
      if (open) setOpen(false);
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect, triggerElement, setTriggerElement }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/**
 * Dropdown Trigger
 */
export function DropdownTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, setOpen, setTriggerRect, setTriggerElement } = useDropdown();

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

/**
 * Dropdown Content.
 * Portals to the document body to escape `overflow: hidden` restrictions and use a high z-index.
 */
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
  const { open, triggerElement, setTriggerRect, triggerRect } = useDropdown();
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

  if (side === 'bottom' || side === 'top') {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const actualSide = (side === 'bottom' && spaceBelow < dropdownHeight && spaceAbove > spaceBelow) || (side === 'top' && spaceAbove < dropdownHeight && spaceBelow > spaceAbove)
      ? (side === 'bottom' ? 'top' : 'bottom')
      : side;

    top = actualSide === 'top' ? triggerRect.top - dropdownHeight - sideOffset : triggerRect.bottom + sideOffset;
    
    if (align === 'start') left = triggerRect.left;
    else if (align === 'end') left = triggerRect.right - dropdownWidth;
    else left = triggerRect.left + (triggerRect.width - dropdownWidth) / 2;
  } else {
    // Left or Right
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    const actualSide = (side === 'right' && spaceRight < dropdownWidth && spaceLeft > spaceRight) || (side === 'left' && spaceLeft < dropdownWidth && spaceRight > spaceLeft)
      ? (side === 'right' ? 'left' : 'right')
      : side;

    left = actualSide === 'right' ? triggerRect.right + sideOffset : triggerRect.left - dropdownWidth - sideOffset;
    
    if (align === 'start') top = triggerRect.top;
    else if (align === 'end') top = triggerRect.bottom - dropdownHeight;
    else top = triggerRect.top + (triggerRect.height - dropdownHeight) / 2;
  }

  // Final viewport constraints
  left = Math.max(8, Math.min(left, window.innerWidth - dropdownWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - dropdownHeight - 8));

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
           id="dashkit-dropdown-portal"
           initial={{ opacity: 0, scale: 0.95, y: -4 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: -4 }}
           transition={{ duration: 0.1, ease: "easeOut" }}
           style={style}
           className={cn(
             "min-w-[12rem] bg-popover text-popover-foreground border border-border rounded-lg shadow-lg p-1 origin-top overflow-hidden",
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

/**
 * Dropdown Item
 */
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
  const { setOpen } = useDropdown();

  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left text-foreground/80 hover:bg-accent hover:text-accent-foreground duration-200",
        destructive ? "text-red-500 hover:text-red-600 dark:hover:bg-red-500/10" : "",
        selected && "bg-accent text-accent-foreground font-semibold",
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

/**
 * Dropdown Label (Section title)
 */
export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ds-400 dark:text-ds-500">
      {children}
    </div>
  );
}

/**
 * Dropdown Separator
 */
export function DropdownSeparator() {
  return (
    <div className="my-1 h-px bg-border" />
  );
}


