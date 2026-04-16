import * as React from 'react';
import { cn } from '../utils/cn';

export type SurfaceVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

const variantStyles: Record<SurfaceVariant, string> = {
  default: "bg-ds-0 dark:bg-ds-900 border-ds-200 dark:border-ds-800",
  info: "bg-ds-info-50 dark:bg-ds-info-700/10 border-ds-info-300 dark:border-ds-info-900",
  success: "bg-ds-success-50 dark:bg-ds-success-700/10 border-ds-success-300 dark:border-ds-success-900",
  warning: "bg-ds-warning-50 dark:bg-ds-warning-700/10 border-ds-warning-400 dark:border-ds-warning-900",
  danger: "bg-ds-danger-50 dark:bg-ds-danger-700/10 border-ds-danger-300 dark:border-ds-danger-900",
};

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  children?: React.ReactNode;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-rounded border",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
