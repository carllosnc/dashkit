import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn('relative', className)}>
      {children}
    </li>
  );
}
