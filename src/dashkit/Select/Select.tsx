import { forwardRef, useCallback, type ButtonHTMLAttributes, type KeyboardEvent, useId } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';
import { useSelect } from './useSelect';

export interface SelectOption {
  value: string;
  label: string;
}

const selectTriggerVariants = cva(
  'w-full text-left flex items-center justify-between gap-2 bg-input-bg text-input-fg border border-input-border ds-input-surface ds-rounded outline-none transition-all duration-200 focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-7 text-xs px-2.5',
        md: 'h-9 text-sm px-4',
        lg: 'h-11 text-base px-4',
      },
      error: {
        true: 'border-ds-danger-500/50 focus:border-ds-danger-500 focus:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus:border-ds-danger-500/50 dark:focus:ring-ds-danger-500/10',
        false: '',
      },
      isOpen: {
        true: 'border-input-focus ring-2 ring-input-focus/20',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
      isOpen: false,
    },
  }
);

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  label?: string;
  description?: string;
  /** @default 'Select an option' */
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  error?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
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
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) {
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
      handleListKeyDown,
    } = useSelect({ options, value, disabled });

    const setTriggerRef = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [buttonRef, ref]
    );

    const labelId = useId();
    const valueId = useId();
    const listId = useId();
    const messageId = useId();
    const hasMessage = !!(error || description);

    return (
      <div
        ref={containerRef}
        data-slot="root"
        data-size={size}
        className="flex flex-col gap-1.5 w-full font-sans"
      >
        {label && (
          <label data-slot="label" id={labelId} className="text-xs font-semibold text-foreground ml-1 tracking-tight">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            {...props}
            ref={setTriggerRef}
            data-slot="trigger"
            type="button"
            disabled={disabled}
            onClick={(e) => {
              if (!disabled) setIsOpen(!isOpen);
              onClick?.(e);
            }}
            onKeyDown={(e) => {
              (handleKeyDown as (ev: KeyboardEvent<HTMLButtonElement>) => void)(e);
              onKeyDown?.(e);
            }}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listId : undefined}
            aria-labelledby={props['aria-labelledby'] ?? (label ? `${labelId} ${valueId}` : undefined)}
            aria-invalid={props['aria-invalid'] ?? (error ? true : undefined)}
            aria-describedby={
              [props['aria-describedby'], hasMessage ? messageId : undefined]
                .filter(Boolean)
                .join(' ') || undefined
            }
            className={cn(
              selectTriggerVariants({ size, error: !!error, isOpen }),
              className
            )}
          >
            <span
              id={valueId}
              className={cn(
                'truncate block',
                !selectedOption && 'text-muted-foreground'
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <FiChevronDown
              className={cn(
                'shrink-0 text-muted-foreground transition-transform duration-200',
                isOpen && 'rotate-180 text-input-focus'
              )}
            />
          </button>

          {isOpen && triggerRect && createPortal(
            <div
              ref={portalRef}
              {...getPortalThemeAttrs()}
              data-slot="content"
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
                'p-1 bg-popover/95 backdrop-blur-md text-popover-fg border border-popover-border/80 ds-border-width ds-popover-shadow ds-rounded-lg overflow-hidden',
                side === 'top' ? 'origin-bottom' : 'origin-top'
              )}
            >
              <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5 custom-scrollbar">
                {options.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted-foreground text-center">
                    No options available
                  </div>
                ) : (
                  options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      data-slot="option"
                      role="option"
                      aria-selected={opt.value === value}
                      onClick={() => {
                        onChange?.(opt.value);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'w-full px-4 py-2.5 text-sm text-left flex items-center justify-between duration-200 transition-colors ds-rounded',
                        opt.value === value
                          ? 'bg-popover-item-selected text-popover-item-selected-fg font-semibold'
                          : 'text-popover-fg hover:bg-popover-item'
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {opt.value === value && (
                        <FiCheck className="size-4 shrink-0 text-popover-item-selected-fg" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>,
            document.body
          )}
        </div>
        {hasMessage && (
          <span
            data-slot="helper"
            id={messageId}
            role={error ? 'alert' : undefined}
            className={cn(
              'text-xs ml-1 tracking-tight',
              error ? 'text-ds-danger-500 font-medium dark:text-ds-danger-400' : 'text-muted-foreground'
            )}
          >
            {error || description}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
