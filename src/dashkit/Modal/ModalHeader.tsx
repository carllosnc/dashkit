import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { IconButton } from '../IconButton/IconButton';

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader({ children, className, onClose, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="modal-header"
        className={cn('flex items-start justify-between px-6 pt-6', className)}
        {...props}
      >
        <div className="flex flex-col gap-1.5 flex-1">
          {children}
        </div>
        {onClose && (
          <IconButton
            icon={<FiX size={18} />}
            variant="ghost"
            onClick={onClose}
            className="-mr-2 text-muted-foreground hover:text-foreground"
            aria-label="Close modal"
          />
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
