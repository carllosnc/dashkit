import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarLinksProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarLinks({ children, className, ...props }: NavbarLinksProps) {
  return (
    <nav className={cn('navbar__links', className)} {...props}>
      {children}
    </nav>
  );
}
