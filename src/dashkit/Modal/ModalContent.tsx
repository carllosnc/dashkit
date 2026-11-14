import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils/cn';

export type ModalContentProps = ComponentPropsWithoutRef<'div'>;

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="modal-content"
        className={cn('flex-1 overflow-y-auto p-6 no-scrollbar', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalContent.displayName = 'ModalContent';
