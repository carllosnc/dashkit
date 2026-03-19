import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, type ReactNode } from 'react';
import { FiMaximize2, FiX } from 'react-icons/fi';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ImageExpanderProps {
  /** The thumbnail image/element or main content */
  children: ReactNode;
  /** The full size image/element to show in the modal (falls back to children) */
  full?: ReactNode;
  /** Optional caption for the expanded image */
  caption?: string;
  /** Additional CSS classes for the thumbnail container */
  className?: string;
}

/**
 * A premium image expander component that zooms in on click.
 * Features smooth spring animations, backdrop blur, and dark mode support.
 */
export function ImageExpander({ children, full, caption, className }: ImageExpanderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const displayFull = full || children;

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative cursor-zoom-in overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl",
          className
        )}
      >
        <div className="flex w-full h-full transition-transform duration-500 group-hover:scale-105">
          {children}
        </div>
        
        {/* Hover Overlay Indicator */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <FiMaximize2 className="size-6" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 isolate">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm -z-10"
            />

            {/* Close Button Trigger Area (Clicking empty space closes) */}
            <div className="absolute inset-0 -z-0" onClick={() => setIsOpen(false)} />

            {/* Close Button Top Right */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors z-[110] backdrop-blur-md"
            >
              <FiX className="size-6" />
            </motion.button>

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] flex flex-col items-center justify-center gap-4 z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative p-1.5 bg-white dark:bg-neutral-900 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="rounded-[1.5rem] overflow-hidden max-h-[80vh]">
                  {displayFull}
                </div>
              </div>
              
              {/* Optional Caption */}
              {caption && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium shadow-xl"
                >
                  {caption}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

ImageExpander.displayName = 'ImageExpander';
