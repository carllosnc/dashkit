import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarBrand({ children, className, ...props }: NavbarBrandProps) {
  return (
    <div className={cn('flex items-center gap-1.5 sm:gap-3 shrink-0 flex-nowrap min-w-0', className)} {...props}>
      {children}
    </div>
  );
}

NavbarBrand.displayName = 'NavbarBrand';
