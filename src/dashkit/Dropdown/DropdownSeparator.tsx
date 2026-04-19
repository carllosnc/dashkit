import { cn } from '../utils/cn';

export interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <div className={cn("my-1 h-px bg-border", className)} />
  );
}
