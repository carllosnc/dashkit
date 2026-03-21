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
      <div className="flex gap-4 group relative items-center">
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
                "bg-switch-bg dark:bg-switch-dark-bg border-switch-border dark:border-switch-dark-border",
                "peer-checked:bg-switch-checked-bg peer-checked:border-switch-checked-border dark:peer-checked:bg-switch-dark-checked-bg dark:peer-checked:border-switch-dark-checked-border",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-switch-focus-ring dark:peer-focus-visible:ring-switch-dark-focus-ring",
                "peer-disabled:opacity-30 peer-disabled:cursor-not-allowed",
                className
              )} 
            />
            {/* Thumb */}
            <div className={cn(
              "absolute left-[4px] top-[4px] w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
              "bg-switch-thumb-off-bg dark:bg-switch-dark-thumb-off-bg",
              "peer-checked:translate-x-5 peer-checked:bg-switch-thumb-bg dark:peer-checked:bg-switch-dark-thumb-bg",
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
              <span className="text-[15px] font-semibold text-base-800 dark:text-base-200 tracking-tight leading-6">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[12px] text-base-500 dark:text-base-400 tracking-tight">
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
