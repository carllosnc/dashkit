import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ReactNode } from 'react';
import { FiMaximize2, FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useImageExpander } from './useImageExpander';
import './image-expander.css';

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
        className={cn('image-expander', className)}
      >
        <div className="image-expander__preview">
          {children}
        </div>

        <div className="image-expander__overlay">
          <div className="image-expander__maximize-icon">
            <FiMaximize2 className="size-6" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="image-expander__dialog">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="image-expander__backdrop"
            />

            <div className="absolute inset-0 -z-0" onClick={() => setIsOpen(false)} />

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsOpen(false)}
              className="image-expander__close-button"
            >
              <FiX className="size-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="image-expander__content"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="image-expander__full-image-wrapper">
                <div className="cursor-default">
                  {displayFull}
                </div>
              </div>

              {caption && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="image-expander__caption-gradient"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 350
                    }}
                    className="image-expander__caption"
                  >
                    {caption}
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

ImageExpander.displayName = 'ImageExpander';
