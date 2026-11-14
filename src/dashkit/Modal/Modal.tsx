import { forwardRef, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';
import { getPortalThemeAttrs } from '../utils/portalTheme';
import { useModal } from './useModal';
import { useFocusTrap } from '../utils/useFocusTrap';
import { Backdrop } from '../Backdrop/Backdrop';

const modalContentVariants = cva(
  'w-full bg-card text-card-foreground ds-rounded-lg border border-border/80 ds-border-width ds-card-shadow shadow-2xl overflow-hidden flex flex-col dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_25px_50px_-12px_rgba(0,0,0,0.7)]',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'w-full h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ModalProps
  extends StrictVariantProps<typeof modalContentVariants>,
    Omit<HTMLMotionProps<'div'>, 'children' | 'size'> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  label?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    isOpen,
    onClose,
    children,
    size = 'md',
    className,
    labelledBy,
    label,
    ...props
  },
  ref
) {
  useModal({ isOpen, onClose });
  const contentRef = useFocusTrap<HTMLDivElement>(isOpen);

  const setDialogRef = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [contentRef, ref]
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          {...getPortalThemeAttrs()}
          data-slot="modal-portal"
          className="fixed inset-0 z-[1100] isolate flex items-center justify-center p-6"
        >
          <Backdrop show={true} fixed={false} onClick={onClose} />

          <motion.div
            ref={setDialogRef}
            data-slot="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={label}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(modalContentVariants({ size }), className)}
            {...props}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

Modal.displayName = 'Modal';
