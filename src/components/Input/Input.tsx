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
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  helperText?: string;
  mask?: RegExp;
  formatter?: (value: string) => string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, rightIcon, prefix, suffix, error, helperText, mask, formatter, className, id, onChange, ...props }, ref) => {
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
        <div
          className={cn(
            "relative flex items-center group bg-input-bg border border-input ds-rounded outline-none transition-all duration-200 focus-within:border-input-focus focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-transparent",
            {
              "border-ds-danger-500/50 focus-within:border-ds-danger-500 focus-within:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus-within:border-ds-danger-500/50 dark:focus-within:ring-ds-danger-500/10": !!error,
              "opacity-50 cursor-not-allowed pointer-events-none": props.disabled
            },
            className
          )}
        >
          {prefix && (
            <div className="pl-4 text-sm text-ds-500 font-medium select-none whitespace-nowrap">
              {prefix}
            </div>
          )}

          <div className="relative flex-1 flex items-center h-9">
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
                "w-full h-full px-4 text-sm bg-transparent border-none outline-none text-input-fg placeholder:text-muted-foreground disabled:cursor-not-allowed",
                {
                  "pl-11": !!leftIcon,
                  "pr-11": !!rightIcon,
                }
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

          {suffix && (
            <div className="pr-4 text-sm text-ds-500 font-medium select-none whitespace-nowrap">
              {suffix}
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
