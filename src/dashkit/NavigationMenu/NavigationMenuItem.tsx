import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn('navigation-menu__item', className)}>
      {children}
    </li>
  );
}
