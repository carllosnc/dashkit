import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSwitch } from './useSwitch';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

import './switch.css';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const { switchId } = useSwitch({ id, label });

    return (
      <div className="switch">
        <div className="switch__input-container">
          <label htmlFor={switchId} className="switch__label-inner">
            <input
              {...props}
              type="checkbox"
              id={switchId}
              ref={ref}
              className="switch__input"
            />
            <div className={cn("switch__track", className)} />
            <div className="switch__thumb" />
          </label>
        </div>
        {(label || description) && (
          <label
            htmlFor={switchId}
            className="switch__content"
          >
            {label && (
              <span className="switch__label">
                {label}
              </span>
            )}
            {description && (
              <span className="switch__description">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
