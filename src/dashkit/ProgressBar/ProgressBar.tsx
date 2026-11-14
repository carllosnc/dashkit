import * as React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { useProgressBar } from './useProgressBar';

export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'base';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

const progressTrackVariants = cva(
  'bg-ds-200 dark:bg-ds-800 rounded-full ds-pill overflow-hidden',
  {
    variants: {
      position: {
        top: 'w-full',
        side: 'flex-1',
      },
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      position: 'top',
      size: 'sm',
    },
  }
);

const progressFillVariants = cva('h-full rounded-full ds-pill', {
  variants: {
    color: {
      primary: 'bg-primary',
      success: 'bg-ds-success-600 dark:bg-ds-success-500',
      warning: 'bg-ds-warning-500 dark:bg-ds-warning-500',
      danger: 'bg-ds-danger-600 dark:bg-ds-danger-500',
      info: 'bg-ds-info-600 dark:bg-ds-info-500',
      neutral: 'bg-ds-500 dark:bg-ds-400',
      base: 'bg-foreground',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

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
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        data-testid="progress-bar-track"
        className={cn(progressTrackVariants({ position: labelPosition, size }))}
      >
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className={cn(progressFillVariants({ color }))}
          />
        ) : (
          <div
            className={cn(progressFillVariants({ color }))}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    );

    if (labelPosition === 'side') {
      return (
        <div
          ref={ref}
          data-slot="progress-bar"
          className={cn('w-full flex items-center gap-3', className)}
          {...props}
        >
          {BarContainer}
          {(showLabel || label) && (
            <div className="flex items-center gap-2 shrink-0 min-w-0">
              {label && <span className="text-xs font-medium text-muted-foreground truncate">{label}</span>}
              {showLabel && (
                <span className="text-xs font-bold text-foreground tracking-tight w-8 text-right">
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
        data-slot="progress-bar"
        className={cn('w-full flex flex-col gap-2', className)}
        {...props}
      >
        {(showLabel || label) && (
          <div className="flex items-center justify-between gap-4 min-w-0">
            {label && <span className="text-xs font-medium text-muted-foreground truncate">{label}</span>}
            {showLabel && (
              <span className="text-xs font-bold text-foreground ml-auto tracking-tight">
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
