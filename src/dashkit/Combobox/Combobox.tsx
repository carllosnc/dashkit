import { createPortal } from 'react-dom';
import { useId } from 'react';
import { FiChevronDown, FiCheck, FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Chip } from '../Chip/Chip';
import { useCombobox } from './useCombobox';

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

export function Combobox({
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
}: ComboboxProps) {
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    triggerRect,
    side,
    containerRef,
    inputWrapperRef,
    inputRef,
    portalRef,
    selectedOptions,
    filteredOptions,
    handleSelect,
    handleRemoveOption,
    handleInputClick,
    handleInputKeyDown,
    handleClear,
    isOptionSelected,
    activeIndex
  } = useCombobox({
    options,
    value,
    onChange,
    disabled,
    clearSearchOnSelect,
    multiple
  });

  const inputId = useId();
  const listId = useId();
  const activeOptionId =
    isOpen && activeIndex >= 0 && activeIndex < filteredOptions.length
      ? `${listId}-option-${activeIndex}`
      : undefined;

  return (
    <div className={cn('flex flex-col gap-2 w-full font-sans relative', className)} ref={containerRef}>
      {(label || (multiple && selectedOptions.length > 0)) && (
        <div className="flex items-center justify-between px-1">
          {label && (
            <label htmlFor={inputId} className="text-[13px] font-semibold text-ds-700 tracking-tight dark:text-ds-300">
              {label}
            </label>
          )}
          {multiple && selectedOptions.length > 0 && (
            <span className="text-[11px] font-bold text-ds-600 dark:text-ds-400 uppercase tracking-wider">
              {selectedOptions.length} Selected
            </span>
          )}
        </div>
      )}

      {multiple && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          <AnimatePresence>
            {selectedOptions.map(opt => (
              <motion.div
                key={opt.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Chip
                  label={opt.label}
                  onDelete={() => handleRemoveOption(opt.value)}
                  disabled={disabled}
                  className="h-7"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="relative group" ref={inputWrapperRef}>
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-500 transition-colors duration-200 pointer-events-none group-focus-within:text-black dark:group-focus-within:text-white">
          <FiSearch className="size-4" />
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          disabled={disabled}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onClick={handleInputClick}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={multiple && selectedOptions.length > 0 ? "Add more..." : placeholder}
          autoComplete="off"
          className={cn(
            'w-full h-9 pl-10 pr-10 text-base sm:text-sm bg-input-bg text-input-fg border border-input-border ds-rounded outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 disabled:cursor-not-allowed disabled:opacity-50',
            isOpen && 'border-input-focus ring-2 ring-input-focus/20'
          )}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || (multiple ? selectedOptions.length > 0 : value)) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 -m-0.5 rounded-full text-ds-500 transition-all hover:text-black hover:bg-ds-100 dark:hover:text-white dark:hover:bg-ds-800"
              aria-label="Clear selection"
            >
              <FiX className="size-3.5" />
            </button>
          )}
          <div className={cn(
            'text-ds-500 transition-transform duration-300 pointer-events-none',
            isOpen && 'rotate-180'
          )}>
            <FiChevronDown className="size-4" />
          </div>
        </div>

        {isOpen && triggerRect && createPortal(
          <div
            ref={portalRef}
            id={listId}
            role="listbox"
            style={{
              position: 'fixed',
              left: triggerRect.left,
              width: triggerRect.width,
              zIndex: 9999,
              ...(side === 'bottom'
                ? { top: triggerRect.bottom + 8 }
                : { bottom: (window.innerHeight - triggerRect.top) + 8 }),
            }}
            className="p-1 bg-popover text-popover-fg border border-popover-border ds-rounded shadow-lg overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 font-sans pr-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-6 text-sm text-muted-foreground italic text-center">
                  No matches found for "{query}"
                </div>
              ) : (
                filteredOptions.map((opt, index) => {
                  const isSelected = isOptionSelected(opt);
                  return (
                    <button
                      key={opt.value}
                      id={`${listId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        'w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 transition-colors ds-rounded hover:text-popover-fg hover:bg-popover-item',
                        isSelected && 'bg-popover-item-selected text-popover-item-selected-fg font-semibold hover:bg-popover-item-selected'
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <FiCheck className="size-4 shrink-0 text-popover-item-selected-fg" />
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
        <span className="text-[12px] text-ds-500 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
}

Combobox.displayName = 'Combobox';
