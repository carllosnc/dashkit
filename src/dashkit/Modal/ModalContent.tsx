import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={cn('modal__body', className)}>
      {children}
    </div>
  );
}
