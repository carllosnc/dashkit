import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, description, className, id, children, ...props }, ref) => {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={cn("flex gap-3 group relative transition-all duration-200 items-center")}>
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
                "w-6 h-6 border-2 transition-all duration-200 flex items-center justify-center shrink-0 bg-background border-input peer-checked:border-primary peer-checked:bg-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent group-hover:border-primary/50 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed rounded-sm",
                className
              )} 
            />
            {/* Inner Block Fill */}
            <div className={cn(
              "absolute w-[13px] h-[13px] rounded-[2px] bg-primary transition-all duration-200 pointer-events-none",
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
              <span className="text-sm font-medium text-ds-800 dark:text-ds-200 tracking-tight leading-5">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground tracking-tight mt-0.5">
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


