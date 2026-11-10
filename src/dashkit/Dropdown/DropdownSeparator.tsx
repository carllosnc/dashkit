import { cn } from '../utils/cn';

export interface DropdownSeparatorProps {
  className?: string;
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <div className={cn('my-0.5 h-px bg-border', className)} />
  );
}

DropdownSeparator.displayName = 'DropdownSeparator';
