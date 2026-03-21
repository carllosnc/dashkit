import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  helperText?: string;
  /**
   * Optional regex to mask/filter the input value.
   * Matches will be replaced with an empty string.
   * Example: /[^\d]/g to only allow digits.
   */
  mask?: RegExp;
  /**
   * Optional formatter function to apply after masking.
   * Useful for dynamic patterns like CPF (000.000.000-00).
   */
  formatter?: (value: string) => string;
}

/**
 * Input component with labels, icons, error states, and masking support.
 * 
 * @see https://dashkit-ui.com/docs/input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, leftIcon, rightIcon, error, helperText, mask, formatter, className, id, onChange, children: _children, ...props }, ref) => {
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
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-base-700 dark:text-base-300 ml-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {leftIcon && (
            <div className={cn(
              "absolute left-4 inset-y-0 text-base-500 transition-colors duration-200 pointer-events-none flex items-center justify-center",
              "group-focus-within:text-black dark:group-focus-within:text-white"
            )}>
              {leftIcon}
            </div>
          )}
          <input
            {...props}
            id={inputId}
            ref={ref}
            onChange={handleChange}
            className={cn(
              "w-full px-4 h-9 text-sm bg-input-bg dark:bg-input-dark-bg border rounded-input outline-none transition-all duration-200",
              "border-input-border dark:border-input-dark-border text-input-fg dark:text-input-dark-fg",
              "focus:border-input-focus-border dark:focus:border-input-dark-focus-border",
              "focus:ring-4 focus:ring-input-focus-ring dark:focus:ring-input-dark-focus-ring",
              "placeholder:text-input-placeholder dark:placeholder:text-input-dark-placeholder",
              "disabled:cursor-not-allowed disabled:bg-input-disabled-bg dark:disabled:bg-input-dark-disabled-bg disabled:border-input-disabled-border dark:disabled:border-input-dark-disabled-border text-input-disabled-fg dark:disabled:text-input-dark-disabled-fg",
              {
                "pl-11": !!leftIcon,
                "pr-11": !!rightIcon,
                "border-red-500/50 focus:border-red-500 focus:ring-red-50 dark:border-red-500/30 dark:focus:border-red-500/50 dark:focus:ring-red-500/10": !!error,
              },
              className
            )}
          />
          {rightIcon && (
            <div className={cn(
              "absolute right-4 inset-y-0 text-base-500 transition-colors duration-200 pointer-events-none flex items-center justify-center",
              "group-focus-within:text-black dark:group-focus-within:text-white"
            )}>
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={cn(
            "text-[12px] ml-1 tracking-tight",
            error ? "text-red-500" : "text-base-600"
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
