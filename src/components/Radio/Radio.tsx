import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const radioId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    
    return (
      <div className="flex gap-3 group relative items-center">
        <div className="flex items-center h-6">
          <label htmlFor={radioId} className="relative flex items-center justify-center cursor-pointer">
            <input
              {...props}
              type="radio"
              id={radioId}
              ref={ref}
              className="peer sr-only"
            />
            {/* Outer Ring */}
            <div 
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center shrink-0",
                "border-base-400 dark:border-base-700 bg-white dark:bg-base-900",
                "peer-checked:border-black dark:peer-checked:border-white",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-base-100 dark:peer-focus-visible:ring-base-900/40",
                "group-hover:border-base-500 dark:group-hover:border-base-600",
                "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:bg-base-100 dark:peer-disabled:bg-base-800",
                className
              )} 
            />
            {/* Inner Dot Fill */}
            <div className={cn(
              "absolute w-2.5 h-2.5 rounded-full bg-base-900 dark:bg-base-100 transition-all duration-200 pointer-events-none",
              "opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100"
            )} />
          </label>
        </div>
        {(label || description) && (
          <label 
            htmlFor={radioId}
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

Radio.displayName = 'Radio';
