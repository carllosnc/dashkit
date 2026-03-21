import { useState, useRef, useEffect, useMemo } from 'react';
import { FiChevronDown, FiCheck, FiSearch, FiX } from 'react-icons/fi';
import { cn } from '../../utils/cn';
import { Chip } from '../Chip/Chip';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  label?: string;
  description?: string;
  placeholder?: string;
  options: ComboboxOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
  disabled?: boolean;
  /** Whether to clear search when an option is selected. Defaults to false. */
  clearSearchOnSelect?: boolean;
  /** Whether to allow multiple selections. Defaults to false. */
  multiple?: boolean;
}

/**
 * A searchable select component that combines an input for filtering with a dropdown for selection.
 * Supports single and multiple selection modes.
 */
export const Combobox = ({
  label,
  description,
  placeholder = 'Search or select...',
  options,
  value,
  onChange,
  className,
  disabled,
  clearSearchOnSelect = false,
  multiple = false
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter(opt => value.includes(opt.value));
    }
    if (!multiple && typeof value === 'string') {
      const found = options.find(opt => opt.value === value);
      return found ? [found] : [];
    }
    return [];
  }, [options, value, multiple]);

  const selectedOption = selectedOptions[0];

  // When dropdown opens, we might want to reset query to the selected label (single only)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen && !multiple) {
      const nextQuery = selectedOption?.label || '';
      if (query !== nextQuery) {
        setQuery(nextQuery);
      }
    }
  }

  const filteredOptions = useMemo(() => {
    const safeQuery = query.toLowerCase().trim();
    // In multi-mode we filter by query always
    // In single-mode we filter by query unless matches exactly the selected option
    if (!safeQuery || (!multiple && selectedOption && query === selectedOption.label)) {
      return options;
    }
    return options.filter(opt => 
      opt.label.toLowerCase().includes(safeQuery)
    );
  }, [options, query, selectedOption, multiple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: ComboboxOption) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.includes(option.value);
      const nextValue = isSelected 
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      
      onChange?.(nextValue);
      setQuery(''); // Always clear search on multi-select
    } else {
      onChange?.(option.value);
      if (clearSearchOnSelect) {
        setQuery('');
      } else {
        setQuery(option.label);
      }
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (val: string) => {
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter(v => v !== val));
    }
  };

  const handleInputClick = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
    setQuery('');
    inputRef.current?.focus();
  };

  const isOptionSelected = (opt: ComboboxOption) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(opt.value);
    }
    return value === opt.value;
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full font-sans relative", className)} ref={containerRef}>
      {(label || (multiple && selectedOptions.length > 0)) && (
        <div className="flex items-center justify-between px-1">
          {label && (
            <label className="text-[13px] font-semibold text-base-700 dark:text-base-300 tracking-tight">
              {label}
            </label>
          )}
          {multiple && selectedOptions.length > 0 && (
            <span className="text-[11px] font-bold text-base-400 uppercase tracking-wider">
              {selectedOptions.length} Selected
            </span>
          )}
        </div>
      )}

      {/* Multi-select Chips Container (Outside for cleaner input) */}
      {multiple && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1 animate-in fade-in duration-300">
          {selectedOptions.map(opt => (
            <Chip 
              key={opt.value} 
              label={opt.label} 
              onDelete={() => handleRemoveOption(opt.value)}
              disabled={disabled}
              className="h-7"
            />
          ))}
        </div>
      )}
      
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-200 pointer-events-none">
          <FiSearch className="size-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onClick={handleInputClick}
          onFocus={() => setIsOpen(true)}
          placeholder={multiple && selectedOptions.length > 0 ? "Add more..." : placeholder}
          autoComplete="off"
          className={cn(
            "w-full h-9 pl-10 pr-10 text-sm bg-white dark:bg-base-950 border rounded-md transition-all duration-200",
            "border-base-300 dark:border-base-800 outline-none",
            "focus:border-black dark:focus:border-white focus:ring-4 focus:ring-base-100 dark:focus:ring-base-900/40",
            "placeholder:text-base-500 dark:placeholder:text-base-500",
            disabled && "cursor-not-allowed bg-base-200 dark:bg-base-900 border-base-300 dark:border-base-800 text-base-400 dark:text-base-600",
            isOpen && "border-black dark:border-white ring-4 ring-base-100 dark:ring-base-900/40"
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || (multiple ? selectedOptions.length > 0 : value)) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-base-500 hover:text-black dark:hover:text-white hover:bg-base-100 dark:hover:bg-base-800 transition-all"
              aria-label="Clear selection"
            >
              <FiX className="size-3.5" />
            </button>
          )}
          <div className={cn(
            "text-base-500 transition-transform duration-300 pointer-events-none",
            isOpen && "rotate-180"
          )}>
            <FiChevronDown className="size-4" />
          </div>
        </div>

        {isOpen && (
          <div 
            className={cn(
              "absolute top-full left-0 w-full mt-2 py-1.5 bg-white dark:bg-base-900 border border-base-200 dark:border-base-800 rounded-lg shadow-2xl z-50 overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-6 text-sm text-base-500 dark:text-base-400 italic text-center">
                  No matches found for "{query}"
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = isOptionSelected(opt);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors",
                        "hover:bg-base-100 dark:hover:bg-base-800/80",
                        isSelected 
                          ? "bg-base-50 dark:bg-base-800/50 font-semibold text-black dark:text-white" 
                          : "text-base-600 dark:text-base-400"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <FiCheck className="size-4 text-black dark:text-white shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {description && (
        <span className="text-[12px] text-base-500 dark:text-base-500 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
};

Combobox.displayName = 'Combobox';
