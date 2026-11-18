import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: string;
  description?: string;
}

/**
 * Accessible boolean checkbox input with optional `label` and `description` props.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, id, ...props }, ref) {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('group flex gap-3 relative transition-all duration-200 items-center', className)}>
        <div className="flex items-center h-6">
          <label htmlFor={checkboxId} className="relative flex items-center justify-center cursor-pointer">
            <input
              {...props}
              type="checkbox"
              id={checkboxId}
              ref={ref}
              aria-describedby={describedBy}
              className="peer sr-only"
            />
            <div
              className={cn(
                'w-6 h-6 border-2 transition-all duration-200 flex items-center justify-center shrink-0 bg-background rounded-[calc(var(--radius)*0.3333)] shadow-[var(--ds-input-shadow)]',
                'border-border group-hover:border-ds-400 dark:group-hover:border-ds-500',
                'peer-checked:border-primary peer-checked:bg-background',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent',
                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed'
              )}
            />
            <div
              className={cn(
                'absolute w-[13px] h-[13px] rounded-[calc(var(--radius)*0.1667)] bg-primary transition-all duration-200 pointer-events-none opacity-0 scale-50',
                'peer-checked:opacity-100 peer-checked:scale-100',
                'peer-checked:peer-disabled:opacity-50'
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col select-none">
            {label && (
              <label
                htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox';
