import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck, FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Chip } from '../Chip/Chip';
import { useCombobox } from './useCombobox';

import './combobox.css';

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
    selectedOptions,
    filteredOptions,
    handleSelect,
    handleRemoveOption,
    handleInputClick,
    handleClear,
    isOptionSelected
  } = useCombobox({
    options,
    value,
    onChange,
    disabled,
    clearSearchOnSelect,
    multiple
  });

  return (
    <div className={cn('combobox', className)} ref={containerRef}>
      {(label || (multiple && selectedOptions.length > 0)) && (
        <div className="combobox__label-area">
          {label && (
            <label className="combobox__label">
              {label}
            </label>
          )}
          {multiple && selectedOptions.length > 0 && (
            <span className="combobox__selected-count">
              {selectedOptions.length} Selected
            </span>
          )}
        </div>
      )}

      {multiple && selectedOptions.length > 0 && (
        <div className="combobox__chips-wrapper">
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

      <div className="combobox__input-container" ref={inputWrapperRef}>
        <div className="combobox__search-icon-wrapper">
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
            'combobox__input',
            isOpen && "combobox__input--open"
          )}
        />

        <div className="combobox__action-buttons">
          {(query || (multiple ? selectedOptions.length > 0 : value)) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="combobox__clear-button"
              aria-label="Clear selection"
            >
              <FiX className="size-3.5" />
            </button>
          )}
          <div className={cn(
            'combobox__chevron',
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
              left: triggerRect.left,
              width: triggerRect.width,
              zIndex: 9999,
              ...(side === 'bottom'
                ? { top: triggerRect.bottom + 8 }
                : { bottom: (window.innerHeight - triggerRect.top) + 8 }),
            }}
            className="combobox__popover"
          >
            <div className="combobox__scroll-area">
              {filteredOptions.length === 0 ? (
                <div className="combobox__empty-state">
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
                        'combobox__item',
                        isSelected && 'combobox__item--active'
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <FiCheck className="combobox__check-icon" />
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
        <span className="combobox__description">
          {description}
        </span>
      )}
    </div>
  );
}

Combobox.displayName = 'Combobox';

