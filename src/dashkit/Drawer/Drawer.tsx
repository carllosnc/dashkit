import { type ReactNode, forwardRef, useCallback, type MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useDrawer, type DrawerPosition } from './useDrawer';
import { useFocusTrap } from '../utils/useFocusTrap';
import { Backdrop } from '../Backdrop/Backdrop';

export { type DrawerPosition };

const drawerPanelVariants = cva(
  'absolute bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col touch-none z-[1110]',
  {
    variants: {
      position: {
        left: 'left-0 top-0 h-full border-r',
        right: 'right-0 top-0 h-full border-l',
        top: 'top-0 left-0 w-full border-b',
        bottom: 'bottom-0 left-0 w-full border-t',
      },
    },
    defaultVariants: {
      position: 'right',
    },
  }
);

const closePositionClasses: Record<DrawerPosition, string> = {
  right: 'top-6 left-6',
  left: 'top-6 right-6',
  top: 'bottom-6 right-6',
  bottom: 'top-6 right-6',
};

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  children: ReactNode;
  size?: string;
  className?: string;
  /** id of the element (e.g. the DrawerHeader title) that names the dialog. */
  labelledBy?: string;
  /** Accessible name for the dialog when there is no heading element to reference. */
  label?: string;
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pb-4 flex flex-col gap-1 border-b border-border/80', className)}>
      {children}
    </div>
  );
}

export function DrawerContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex-1 overflow-y-auto px-6 py-2 custom-scrollbar', className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pt-4 flex items-center justify-end gap-3 border-t border-border/80', className)}>
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
  labelledBy,
  label,
}, ref) {
  const {
    defaultSize,
    handleDragEnd,
    positionVariants
  } = useDrawer({ isOpen, onClose, position });

  const contentRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Merge the forwarded consumer ref with the focus-trap ref onto one node.
  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref, contentRef]
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] isolate overflow-hidden flex items-center justify-center">
          <Backdrop show={true} fixed={false} onClick={onClose}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={onClose}
              className={cn(
                'absolute p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors z-[1120] backdrop-blur-md',
                closePositionClasses[position]
              )}
              aria-label="Close drawer"
            >
              <FiX size={20} />
            </motion.button>
          </Backdrop>

          <motion.div
            ref={setPanelRef}
            data-testid="drawer-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={label}
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
              drawerPanelVariants({ position }),
              size || defaultSize,
              className
            )}
          >
            {children}
            <div className="absolute bottom-0 h-6 w-full shrink-0 bg-gradient-to-t from-white dark:from-ds-900 to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
});

Drawer.displayName = 'Drawer';
