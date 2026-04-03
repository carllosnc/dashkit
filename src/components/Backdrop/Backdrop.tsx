import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface BackdropProps extends HTMLMotionProps<'div'> {
  show?: boolean;
  blur?: boolean;
  transparent?: boolean;
  fixed?: boolean;
  children?: React.ReactNode;
}

const BACKDROP_CONTAINER = "fixed inset-0 z-50 flex items-center justify-center p-6 isolate";
const OVERLAY_BASE = "absolute inset-0 -z-10";

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
        OVERLAY_BASE,
        !transparent && "bg-ds-950/40",
        blur && "backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );

  if (!show) return null;

  if (children || fixed) {
    return (
      <div className={cn(BACKDROP_CONTAINER, !fixed && "absolute")}>
        {overlay}
        {children}
      </div>
    );
  }

  return overlay;
}

Backdrop.displayName = 'Backdrop';
