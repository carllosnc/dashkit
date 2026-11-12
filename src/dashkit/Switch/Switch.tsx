import { forwardRef, type InputHTMLAttributes } from 'react';
import { useSwitch } from './useSwitch';
import { cn } from '../utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const { switchId } = useSwitch({ id, label });

    return (
      <div className={cn('group flex gap-3 relative transition-all duration-200 items-center', className)}>
        <div className="flex items-center h-6">
          <label htmlFor={switchId} className="relative flex items-center cursor-pointer">
            <input
              {...props}
              type="checkbox"
              id={switchId}
              ref={ref}
              className="peer sr-only"
            />
            <div
              className={cn(
                'w-11 h-6 bg-ds-200 dark:bg-ds-800 rounded-full ds-pill ds-input-surface transition-colors duration-200 border-2 border-border',
                'group-hover:border-ds-400 dark:group-hover:border-ds-500',
                'peer-checked:border-primary peer-checked:bg-primary',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent',
                'peer-disabled:opacity-60 peer-disabled:cursor-not-allowed'
              )}
            />
            <div
              className={cn(
                'absolute left-1 top-1 w-4 h-4 bg-ds-0 rounded-full ds-pill transition-transform duration-200 shadow-sm pointer-events-none',
                'peer-checked:translate-x-5 peer-checked:bg-primary-foreground',
                'peer-disabled:opacity-60 peer-disabled:cursor-not-allowed'
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={switchId}
            className="flex flex-col cursor-pointer select-none"
          >
            {label && (
              <span data-slot="label" className="text-sm font-medium text-foreground tracking-tight leading-5">
                {label}
              </span>
            )}
            {description && (
              <span data-slot="description" className="text-xs text-muted-foreground tracking-tight">
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
