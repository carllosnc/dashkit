import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDrawer, type DrawerPosition } from './useDrawer';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export { type DrawerPosition };

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  children: ReactNode;
  size?: string;
  className?: string;
}

export const DrawerHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-6 pb-4 flex flex-col gap-1", className)}>
    {children}
  </div>
);

export const DrawerContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex-1 overflow-y-auto px-6 py-2 custom-scrollbar", className)}>
    {children}
  </div>
);

export const DrawerFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("p-6 pt-4 flex items-center justify-end gap-3", className)}>
    {children}
  </div>
);

export const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  children,
  size,
  className,
}: DrawerProps) => {
  const {
    defaultSize,
    handleDragEnd,
    positionVariants,
    getPositionClasses
  } = useDrawer({ isOpen, onClose, position });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate overflow-hidden flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ds-950/40 backdrop-blur-sm -z-10"
          />

          <motion.div
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
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "absolute bg-card text-card-foreground shadow-sm border-border overflow-hidden flex flex-col",
              "touch-none",
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
              className="absolute top-4 right-4 p-2 rounded-md transition-all duration-200 hover:bg-ds-100 dark:hover:bg-ds-800 text-ds-400 hover:text-ds-900 dark:hover:text-white z-[60]"
              aria-label="Close drawer"
            >
              <FiX size={20} />
            </button>

            {children}

            <div className="absolute bottom-0 h-6 w-full shrink-0 bg-gradient-to-t from-white dark:from-ds-900 to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
