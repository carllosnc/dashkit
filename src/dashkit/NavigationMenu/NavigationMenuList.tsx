import * as React from 'react';
import { cn } from '../utils/cn';

export function NavigationMenuList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn('flex flex-1 list-none items-center justify-center gap-1', className)}>
      {children}
    </ul>
  );
}
