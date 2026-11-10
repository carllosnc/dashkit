import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('p-6 pb-6 flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  );
}
