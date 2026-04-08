import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: string;
  description?: string;
}

const ROOT_WRAPPER = "flex gap-3 group relative transition-all duration-200 items-center";
const INPUT_CONTAINER = "flex items-center h-6";
const LABEL_INNER = "relative flex items-center justify-center cursor-pointer";
const CHECKBOX_INPUT = "peer sr-only";
const CHECKBOX_BOX = "w-6 h-6 border-2 transition-all duration-200 flex items-center justify-center shrink-0 bg-background border-input peer-checked:border-primary peer-checked:bg-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent group-hover:border-primary/50 peer-disabled:opacity-60 peer-disabled:cursor-not-allowed rounded-sm";
const CHECKBOX_INDICATOR = "absolute w-[13px] h-[13px] rounded-[2px] bg-primary transition-all duration-200 pointer-events-none opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 peer-checked:peer-disabled:opacity-60";
const TEXT_CONTAINER = "flex flex-col cursor-pointer select-none";
const TEXT_LABEL = "text-sm font-medium text-ds-800 dark:text-ds-200 tracking-tight leading-5";
const TEXT_DESCRIPTION = "text-sm text-muted-foreground tracking-tight mt-0.5";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, id, ...props }, ref) {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className={cn(ROOT_WRAPPER)}>
        <div className={INPUT_CONTAINER}>
          <label htmlFor={checkboxId} className={LABEL_INNER}>
            <input
              {...props}
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className={CHECKBOX_INPUT}
            />
            <div className={cn(CHECKBOX_BOX, className)} />
            <div className={cn(CHECKBOX_INDICATOR)} />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={checkboxId}
            className={TEXT_CONTAINER}
          >
            {label && (
              <span className={TEXT_LABEL}>
                {label}
              </span>
            )}
            {description && (
              <span className={TEXT_DESCRIPTION}>
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);
