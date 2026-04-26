import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useProgressBar } from './useProgressBar';
import './progress-bar.css';

export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  labelPosition?: 'top' | 'side';
  color?: ProgressBarColor;
  size?: ProgressBarSize;
  animate?: boolean;
  label?: React.ReactNode;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    value,
    max = 100,
    showLabel = false,
    labelPosition = 'top',
    color = 'primary',
    size = 'sm',
    animate = true,
    label,
    className,
    ...props
  }, ref) => {
    const { percentage } = useProgressBar({ value, max });

    const BarContainer = (
      <div className={cn(
        'progress-bar__track',
        labelPosition === 'side' ? 'progress-bar__track--side' : 'progress-bar__track--top',
        `progress-bar__track--${size}`
      )}>
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={cn('progress-bar__fill', `progress-bar__fill--${color}`)}
          />
        ) : (
          <div
            className={cn('progress-bar__fill', `progress-bar__fill--${color}`)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    );

    if (labelPosition === 'side') {
      return (
        <div
          ref={ref}
          className={cn('progress-bar--side', className)}
          {...props}
        >
          {BarContainer}
          {(showLabel || label) && (
            <div className="progress-bar__label-container">
               {label && <span className="progress-bar__label-text">{label}</span>}
               {showLabel && (
                  <span className="progress-bar__percentage-side">
                    {Math.round(percentage)}%
                  </span>
               )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('progress-bar--top', className)}
        {...props}
      >
        {(showLabel || label) && (
          <div className="progress-bar__header">
            {label && <span className="progress-bar__label-text">{label}</span>}
            {showLabel && (
              <span className="progress-bar__percentage-top">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        {BarContainer}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
