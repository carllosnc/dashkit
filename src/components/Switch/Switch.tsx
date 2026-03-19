import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, description, className, id, children, ...props }, ref) => {
    const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="flex gap-4 group relative items-start">
        <div className="flex items-center h-6">
          <label htmlFor={switchId} className="relative inline-flex items-center cursor-pointer">
            <input
              {...props}
              type="checkbox"
              id={switchId}
              ref={ref}
              className="peer sr-only"
            />
            {/* Track */}
            <div 
              className={cn(
                "w-11 h-6 rounded-full border-2 transition-all duration-300 shrink-0",
                "border-neutral-800 dark:border-neutral-400 bg-neutral-100 dark:bg-neutral-800",
                "peer-checked:bg-black peer-checked:border-black dark:peer-checked:bg-white dark:peer-checked:border-white",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-neutral-100 dark:peer-focus-visible:ring-neutral-900/40",
                "peer-disabled:opacity-30 peer-disabled:cursor-not-allowed",
                className
              )} 
            />
            {/* Thumb */}
            <div className={cn(
              "absolute left-[4px] top-[4px] w-4 h-4 rounded-full bg-neutral-500 dark:bg-neutral-400 transition-all duration-300",
              "peer-checked:translate-x-5 peer-checked:bg-white dark:peer-checked:bg-black shadow-sm",
              "peer-disabled:opacity-30 peer-disabled:cursor-not-allowed"
            )} />
          </label>
        </div>
        {(label || description) && (
          <label 
            htmlFor={switchId}
            className="flex flex-col cursor-pointer select-none"
          >
            {label && (
              <span className="text-[15px] font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight leading-6">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[12px] text-neutral-500 dark:text-neutral-400 tracking-tight">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
