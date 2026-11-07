import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

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
}

import './input.css';

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
      <div className={cn('input', `input--${size}`)}>
        {label && (
          <label
            htmlFor={inputId}
            className="input__label"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'input__wrapper',
            `input__wrapper--${size}`,
            error && 'input__wrapper--error',
            props.disabled && 'input__wrapper--disabled',
            className
          )}
        >
          {prefix && (
            <div className={cn('input__prefix', size === 'sm' && 'input__prefix--sm', size === 'lg' && 'input__prefix--lg')}>
              {prefix}
            </div>
          )}

          <div className={cn('input__inner', `input__inner--${size}`)}>
            {leftIcon && (
              <div className={cn('input__icon', 'input__icon--left', size === 'sm' && 'input__icon--sm-left')}>
                {leftIcon}
              </div>
            )}
            <input
              {...props}
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
                'input__field',
                `input__field--${size}`,
                leftIcon && "input__field--with-left-icon",
                rightIcon && "input__field--with-right-icon"
              )}
            />
            {rightIcon && (
              <div className={cn('input__icon', 'input__icon--right', size === 'sm' && 'input__icon--sm-right')}>
                {rightIcon}
              </div>
            )}
          </div>

          {suffix && (
            <div className={cn('input__suffix', size === 'sm' && 'input__suffix--sm', size === 'lg' && 'input__suffix--lg')}>
              {suffix}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span
            id={messageId}
            role={error ? 'alert' : undefined}
            className={cn(
              'input__message',
              error ? 'input__message--error' : 'input__message--default'
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
