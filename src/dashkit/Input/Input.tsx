import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputWrapperVariants = cva(
  'relative flex items-center bg-input-bg border border-input-border ds-input-surface ds-rounded outline-none transition-all duration-200 focus-within:border-input-focus focus-within:ring-2 focus-within:ring-input-focus/20',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      error: {
        true: 'border-ds-danger-500/50 focus-within:border-ds-danger-500 focus-within:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus-within:border-ds-danger-500/50 dark:focus-within:ring-ds-danger-500/10',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
      disabled: false,
    },
  }
);

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  helperText?: string;
  mask?: RegExp;
  formatter?: (value: string) => string;
  size?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      error,
      helperText,
      mask,
      formatter,
      size = 'md',
      className,
      wrapperClassName,
      id,
      onChange,
      ...props
    },
    ref
  ) {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const messageId = useId();
    const hasMessage = !!(error || helperText);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (mask) {
        value = value.replace(mask, '');
      }
      if (formatter) {
        value = formatter(value);
      }
      e.target.value = value;
      onChange?.(e);
    };

    return (
      <div data-slot="root" className={cn('flex flex-col gap-1.5 w-full font-sans', className)}>
        {label && (
          <label
            data-slot="label"
            htmlFor={inputId}
            className="text-xs font-semibold text-foreground ml-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <div
          data-slot="wrapper"
          data-testid="input-wrapper"
          className={cn(
            inputWrapperVariants({ size, error: !!error, disabled: !!props.disabled }),
            wrapperClassName
          )}
        >
          {prefix && (
            <div
              data-slot="prefix"
              className={cn(
                'text-muted-foreground font-medium select-none whitespace-nowrap',
                size === 'sm' ? 'pl-2.5 text-xs' : 'pl-4 text-sm'
              )}
            >
              {prefix}
            </div>
          )}

          <div
            className={cn(
              'relative flex-1 flex items-center',
              size === 'sm' ? 'h-7' : size === 'lg' ? 'h-11' : 'h-9'
            )}
          >
            {leftIcon && (
              <div
                data-slot="left-icon"
                className={cn(
                  'absolute inset-y-0 text-muted-foreground pointer-events-none flex items-center justify-center transition-colors',
                  size === 'sm' ? 'left-2.5' : 'left-4'
                )}
              >
                {leftIcon}
              </div>
            )}
            <input
              {...props}
              data-slot="input"
              id={inputId}
              ref={ref}
              onChange={handleChange}
              aria-invalid={props['aria-invalid'] ?? (error ? true : undefined)}
              aria-describedby={
                [props['aria-describedby'], hasMessage ? messageId : undefined]
                  .filter(Boolean)
                  .join(' ') || undefined
              }
              className={cn(
                'w-full h-full bg-transparent border-none outline-none text-input-fg placeholder:text-muted-foreground disabled:cursor-not-allowed',
                size === 'sm' ? 'text-xs px-2.5' : size === 'lg' ? 'text-base px-4' : 'text-sm px-4',
                leftIcon && (size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-12' : 'pl-11'),
                rightIcon && (size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-12' : 'pr-11')
              )}
            />
            {rightIcon && (
              <div
                data-slot="right-icon"
                className={cn(
                  'absolute inset-y-0 text-muted-foreground pointer-events-none flex items-center justify-center transition-colors',
                  size === 'sm' ? 'right-2.5' : 'right-4'
                )}
              >
                {rightIcon}
              </div>
            )}
          </div>

          {suffix && (
            <div
              data-slot="suffix"
              className={cn(
                'text-muted-foreground font-medium select-none whitespace-nowrap',
                size === 'sm' ? 'pr-2.5 text-xs' : 'pr-4 text-sm'
              )}
            >
              {suffix}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span
            data-slot="helper"
            id={messageId}
            role={error ? 'alert' : undefined}
            className={cn(
              'text-xs ml-1 tracking-tight',
              error
                ? 'text-ds-danger-600 dark:text-ds-danger-400'
                : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
