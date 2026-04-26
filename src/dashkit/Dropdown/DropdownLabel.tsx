import * as React from 'react';
import { cn } from '../utils/cn';
import './dropdown.css';

export interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={cn("dropdown-label", className)}>
      {children}
    </div>
  );
}
