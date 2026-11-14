import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  function NavbarBrand({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="navbar-brand"
        className={cn('flex items-center gap-1.5 sm:gap-3 shrink-0 flex-nowrap min-w-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavbarBrand.displayName = 'NavbarBrand';
