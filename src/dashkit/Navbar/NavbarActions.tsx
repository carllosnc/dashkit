import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function NavbarActions({ children, className, ...props }: NavbarActionsProps) {
  return (
    <div className={cn('navbar__actions', className)} {...props}>
      {children}
    </div>
  );
}
