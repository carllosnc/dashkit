import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarLinksProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarLinks({ children, className, ...props }: NavbarLinksProps) {
  return (
    <nav className={cn('hidden md:flex items-center gap-4 lg:gap-8', className)} {...props}>
      {children}
    </nav>
  );
}

NavbarLinks.displayName = 'NavbarLinks';
