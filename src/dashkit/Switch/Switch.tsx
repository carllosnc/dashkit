import { forwardRef, type InputHTMLAttributes } from 'react';
import { useSwitch } from './useSwitch';
import { cn } from '../utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

/**
 * Accessible toggle switch with optional `label` and `description` props.
 *
 * @example
 * ```tsx
 * <Switch label="Email alerts" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ label, description, className, id, ...props }, ref) {
    const { switchId } = useSwitch({ id });
    const descriptionId = description ? `${switchId}-description` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('group flex gap-3 relative transition-all duration-200 items-center', className)}>
        <div className="flex items-center h-6">
          <label htmlFor={switchId} className="relative flex items-center cursor-pointer">
            <input
              {...props}
              type="checkbox"
              role="switch"
              id={switchId}
              ref={ref}
              aria-describedby={describedBy}
              className="peer sr-only"
            />
            <div
              className={cn(
                'w-11 h-6 bg-muted rounded-full ds-pill ds-input-surface transition-colors duration-200 border-2 border-border',
                'group-hover:border-ds-400 dark:group-hover:border-ds-500',
                'peer-checked:border-primary peer-checked:bg-primary',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent',
                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
              )}
            />
            <div
              className={cn(
                'absolute left-1 top-1 w-4 h-4 bg-background rounded-full ds-pill transition-transform duration-200 shadow-sm pointer-events-none',
                'peer-checked:translate-x-5 peer-checked:bg-primary-foreground',
                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col select-none">
            {label && (
              <label
                htmlFor={switchId}
                data-slot="label"
                className="text-sm font-medium text-foreground tracking-tight leading-5 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} data-slot="description" className="text-xs text-muted-foreground tracking-tight">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
