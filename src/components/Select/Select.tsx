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
        <label className="text-[13px] font-semibold text-base-700 dark:text-base-300 ml-1 tracking-tight">
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
            "w-full px-4 h-9 text-sm bg-white dark:bg-base-950 border rounded-md outline-none transition-all duration-200",
            "border-base-border dark:border-base-dark-border text-left",
            "flex items-center justify-between gap-2",
            "focus:border-base-border-focus dark:focus:border-base-dark-border-focus focus:ring-4 focus:ring-base-100 dark:focus:ring-base-900/40",
            disabled && "cursor-not-allowed bg-base-200 dark:bg-base-900 border-base-border dark:border-base-dark-border text-base-400 dark:text-base-600",
            className
          )}
        >
          <span className={cn(
            "truncate block",
            !selectedOption && "text-base-500 dark:text-base-500"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown className={cn(
            "transition-transform duration-300 shrink-0 text-base-500",
            isOpen && "rotate-180 text-base-border-focus dark:text-base-dark-border-focus"
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
              "py-1.5 bg-white dark:bg-base-900 border border-base-border dark:border-base-dark-border rounded-lg shadow-2xl overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-4 py-2 text-sm text-base-400 text-center">No options available</div>
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
                      "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors",
                      "hover:bg-base-100 dark:hover:bg-base-800/80",
                      opt.value === value 
                        ? "bg-base-50 dark:bg-base-800/50 font-semibold text-black dark:text-white" 
                        : "text-base-600 dark:text-base-400"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {opt.value === value && (
                      <FiCheck className="size-4 text-black dark:text-white shrink-0" />
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
        <span className="text-[12px] text-base-600 dark:text-base-400 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
};

Select.displayName = 'Select';
