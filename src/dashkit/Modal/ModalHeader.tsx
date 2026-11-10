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
    <div className={cn('flex items-start justify-between px-6 pt-6', className)}>
      <div className="flex flex-col gap-1.5 flex-1">
        {children}
      </div>
      {onClose && (
        <IconButton
          icon={<FiX size={18} />}
          variant="ghost"
          onClick={onClose}
          className="-mr-2 text-ds-600 dark:text-ds-400 hover:text-ds-900 dark:hover:text-white"
          aria-label="Close modal"
        />
      )}
    </div>
  );
}
