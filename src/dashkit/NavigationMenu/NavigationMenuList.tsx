import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn('navigation-menu__list', className)}>
      {children}
    </ul>
  );
}
