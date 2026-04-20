import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  helperText?: string;
  mask?: RegExp;
  formatter?: (value: string) => string;
}

import './input.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, leftIcon, rightIcon, prefix, suffix, error, helperText, mask, formatter, className, id, onChange, ...props }, ref) {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
      <div className="input">
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
            error && 'input__wrapper--error',
            props.disabled && 'input__wrapper--disabled',
            className
          )}
        >
          {prefix && (
            <div className="input__prefix">
              {prefix}
            </div>
          )}

          <div className="input__inner">
            {leftIcon && (
              <div className="input__icon input__icon--left">
                {leftIcon}
              </div>
            )}
            <input
              {...props}
              id={inputId}
              ref={ref}
              onChange={handleChange}
              className={cn(
                'input__field',
                leftIcon && "input__field--with-left-icon",
                rightIcon && "input__field--with-right-icon"
              )}
            />
            {rightIcon && (
              <div className="input__icon input__icon--right">
                {rightIcon}
              </div>
            )}
          </div>

          {suffix && (
            <div className="input__suffix">
              {suffix}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={cn(
            'input__message',
            error ? 'input__message--error' : 'input__message--default'
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
