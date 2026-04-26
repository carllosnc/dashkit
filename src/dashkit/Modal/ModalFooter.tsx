import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('modal__footer', className)}>
      {children}
    </div>
  );
}
