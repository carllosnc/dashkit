import { type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useSelect } from './useSelect';
import './select.css';

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
    <div className="select" ref={containerRef}>
      {label && (
        <label className="select__label">
          {label}
        </label>
      )}
      <div className="select__trigger-wrapper">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown as (e: KeyboardEvent<HTMLButtonElement>) => void}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn('select__trigger', className)}
        >
          <span className={cn(
            'select__trigger-text',
            !selectedOption && 'select__trigger-text--placeholder'
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown className={cn(
            'select__chevron',
            isOpen && 'select__chevron--open'
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
              'select__popover',
              side === 'top' ? 'select__popover--side-top' : 'select__popover--side-bottom'
            )}
          >
            <div className="select__options-container">
              {options.length === 0 ? (
                <div className="select__no-options">No options available</div>
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
                      'select__option',
                      opt.value === value ? 'select__option--selected' : 'select__option--default'
                    )}
                  >
                    <span className="select__option-text">{opt.label}</span>
                    {opt.value === value && (
                      <FiCheck className="select__check-icon" />
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
        <span className="select__description">
          {description}
        </span>
      )}
    </div>
  );
}

Select.displayName = 'Select';
