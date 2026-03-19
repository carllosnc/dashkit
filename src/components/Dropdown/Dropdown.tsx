import * as React from 'react';
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
  align?: 'left' | 'right';
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
  align?: 'left' | 'right';
}

/**
 * Root Dropdown component
 */
export function Dropdown({ children, align = 'left' }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, align }}>
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
  const { open, setOpen } = useDropdown();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: (e: React.MouseEvent) => {
        (children.props as unknown as { onClick?: React.MouseEventHandler }).onClick?.(e);
        setOpen(!open);
      },
    });
  }

  return (
    <div onClick={() => setOpen(!open)} className="cursor-pointer inline-block">
      {children}
    </div>
  );
}

/**
 * Dropdown Portal (simplified as inline for now, but ready for portal if needed)
 */
export function DropdownContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open, align } = useDropdown();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: -10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: -10 }}
           transition={{ duration: 0.15, ease: "easeOut" }}
           className={cn(
             "absolute z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg",
             "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
             "shadow-xl dark:shadow-black/50 p-1 origin-top",
             align === 'right' ? 'right-0' : 'left-0',
             className
           )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
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
        "hover:bg-neutral-100 dark:hover:bg-white/5",
        destructive ? "text-red-500 hover:text-red-600 dark:hover:bg-red-500/10" : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white",
        selected && "bg-neutral-50 dark:bg-white/5 text-neutral-900 dark:text-white",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {leftIcon && <span className="shrink-0 text-neutral-400">{leftIcon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {selected && <FiCheck className="shrink-0 text-neutral-900 dark:text-white" size={14} />}
      {rightIcon && <span className="shrink-0 text-neutral-400">{rightIcon}</span>}
    </button>
  );
}

/**
 * Dropdown Label (Section title)
 */
export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
      {children}
    </div>
  );
}

/**
 * Dropdown Separator
 */
export function DropdownSeparator() {
  return (
    <div className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" />
  );
}

/**
 * Submenus could be added here later
 */
