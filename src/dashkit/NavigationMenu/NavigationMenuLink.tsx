import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuLink({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={cn('navigation-menu__link', className)}
    >
      {children}
    </a>
  );
}
