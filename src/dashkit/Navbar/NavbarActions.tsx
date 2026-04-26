import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface NavbarActionsProps {
  children: ReactNode;
  className?: string;
}

export function NavbarActions({ children, className }: NavbarActionsProps) {
  return (
    <div className={cn('navbar__actions', className)}>
      {children}
    </div>
  );
}
