import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: string;
  className?: string;
}

const positionVariants: Record<DrawerPosition, Variants> = {
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

const getPositionClasses = (position: DrawerPosition) => {
  switch (position) {
    case 'left': return 'left-0 top-0 h-full';
    case 'right': return 'right-0 top-0 h-full';
    case 'top': return 'top-0 left-0 w-full';
    case 'bottom': return 'bottom-0 left-0 w-full';
  }
};

export const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  title,
  description,
  children,
  size,
  className,
}: DrawerProps) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const defaultSize = (position === 'left' || position === 'right') ? 'max-w-md w-full' : 'max-h-[80vh] h-auto';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate overflow-hidden flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base-950/40 backdrop-blur-sm -z-10"
          />

          {/* Drawer Content */}
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
            onDragEnd={(_, info) => {
              const threshold = 100;
              const isClosing = 
                (position === 'right' && info.offset.x > threshold) ||
                (position === 'left' && info.offset.x < -threshold) ||
                (position === 'bottom' && info.offset.y > threshold) ||
                (position === 'top' && info.offset.y < -threshold);
              
              if (isClosing) onClose();
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "absolute ds-block rounded-none overflow-hidden flex flex-col",
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
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  {/* Visual Drag Handle */}
                  <div className={cn(
                    "rounded-full bg-base-200 dark:bg-base-800 shrink-0",
                    (position === 'left' || position === 'right') ? "w-1 h-8" : "w-8 h-1"
                  )} />
                  {title && (
                    <h2 className="text-lg font-bold text-block-fg dark:text-block-dark-fg tracking-tight uppercase">
                      {title}
                    </h2>
                  )}
                </div>
                {description && (
                  <p className="text-sm text-base-500 dark:text-base-400 pl-4">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md transition-all duration-200 hover:bg-base-100 dark:hover:bg-base-800 text-base-400 hover:text-base-900 dark:hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
              {children}
            </div>

            {/* Footer shadow fade */}
            <div className="h-6 w-full shrink-0 bg-gradient-to-t from-white dark:from-base-900 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
