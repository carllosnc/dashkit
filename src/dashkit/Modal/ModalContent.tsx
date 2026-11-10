import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-6 no-scrollbar', className)}>
      {children}
    </div>
  );
}
