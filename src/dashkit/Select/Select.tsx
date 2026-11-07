import { type KeyboardEvent, useId } from 'react';
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
  size?: 'sm' | 'md' | 'lg';
  error?: string;
}

export function Select({
  label,
  description,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  className,
  disabled,
  size = 'md',
  error,
}: SelectProps) {
  const {
    isOpen,
    setIsOpen,
    triggerRect,
    side,
    containerRef,
    buttonRef,
    portalRef,
    selectedOption,
    handleKeyDown,
    handleListKeyDown
  } = useSelect({ options, value, disabled });

  const labelId = useId();
  const valueId = useId();
  const listId = useId();

  return (
    <div className={cn('select', `select--${size}`)} ref={containerRef}>
      {label && (
        <label id={labelId} className="select__label">
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
          aria-controls={isOpen ? listId : undefined}
          aria-labelledby={label ? `${labelId} ${valueId}` : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            'select__trigger',
            `select__trigger--${size}`,
            isOpen && 'select__trigger--open',
            error && 'select__trigger--error',
            className
          )}
        >
          <span
            id={valueId}
            className={cn(
              'select__trigger-text',
              !selectedOption && 'select__trigger-text--placeholder'
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown className={cn(
            'select__chevron',
            isOpen && 'select__chevron--open'
          )} />
        </button>

        {isOpen && triggerRect && createPortal(
          <div
            ref={portalRef}
            id={listId}
            role="listbox"
            onKeyDown={handleListKeyDown}
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
      {(error || description) && (
        <span
          className={cn(
            'select__description',
            error ? 'select__description--error' : 'select__description--default'
          )}
        >
          {error || description}
        </span>
      )}
    </div>
  );
}

Select.displayName = 'Select';
