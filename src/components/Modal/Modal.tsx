import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useModal } from './useModal';
import { IconButton } from '../IconButton/IconButton';
import { Backdrop } from '../Backdrop/Backdrop';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'w-full h-full',
};

export const ModalHeader = ({ children, className, onClose }: { children?: ReactNode; className?: string; onClose?: () => void }) => (
  <div className={cn("flex items-start justify-between px-6 pt-6", className)}>
    <div className="flex flex-col gap-1.5 flex-1">
      {children}
    </div>
    {onClose && (
      <IconButton
        icon={<FiX size={18} />}
        variant="ghost"
        onClick={onClose}
        className="-mr-2 text-ds-400 hover:text-ds-900 dark:hover:text-white"
        aria-label="Close modal"
      />
    )}
  </div>
);

export const ModalContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex-1 overflow-y-auto p-6 no-scrollbar", className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-6 pb-6 flex items-center justify-end gap-3 bg-card", className)}>
    {children}
  </div>
);

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  className,
}: ModalProps) => {
  useModal({ isOpen, onClose });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate flex items-center justify-center p-6">
          <Backdrop show={true} fixed={false} onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "w-full bg-card text-card-foreground ds-rounded shadow-sm overflow-hidden flex flex-col",
              sizeClasses[size],
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

Modal.displayName = 'Modal';
