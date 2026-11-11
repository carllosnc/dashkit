import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FiMaximize2, FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useImageExpander } from './useImageExpander';

export interface ImageExpanderProps {
  children: ReactNode;
  full?: ReactNode;
  caption?: string;
  className?: string;
}

export function ImageExpander({ children, full, caption, className }: ImageExpanderProps) {
  const { isOpen, setIsOpen } = useImageExpander();
  const displayFull = full || children;

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={cn('group relative cursor-zoom-in overflow-hidden ds-rounded border border-ds-200 dark:border-ds-800 transition-all duration-300 hover:shadow-xl', className)}
      >
        <div className="flex w-full h-full transition-transform duration-500 group-hover:scale-105">
          {children}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-ds-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <FiMaximize2 className="size-6" />
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="image-expander-dialog"
            className="fixed inset-0 z-[1100] flex items-center justify-center isolate"
            role="dialog"
            aria-modal="true"
            aria-label={caption}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute p-4 md:p-8 inset-0 bg-ds-950/80 backdrop-blur-sm -z-10"
            />

            <div className="absolute inset-0 -z-0" onClick={() => setIsOpen(false)} />

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors z-[110] backdrop-blur-md"
              aria-label="Close"
            >
              <FiX className="size-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-[105] w-full h-full flex flex-col items-center justify-center p-4 md:p-8 overflow-auto no-scrollbar scroll-smooth selection:bg-ds-500/30 pointer-events-none"
            >
              <div
                className="relative shrink-0 flex flex-col items-center justify-center gap-4 pointer-events-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div
                  className="cursor-zoom-out"
                  onClick={() => setIsOpen(false)}
                >
                  {displayFull}
                </div>

                {caption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 350
                    }}
                    className="text-white/90 text-sm font-semibold flex items-center gap-2.5 tracking-tight text-center"
                  >
                    {caption}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}

ImageExpander.displayName = 'ImageExpander';
