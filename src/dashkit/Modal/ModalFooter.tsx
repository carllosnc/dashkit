import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils/cn';

export type ModalFooterProps = ComponentPropsWithoutRef<'div'>;

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="modal-footer"
        className={cn('p-6 pb-6 flex items-center justify-end gap-3', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
