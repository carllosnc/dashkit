import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the progress bar (0 to max) */
  value: number;
  /** The maximum value of the progress bar */
  max?: number;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Where to position the label(s) */
  labelPosition?: 'top' | 'side';
  /** The visual color of the bar */
  color?: ProgressBarColor;
  /** The height/thickness of the bar */
  size?: ProgressBarSize;
  /** Whether to animate the width change using Framer Motion */
  animate?: boolean;
  /** Custom label to show instead of percentage */
  label?: React.ReactNode;
}

const colorStyles: Record<ProgressBarColor, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-ds-500 dark:bg-ds-400"
};

const sizeStyles: Record<ProgressBarSize, string> = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4"
};

/**
 * ProgressBar Component
 * A fluid, animated progress indicator for tracking task completion or data metrics.
 */
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
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const BarContainer = (
      <div className={cn(
        "bg-ds-200 dark:bg-ds-800 rounded-full overflow-hidden shrink-0 w-full",
        sizeStyles[size]
      )}>
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={cn("h-full rounded-full transition-colors", colorStyles[color])}
          />
        ) : (
          <div 
            className={cn("h-full rounded-full transition-all", colorStyles[color])}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    );

    if (labelPosition === 'side') {
      return (
        <div 
          ref={ref} 
          className={cn("w-full flex items-center gap-3", className)}
          {...props}
        >
          {BarContainer}
          {(showLabel || label) && (
            <div className="flex items-center gap-2 shrink-0">
               {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
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
        className={cn("w-full flex flex-col gap-2", className)}
        {...props}
      >
        {(showLabel || label) && (
          <div className="flex items-center justify-between gap-4">
            {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
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
