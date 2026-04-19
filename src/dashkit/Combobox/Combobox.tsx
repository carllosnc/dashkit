import { createPortal } from 'react-dom';
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

const CONTAINER_CLASSES = "flex flex-col gap-2 w-full font-sans relative";
const LABEL_AREA_CLASSES = "flex items-center justify-between px-1";
const LABEL_CLASSES = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 tracking-tight";
const SELECTED_COUNT_CLASSES = "text-[11px] font-bold text-ds-400 uppercase tracking-wider";
const CHIPS_WRAPPER_CLASSES = "flex flex-wrap gap-2 mb-1";
const INPUT_CONTAINER_CLASSES = "relative group";
const SEARCH_ICON_WRAPPER_CLASSES = "absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-200 pointer-events-none";
const INPUT_CLASSES = "w-full h-9 pl-10 pr-10 text-sm bg-input-bg text-input-fg border border-input-border ds-rounded outline-none transition-all duration-200 focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";
const INPUT_OPEN_CLASSES = "ring-2 ring-ring ring-offset-2 ring-offset-transparent border-input";
const ACTION_BUTTONS_CLASSES = "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1";
const CLEAR_BUTTON_CLASSES = "p-1 rounded-full text-ds-500 hover:text-black dark:hover:text-white hover:bg-ds-100 dark:hover:bg-ds-800 transition-all";
const CHEVRON_CLASSES = "text-ds-500 transition-transform duration-300 pointer-events-none";
const POPOVER_CLASSES = "p-1 bg-popover text-popover-fg border border-popover-border ds-rounded shadow-lg overflow-hidden";
const SCROLL_AREA_CLASSES = "max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-0.5 font-sans pr-1";
const EMPTY_STATE_CLASSES = "px-4 py-6 text-sm text-muted-foreground italic text-center";
const ITEM_CLASSES = "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 transition-colors ds-rounded";
const ITEM_ACTIVE_CLASSES = "bg-popover-item-selected text-popover-item-selected-fg font-semibold";
const ITEM_HOVER_CLASSES = "text-popover-fg hover:bg-popover-item";
const CHECK_ICON_CLASSES = "size-4 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg shrink-0";
const DESCRIPTION_CLASSES = "text-[12px] text-ds-500 dark:text-ds-500 ml-1 tracking-tight";

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
    <div className={cn(CONTAINER_CLASSES, className)} ref={containerRef}>
      {(label || (multiple && selectedOptions.length > 0)) && (
        <div className={LABEL_AREA_CLASSES}>
          {label && (
            <label className={LABEL_CLASSES}>
              {label}
            </label>
          )}
          {multiple && selectedOptions.length > 0 && (
            <span className={SELECTED_COUNT_CLASSES}>
              {selectedOptions.length} Selected
            </span>
          )}
        </div>
      )}

      {multiple && selectedOptions.length > 0 && (
        <div className={CHIPS_WRAPPER_CLASSES}>
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

      <div className={INPUT_CONTAINER_CLASSES} ref={inputWrapperRef}>
        <div className={SEARCH_ICON_WRAPPER_CLASSES}>
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
            INPUT_CLASSES,
            isOpen && INPUT_OPEN_CLASSES
          )}
        />

        <div className={ACTION_BUTTONS_CLASSES}>
          {(query || (multiple ? selectedOptions.length > 0 : value)) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={CLEAR_BUTTON_CLASSES}
              aria-label="Clear selection"
            >
              <FiX className="size-3.5" />
            </button>
          )}
          <div className={cn(
            CHEVRON_CLASSES,
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
            className={POPOVER_CLASSES}
          >
            <div className={SCROLL_AREA_CLASSES}>
              {filteredOptions.length === 0 ? (
                <div className={EMPTY_STATE_CLASSES}>
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
                        ITEM_CLASSES,
                        isSelected ? ITEM_ACTIVE_CLASSES : ITEM_HOVER_CLASSES
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <FiCheck className={CHECK_ICON_CLASSES} />
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
        <span className={DESCRIPTION_CLASSES}>
          {description}
        </span>
      )}
    </div>
  );
}

Combobox.displayName = 'Combobox';

