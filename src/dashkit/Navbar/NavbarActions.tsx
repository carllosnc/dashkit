import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarActions({ children, className, ...props }: NavbarActionsProps) {
  return (
    <div className={cn('flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap', className)} {...props}>
      {children}
    </div>
  );
}

NavbarActions.displayName = 'NavbarActions';
