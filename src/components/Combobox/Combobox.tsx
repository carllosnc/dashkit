import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  clearSearchOnSelect?: boolean;
  multiple?: boolean;
}

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
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputWrapperRef.current) {
      setTriggerRect(inputWrapperRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

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
    if (!safeQuery || (!multiple && selectedOption && query === selectedOption.label)) {
      return options;
    }
    return options.filter(opt =>
      opt.label.toLowerCase().includes(safeQuery)
    );
  }, [options, query, selectedOption, multiple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('dashkit-combobox-portal');
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

  const handleSelect = (option: ComboboxOption) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.includes(option.value);
      const nextValue = isSelected
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];

      onChange?.(nextValue);
      setQuery('');
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
            <label className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 tracking-tight">
              {label}
            </label>
          )}
          {multiple && selectedOptions.length > 0 && (
            <span className="text-[11px] font-bold text-ds-400 uppercase tracking-wider">
              {selectedOptions.length} Selected
            </span>
          )}
        </div>
      )}

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

      <div className="relative group" ref={inputWrapperRef}>
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-200 pointer-events-none">
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
            "w-full h-9 pl-10 pr-10 text-sm bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            isOpen && "ring-2 ring-ring ring-offset-2 ring-offset-transparent border-input"
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || (multiple ? selectedOptions.length > 0 : value)) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-ds-500 hover:text-black dark:hover:text-white hover:bg-ds-100 dark:hover:bg-ds-800 transition-all"
              aria-label="Clear selection"
            >
              <FiX className="size-3.5" />
            </button>
          )}
          <div className={cn(
            "text-ds-500 transition-transform duration-300 pointer-events-none",
            isOpen && "rotate-180"
          )}>
            <FiChevronDown className="size-4" />
          </div>
        </div>

        {isOpen && triggerRect && createPortal(
          <div
            id="dashkit-combobox-portal"
            role="listbox"
            style={{
              position: 'fixed',
              top: triggerRect.bottom + 8,
              left: triggerRect.left,
              width: triggerRect.width,
              zIndex: 9999,
            }}
            className={cn(
              "p-1 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 font-sans">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-6 text-sm text-muted-foreground italic text-center">
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
                        "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors",
                        isSelected && "bg-accent text-accent-foreground font-semibold"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <FiCheck className="size-4 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
      </div>

      {description && (
        <span className="text-[12px] text-ds-500 dark:text-ds-500 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
};

Combobox.displayName = 'Combobox';
