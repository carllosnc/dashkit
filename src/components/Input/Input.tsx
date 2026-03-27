import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  helperText?: string;
  mask?: RegExp;
  formatter?: (value: string) => string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, rightIcon, error, helperText, mask, formatter, className, id, onChange, ...props }, ref) => {
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
            className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {leftIcon && (
            <div className={cn(
              "absolute left-4 inset-y-0 text-ds-500 pointer-events-none flex items-center justify-center",
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
              "w-full px-4 h-9 text-sm bg-input-bg text-input-fg border border-input rounded-[var(--radius)] outline-none focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              {
                "pl-11": !!leftIcon,
                "pr-11": !!rightIcon,
                "border-ds-danger-500/50 focus:border-ds-danger-500 focus:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus:border-ds-danger-500/50 dark:focus:ring-ds-danger-500/10": !!error,
              },
              className
            )}
          />
          {rightIcon && (
            <div className={cn(
              "absolute right-4 inset-y-0 text-ds-500 pointer-events-none flex items-center justify-center",
              "group-focus-within:text-black dark:group-focus-within:text-white"
            )}>
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={cn(
            "text-[12px] ml-1 tracking-tight",
            error ? "text-ds-danger-600 dark:text-ds-danger-400" : "text-ds-600"
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
