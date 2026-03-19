import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, description, className, id, children, ...props }, ref) => {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="flex gap-3 group relative items-start">
        <div className="flex items-center h-6">
          <label htmlFor={checkboxId} className="relative flex items-center justify-center cursor-pointer">
            <input
              {...props}
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className="peer sr-only"
            />
            <div 
              className={cn(
                "w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center shrink-0",
                "border-base-400 dark:border-base-700 bg-white dark:bg-base-900",
                "peer-checked:border-black dark:peer-checked:border-white",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-base-100 dark:peer-focus-visible:ring-base-900/40",
                "group-hover:border-base-500 dark:group-hover:border-base-600",
                "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:bg-base-100 dark:peer-disabled:bg-base-800",
                className
              )} 
            />
            {/* Inner Block Fill */}
            <div className={cn(
              "absolute w-[14px] h-[14px] rounded-[2.5px] bg-base-900 dark:bg-base-100 transition-all duration-200 pointer-events-none",
              "opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100"
            )} />
          </label>
        </div>
        {(label || description) && (
          <label 
            htmlFor={checkboxId}
            className="flex flex-col cursor-pointer select-none"
          >
            {label && (
              <span className="text-[15px] font-semibold text-base-800 dark:text-base-200 tracking-tight leading-5">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[12px] text-base-500 dark:text-base-400 tracking-tight mt-0.5">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
