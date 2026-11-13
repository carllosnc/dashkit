import * as React from 'react';
import { cn } from '../utils/cn';

export type DropdownLabelProps = React.ComponentPropsWithoutRef<'div'>;

export const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  function DropdownLabel({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dropdown-label"
        className={cn('px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownLabel.displayName = 'DropdownLabel';
