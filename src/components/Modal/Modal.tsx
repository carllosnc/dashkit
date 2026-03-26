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
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-[95vw] h-[95vh]',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  showCloseButton = true,
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
              "w-full bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col",
              sizeClasses[size],
              className
            )}
          >
            {(title || description || showCloseButton) && (
              <div className="flex items-start justify-between p-8 pb-4">
                <div className="flex flex-col gap-1.5">
                  {title && (
                    <h2 className="text-xl font-bold text-block-fg dark:text-block-dark-fg tracking-tight uppercase">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-md transition-all duration-200 hover:bg-ds-100 dark:hover:bg-ds-800 text-ds-400 hover:text-ds-900 dark:hover:text-white"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-8 py-4 no-scrollbar min-h-[100px]">
              {children}
            </div>

            {footer && (
              <div className="p-8 pt-4 flex items-center justify-end gap-3 bg-card border-t border-border">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

Modal.displayName = 'Modal';
