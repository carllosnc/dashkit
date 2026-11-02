import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useModal } from './useModal';
import { useFocusTrap } from '../utils/useFocusTrap';
import { Backdrop } from '../Backdrop/Backdrop';
import './modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  /** id of the element (e.g. the ModalHeader title) that names the dialog. */
  labelledBy?: string;
  /** Accessible name for the dialog when there is no heading element to reference. */
  label?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  className,
  labelledBy,
  label,
}: ModalProps) {
  useModal({ isOpen, onClose });
  const contentRef = useFocusTrap<HTMLDivElement>(isOpen);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="modal__wrapper">
          <Backdrop show={true} fixed={false} onClick={onClose} />

          <motion.div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={label}
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
