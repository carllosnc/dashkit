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
    }

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
    <DropdownContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect }}>
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
  const { open, setOpen, setTriggerRect } = useDropdown();

  const toggleOpen = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: (e: React.MouseEvent) => {
        (children.props as unknown as { onClick?: React.MouseEventHandler }).onClick?.(e);
        toggleOpen(e);
      },
    });
  }

  return (
    <div onClick={toggleOpen} className="cursor-pointer inline-block">
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
    align = 'start'
}: { 
    children: React.ReactNode; 
    className?: string;
    align?: 'start' | 'end';
}) {
  const { open, triggerRect } = useDropdown();
  const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && contentRef.current) {
        setContentRect(contentRef.current.getBoundingClientRect());
    }
  }, [open]);

  if (!triggerRect) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: triggerRect.bottom + 8,
    left: align === 'start' 
        ? triggerRect.left 
        : triggerRect.right - (contentRect?.width || 192), // Default min-w-48 is 192px
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
             "min-w-[12rem] overflow-hidden rounded-lg",
             "bg-white dark:bg-base-900 border border-base-border dark:border-base-dark-border",
             "shadow-2xl dark:shadow-black/60 p-1 origin-top",
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
        "flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
        "hover:bg-base-100 dark:hover:bg-white/5",
        destructive ? "text-red-500 hover:text-red-600 dark:hover:bg-red-500/10" : "text-base-700 dark:text-base-300 hover:text-base-900 dark:hover:text-white",
        selected && "bg-base-50 dark:bg-white/5 text-base-900 dark:text-white",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && <span className="shrink-0 text-base-400">{leftIcon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {selected && <FiCheck className="shrink-0 text-base-900 dark:text-white" size={14} />}
      {rightIcon && <span className="shrink-0 text-base-400">{rightIcon}</span>}
    </button>
  );
}

/**
 * Dropdown Label (Section title)
 */
export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-base-400 dark:text-base-500">
      {children}
    </div>
  );
}

/**
 * Dropdown Separator
 */
export function DropdownSeparator() {
  return (
    <div className="my-1 h-px bg-base-border dark:bg-base-dark-border" />
  );
}
