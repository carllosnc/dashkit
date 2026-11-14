import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils/cn';

export type DropdownSeparatorProps = ComponentPropsWithoutRef<'div'>;

export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  function DropdownSeparator({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="dropdown-separator"
        className={cn('my-0.5 h-px bg-border', className)}
        {...props}
      />
    );
  }
);

DropdownSeparator.displayName = 'DropdownSeparator';
