import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarBrand({ children, className, ...props }: NavbarBrandProps) {
  return (
    <div className={cn('navbar__brand', className)} {...props}>
      {children}
    </div>
  );
}
