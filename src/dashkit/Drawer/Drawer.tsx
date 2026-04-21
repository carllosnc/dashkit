import { type ReactNode, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useDrawer, type DrawerPosition } from './useDrawer';
import { Backdrop } from '../Backdrop/Backdrop';
import './drawer.css';

export { type DrawerPosition };

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  children: ReactNode;
  size?: string;
  className?: string;
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("drawer__header", className)}>
      {children}
    </div>
  );
}

export function DrawerContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("drawer__body", className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("drawer__footer", className)}>
      {children}
    </div>
  );
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer({
  isOpen,
  onClose,
  position = 'right',
  children,
  size,
  className,
}, ref) {
  const {
    defaultSize,
    handleDragEnd,
    positionVariants
  } = useDrawer({ isOpen, onClose, position });

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="drawer">
          <Backdrop show={true} fixed={false} onClick={onClose}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              className={cn("drawer__close", `drawer__close--${position}`)}
              aria-label="Close drawer"
            >
              <FiX size={20} />
            </motion.button>
          </Backdrop>

          <motion.div
            ref={ref}
            data-testid="drawer-content"
            variants={positionVariants[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            drag={position === 'left' || position === 'right' ? 'x' : 'y'}
            dragConstraints={
              position === 'right' ? { left: 0 } :
              position === 'left' ? { right: 0 } :
              position === 'bottom' ? { top: 0 } :
              { bottom: 0 }
            }
            dragElastic={0}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "drawer__panel",
              `drawer__panel--${position}`,
              size || defaultSize,
              className
            )}
          >
            {children}
            <div className="drawer__gradient" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

Drawer.displayName = 'Drawer';
