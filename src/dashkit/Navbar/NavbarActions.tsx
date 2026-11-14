import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  function NavbarActions({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="navbar-actions"
        className={cn('flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarActions.displayName = 'NavbarActions';
