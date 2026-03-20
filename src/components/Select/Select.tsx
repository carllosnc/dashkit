import { useState, useRef, useEffect } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "w-full px-4 h-10 text-sm bg-white dark:bg-base-950 border rounded-md outline-none transition-all duration-200",
            "border-base-300 dark:border-base-800 text-left",
            "flex items-center justify-between gap-2",
            "focus:border-black dark:focus:border-white focus:ring-4 focus:ring-base-100 dark:focus:ring-base-900/40",
            disabled && "cursor-not-allowed bg-base-200 dark:bg-base-900 border-base-300 dark:border-base-800 text-base-400 dark:text-base-600",
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
            isOpen && "rotate-180 text-black dark:text-white"
          )} />
        </button>

        {isOpen && (
          <div 
            role="listbox"
            className={cn(
              "absolute top-full left-0 w-full mt-2 py-1.5 bg-white dark:bg-base-900 border border-base-200 dark:border-base-800 rounded-lg shadow-xl z-50 overflow-hidden",
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
          </div>
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
