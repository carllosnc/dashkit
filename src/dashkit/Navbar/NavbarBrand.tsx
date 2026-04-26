import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface NavbarBrandProps {
  children: ReactNode;
  className?: string;
}

export function NavbarBrand({ children, className }: NavbarBrandProps) {
  return (
    <div className={cn('navbar__brand', className)}>
      {children}
    </div>
  );
}
