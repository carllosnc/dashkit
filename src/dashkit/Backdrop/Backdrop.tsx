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
  React.useEffect(() => {
    if (!show || !onClick) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClick({} as React.MouseEvent<HTMLDivElement>);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onClick]);

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
