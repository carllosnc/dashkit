import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useModal } from './useModal';
import { Backdrop } from '../Backdrop/Backdrop';
import './modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  className,
}: ModalProps) {
  useModal({ isOpen, onClose });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="modal__wrapper">
          <Backdrop show={true} fixed={false} onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'modal__content-wrapper',
              `modal__content-wrapper--${size}`,
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
}

Modal.displayName = 'Modal';
