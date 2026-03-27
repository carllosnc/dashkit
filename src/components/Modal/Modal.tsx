import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useModal } from './useModal';

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
  full: 'max-w-[95vw] h-[95vh]',
};

export const ModalHeader = ({ children, className, onClose }: { children?: ReactNode; className?: string; onClose?: () => void }) => (
  <div className={cn("flex items-start justify-between p-4 border-b border-border/50", className)}>
    <div className="flex flex-col gap-1.5 flex-1">
      {children}
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="p-2.5 rounded-md hover:bg-ds-100 dark:hover:bg-ds-800 text-ds-400 hover:text-ds-900 dark:hover:text-white shrink-0"
      >
        <FiX size={20} />
      </button>
    )}
  </div>
);

export const ModalContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex-1 overflow-y-auto p-4 no-scrollbar", className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-4 flex items-center justify-end gap-3 bg-card border-t border-border/50", className)}>
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
        <div className="fixed inset-0 z-[100] isolate flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ds-950/40 backdrop-blur-sm -z-10"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "w-full bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden flex flex-col",
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
