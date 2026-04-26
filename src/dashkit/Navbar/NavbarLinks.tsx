import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface NavbarLinksProps {
  children: ReactNode;
  className?: string;
}

export function NavbarLinks({ children, className }: NavbarLinksProps) {
  return (
    <nav className={cn('navbar__links', className)}>
      {children}
    </nav>
  );
}
