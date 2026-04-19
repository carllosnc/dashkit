import * as React from 'react';
import { cn } from '../utils/cn';

export interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={cn("px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-ds-400 dark:text-ds-500", className)}>
      {children}
    </div>
  );
}
