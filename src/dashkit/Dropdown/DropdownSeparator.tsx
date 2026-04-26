import { cn } from '../utils/cn';
import './dropdown.css';

export interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <div className={cn("dropdown-separator", className)} />
  );
}
