import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useSlider } from './useSlider';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  label?: string;
  description?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, description, className, id, min = 0, max = 100, step = 1, value, defaultValue, onChange, showValue = false, disabled, ...props }, ref) => {
    const { currentValue, percentage, handleChange, sliderId } = useSlider({
      id,
      label,
      min,
      max,
      value,
      defaultValue,
      onChange
    });

    return (
      <div className={cn('flex flex-col gap-3 relative w-full', disabled && 'opacity-60 cursor-not-allowed pointer-events-none')}>
        {(label || description || showValue) && (
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              {label && (
                <label
                  data-slot="label"
                  htmlFor={sliderId}
                  className="text-sm font-medium text-foreground tracking-tight cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <span className="text-[13px] text-muted-foreground tracking-tight">
                  {description}
                </span>
              )}
            </div>
            {showValue && (
              <span className="text-[13px] font-semibold tabular-nums text-foreground">
                {currentValue}
              </span>
            )}
          </div>
        )}
        <div className="group relative flex items-center h-5 w-full">
          <div className="absolute inset-x-0 h-1.5 rounded-full ds-pill bg-ds-200 dark:bg-ds-800 pointer-events-none" />
          <div
            className="absolute left-0 h-1.5 rounded-full ds-pill bg-primary pointer-events-none"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute w-4 h-4 rounded-full ds-pill bg-ds-0 border-2 border-primary shadow-sm pointer-events-none z-10 transition-[box-shadow,transform] duration-200 group-hover:ring-4 group-hover:ring-primary/10 group-has-[:focus-visible]:ring-4 group-has-[:focus-visible]:ring-primary/30"
            style={{
              left: `calc(${percentage}% - 8px)`
            }}
          />
          <input
            {...props}
            id={sliderId}
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn('absolute inset-0 w-full h-full opacity-0 cursor-pointer accent-transparent z-20', className)}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
