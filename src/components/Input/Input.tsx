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
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, rightIcon, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-neutral-700 dark:text-neutral-300 ml-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {leftIcon && (
            <div className={cn(
              "absolute left-4 text-neutral-400 transition-colors duration-200 pointer-events-none flex items-center justify-center",
              "group-focus-within:text-black dark:group-focus-within:text-white"
            )}>
              {leftIcon}
            </div>
          )}
          <input
            {...props}
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-white dark:bg-neutral-900 border rounded-md outline-none transition-all duration-200",
              "border-neutral-400 dark:border-neutral-800",
              "focus:border-neutral-900 dark:focus:border-neutral-100",
              "focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-900/40",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-950",
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
              "absolute right-4 text-neutral-400 transition-colors duration-200 pointer-events-none flex items-center justify-center",
              "group-focus-within:text-black dark:group-focus-within:text-white"
            )}>
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={cn(
            "text-[12px] ml-1 tracking-tight",
            error ? "text-red-500" : "text-neutral-500"
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
