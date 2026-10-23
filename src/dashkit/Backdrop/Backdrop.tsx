import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

import './backdrop.css';

export interface BackdropProps extends HTMLMotionProps<'div'> {
  show?: boolean;
  blur?: boolean;
  transparent?: boolean;
  fixed?: boolean;
  children?: React.ReactNode;
}

export function Backdrop({
  show = true,
  blur = true,
  transparent = false,
  fixed = true,
  className,
  onClick,
  children,
  ...props
}: BackdropProps) {
  // Note: Escape-to-close is handled by the overlay hooks (useModal/useDrawer)
  // instead of here, so `onClose` is invoked exactly once with a real event.
  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={cn(
        'backdrop__overlay',
        !transparent && 'backdrop__overlay--color',
        blur && 'backdrop__overlay--blur',
        className
      )}
      data-testid="backdrop-overlay"
      {...props}
    />
  );

  if (!show) return null;

  if (children || fixed) {
    return (
      <div 
        className={cn(
          'backdrop', 
          !fixed && 'backdrop--absolute'
        )}
      >
        {overlay}
        {children}
      </div>
    );
  }

  return overlay;
}
