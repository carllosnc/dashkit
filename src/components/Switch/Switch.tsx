import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSwitch } from './useSwitch';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const { switchId } = useSwitch({ id, label });

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
            <div
              className={cn(
                "w-11 h-6 rounded-full border-2 transition-all duration-300 shrink-0 bg-input border-transparent peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent peer-disabled:opacity-60 peer-disabled:cursor-not-allowed",
                className
              )}
            />
            <div className="absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-sm bg-background peer-checked:translate-x-5 peer-disabled:opacity-60 peer-disabled:cursor-not-allowed" />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={switchId}
            className="flex flex-col cursor-pointer select-none"
          >
            {label && (
              <span className="text-sm font-medium text-ds-800 dark:text-ds-200 tracking-tight leading-6">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground tracking-tight">
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
