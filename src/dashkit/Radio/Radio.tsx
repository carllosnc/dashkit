import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useRadio } from './useRadio';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

/**
 * Accessible radio input with optional `label` and `description` props.
 *
 * @example
 * ```tsx
 * <Radio name="plan" label="Pro Plan" value="pro" checked={plan === 'pro'} onChange={() => setPlan('pro')} />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ label, description, className, id, ...props }, ref) {
    const { radioId } = useRadio({ id });
    const descriptionId = description ? `${radioId}-description` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;

    return (
      <div
        className={cn(
          'group flex gap-3 relative transition-all duration-200 items-center',
          props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
      >
        <div className="flex items-center h-6">
          <label htmlFor={radioId} className="relative flex items-center justify-center cursor-pointer">
            <input
              {...props}
              type="radio"
              id={radioId}
              ref={ref}
              aria-describedby={describedBy}
              className="peer sr-only"
            />
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center shrink-0 bg-background border-border',
                'group-hover:border-ds-400 dark:group-hover:border-ds-500',
                'peer-checked:border-primary peer-checked:bg-background',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent'
              )}
            />
            <div
              className={cn(
                'absolute w-3 h-3 rounded-full bg-primary transition-all duration-200 pointer-events-none opacity-0 scale-50',
                'peer-checked:opacity-100 peer-checked:scale-100'
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col select-none">
            {label && (
              <label
                htmlFor={radioId}
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

Radio.displayName = 'Radio';
