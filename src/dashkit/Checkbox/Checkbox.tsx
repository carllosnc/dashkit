import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: string;
  description?: string;
}

import './checkbox.css';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, id, ...props }, ref) {
    const checkboxId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="checkbox">
        <div className="checkbox__input-container">
          <label htmlFor={checkboxId} className="checkbox__label-inner">
            <input
              {...props}
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className="checkbox__input"
            />
            <div className={cn('checkbox__box', className)} />
            <div className="checkbox__indicator" />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={checkboxId}
            className="checkbox__text-container"
          >
            {label && (
              <span className="checkbox__text-label">
                {label}
              </span>
            )}
            {description && (
              <span className="checkbox__text-description">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);
