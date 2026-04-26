import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useRadio } from './useRadio';
import './radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const { radioId } = useRadio({ id, label });

    return (
      <div className={cn('radio', props.disabled && 'radio--disabled')}>
        <div className="radio__input-wrapper">
          <label htmlFor={radioId} className="radio__label-trigger">
            <input
              {...props}
              type="radio"
              id={radioId}
              ref={ref}
              className="radio__input"
            />
            <div className={cn('radio__circle', className)} />
            <div className="radio__dot" />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={radioId}
            className="radio__label-content"
          >
            {label && (
              <span className="radio__label-text">
                {label}
              </span>
            )}
            {description && (
              <span className="radio__description">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
