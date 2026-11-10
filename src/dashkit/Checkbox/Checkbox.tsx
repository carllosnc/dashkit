import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, id, ...props }, ref) {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={cn('group flex gap-3 relative transition-all duration-200 items-center', className)}>
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
                'w-6 h-6 border-2 transition-all duration-200 flex items-center justify-center shrink-0 bg-background rounded-[4px]',
                'border-border group-hover:border-ds-400 dark:group-hover:border-ds-500',
                'peer-checked:border-primary peer-checked:bg-background',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent',
                'peer-disabled:opacity-60 peer-disabled:cursor-not-allowed'
              )}
            />
            <div
              className={cn(
                'absolute w-[13px] h-[13px] rounded-[2px] bg-primary transition-all duration-200 pointer-events-none opacity-0 scale-50',
                'peer-checked:opacity-100 peer-checked:scale-100',
                'peer-checked:peer-disabled:opacity-60'
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox';
