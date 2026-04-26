import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useSlider } from './useSlider';
import './slider.css';

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
      <div className={cn('slider', disabled && 'slider--disabled')}>
        {(label || description || showValue) && (
          <div className="slider__header">
            <div className="slider__label-group">
              {label && (
                <label
                  htmlFor={sliderId}
                  className="slider__label"
                >
                  {label}
                </label>
              )}
              {description && (
                <span className="slider__description">
                  {description}
                </span>
              )}
            </div>
            {showValue && (
              <span className="slider__value">
                {currentValue}
              </span>
            )}
          </div>
        )}
        <div className="slider__track-container">
          <div className="slider__track-bg" />
          <div
            className="slider__track-fill"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="slider__thumb"
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
            className={cn('slider__input', className)}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
