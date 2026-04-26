import * as React from 'react';
import { cn } from '../utils/cn';
import './surface.css';

export type SurfaceVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  children?: React.ReactNode;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('surface', `surface--${variant}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
