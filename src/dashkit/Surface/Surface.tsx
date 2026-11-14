import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const surfaceVariants = cva(
  'ds-rounded-md text-foreground transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 dark:bg-muted/85',
        info: 'bg-info/10 dark:bg-info/15',
        success: 'bg-success/10 dark:bg-success/15',
        warning: 'bg-warning/12 dark:bg-warning/15',
        danger: 'bg-danger/10 dark:bg-danger/15',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type SurfaceVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StrictVariantProps<typeof surfaceVariants> {
  children?: React.ReactNode;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface({ variant, className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="surface"
        className={cn(surfaceVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';
