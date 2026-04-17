import { type ReactNode, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useDrawer, type DrawerPosition } from './useDrawer';
import { Backdrop } from '../Backdrop/Backdrop';

export { type DrawerPosition };

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  children: ReactNode;
  size?: string;
  className?: string;
}

const HEADER_CLASSES = "p-6 pb-4 flex flex-col gap-1 border-b";
const CONTENT_CLASSES = "flex-1 overflow-y-auto px-6 py-2 custom-scrollbar";
const FOOTER_CLASSES = "p-6 pt-4 flex items-center justify-end gap-3 border-t";
const WRAPPER_CLASSES = "fixed inset-0 z-[100] isolate overflow-hidden flex items-center justify-center";
const DRAWER_BASE_CLASSES = "absolute bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col touch-none";
const CLOSE_BUTTON_CLASSES = "absolute top-4 right-4 p-2 rounded-md hover:bg-ds-100 dark:hover:bg-ds-800 text-ds-400 hover:text-ds-900 dark:hover:text-white z-[60]";
const GRADIENT_OVERLAY_CLASSES = "absolute bottom-0 h-6 w-full shrink-0 bg-gradient-to-t from-white dark:from-ds-900 to-transparent pointer-events-none z-10";

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(HEADER_CLASSES, className)}>
      {children}
    </div>
  );
}

export function DrawerContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(CONTENT_CLASSES, className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(FOOTER_CLASSES, className)}>
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
    positionVariants,
    getPositionClasses
  } = useDrawer({ isOpen, onClose, position });

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={WRAPPER_CLASSES}>
          <Backdrop show={true} fixed={false} onClick={onClose} />

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
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              DRAWER_BASE_CLASSES,
              {
                "border-r": position === 'left',
                "border-l": position === 'right',
                "border-b": position === 'top',
                "border-t": position === 'bottom',
              },
              getPositionClasses(position),
              size || defaultSize,
              className
            )}
          >
            <button
              onClick={onClose}
              className={CLOSE_BUTTON_CLASSES}
              aria-label="Close drawer"
            >
              <FiX size={20} />
            </button>

            {children}

            <div className={GRADIENT_OVERLAY_CLASSES} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

Drawer.displayName = 'Drawer';
