import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const Select = ({ 
  label, 
  description, 
  placeholder = 'Select an option', 
  options, 
  value, 
  onChange, 
  className, 
  disabled 
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  // Update trigger rect when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setTriggerRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  // Close when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('dashkit-select-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full font-sans" ref={containerRef}>
      {label && (
        <label className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "w-full px-4 h-9 text-sm bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-left flex items-center justify-between gap-2",
            className
          )}
        >
          <span className={cn(
            "truncate block",
            !selectedOption && "text-ds-500 dark:text-ds-500"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown className={cn(
            "transition-transform duration-300 shrink-0 text-ds-500",
            isOpen && "rotate-180 text-input-focus-border dark:text-input-dark-focus-border"
          )} />
        </button>

        {isOpen && triggerRect && createPortal(
          <div 
            id="dashkit-select-portal"
            role="listbox"
            style={{
              position: 'fixed',
              top: triggerRect.bottom + 8,
              left: triggerRect.left,
              width: triggerRect.width,
              zIndex: 9999,
            }}
            className={cn(
              "p-1 bg-popover text-popover-foreground border border-border rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5">
              {options.length === 0 ? (
                <div className="px-4 py-2 text-sm text-ds-400 text-center">No options available</div>
              ) : (
                options.map((opt) => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={opt.value === value}
                    onClick={() => {
                      onChange?.(opt.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors",
                      opt.value === value && "bg-accent text-accent-foreground font-semibold"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {opt.value === value && (
                      <FiCheck className="size-4 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
      {description && (
        <span className="text-[12px] text-ds-600 dark:text-ds-400 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
};

Select.displayName = 'Select';


