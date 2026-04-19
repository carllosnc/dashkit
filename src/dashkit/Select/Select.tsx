import { type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useSelect } from './useSelect';

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

const CONTAINER_CLASSES = "flex flex-col gap-1.5 w-full font-sans";
const LABEL_CLASSES = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight";
const RELATIVE_CONTAINER = "relative";
const BUTTON_BASE = "w-full px-4 h-9 text-sm bg-input-bg text-input-fg border border-input-border ds-rounded outline-none focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-left flex items-center justify-between gap-2";
const BUTTON_TEXT_BASE = "truncate block";
const BUTTON_TEXT_PLACEHOLDER = "text-ds-500 dark:text-ds-500";
const CHEVRON_BASE = "shrink-0 text-ds-500";
const CHEVRON_OPEN = "rotate-180 text-input-focus-border dark:text-input-dark-focus-border";
const POPOVER_BASE = "p-1 bg-popover text-popover-fg border border-popover-border ds-rounded shadow-lg overflow-hidden";
const ORIGIN_BOTTOM = "origin-bottom";
const ORIGIN_TOP = "origin-top";
const OPTIONS_CONTAINER = "max-h-60 overflow-y-auto flex flex-col gap-0.5";
const NO_OPTIONS = "px-4 py-2 text-sm text-ds-400 text-center";
const OPTION_BASE = "w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 transition-colors ds-rounded";
const OPTION_SELECTED = "bg-popover-item-selected text-popover-item-selected-fg font-semibold";
const OPTION_UNSELECTED = "text-popover-fg hover:bg-popover-item";
const OPTION_TEXT = "truncate";
const CHECK_ICON_CLASSES = "size-4 text-floating-item-selected-fg dark:text-floating-item-dark-selected-fg shrink-0";
const DESCRIPTION_CLASSES = "text-[12px] text-ds-600 dark:text-ds-400 ml-1 tracking-tight";

export function Select({
  label,
  description,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  className,
  disabled
}: SelectProps) {
  const {
    isOpen,
    setIsOpen,
    triggerRect,
    side,
    containerRef,
    buttonRef,
    selectedOption,
    handleKeyDown
  } = useSelect({ options, value, disabled });

  return (
    <div className={CONTAINER_CLASSES} ref={containerRef}>
      {label && (
        <label className={LABEL_CLASSES}>
          {label}
        </label>
      )}
      <div className={RELATIVE_CONTAINER}>
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown as (e: KeyboardEvent<HTMLButtonElement>) => void}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(BUTTON_BASE, className)}
        >
          <span className={cn(
            BUTTON_TEXT_BASE,
            !selectedOption && BUTTON_TEXT_PLACEHOLDER
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown className={cn(
            CHEVRON_BASE,
            isOpen && CHEVRON_OPEN
          )} />
        </button>

        {isOpen && triggerRect && createPortal(
          <div
            id="dashkit-select-portal"
            role="listbox"
            style={{
              position: 'fixed',
              ...(side === 'bottom'
                ? { top: triggerRect.bottom + 8 }
                : { bottom: (window.innerHeight - triggerRect.top) + 8 }),
              left: triggerRect.left,
              width: triggerRect.width,
              zIndex: 9999,
            }}
            className={cn(
              POPOVER_BASE,
              side === 'top' ? ORIGIN_BOTTOM : ORIGIN_TOP
            )}
          >
            <div className={OPTIONS_CONTAINER}>
              {options.length === 0 ? (
                <div className={NO_OPTIONS}>No options available</div>
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
                      OPTION_BASE,
                      opt.value === value ? OPTION_SELECTED : OPTION_UNSELECTED
                    )}
                  >
                    <span className={OPTION_TEXT}>{opt.label}</span>
                    {opt.value === value && (
                      <FiCheck className={CHECK_ICON_CLASSES} />
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
        <span className={DESCRIPTION_CLASSES}>
          {description}
        </span>
      )}
    </div>
  );
}

Select.displayName = 'Select';
