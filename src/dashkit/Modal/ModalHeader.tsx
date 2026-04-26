import { type ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { IconButton } from '../IconButton/IconButton';

export interface ModalHeaderProps {
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

export function ModalHeader({ children, className, onClose }: ModalHeaderProps) {
  return (
    <div className={cn('modal__header', className)}>
      <div className="modal__header-content">
        {children}
      </div>
      {onClose && (
        <IconButton
          icon={<FiX size={18} />}
          variant="ghost"
          onClick={onClose}
          className="modal__close-button"
          aria-label="Close modal"
        />
      )}
    </div>
  );
}
