import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export interface BackdropProps extends HTMLMotionProps<'div'> {
  /** @default true */
  show?: boolean;
  /** @default true */
  blur?: boolean;
  /** @default false */
  transparent?: boolean;
  /** @default true */
  fixed?: boolean;
  children?: React.ReactNode;
}

/**
 * Animated modal/drawer overlay backdrop (`children` optional).
 *
 * @example
 * ```tsx
 * <Backdrop isOpen={open} onClick={() => setOpen(false)} />
 * ```
 */
export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
  {
    show = true,
    blur = true,
    transparent = false,
    fixed = true,
    className,
    onClick,
    children,
    ...props
  },
  ref
) {
  const overlay = (
    <motion.div
      ref={ref}
      data-slot="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className={cn(
        'absolute inset-0 -z-10',
        !transparent && 'bg-ds-950/40 dark:bg-white/15',
        blur && 'backdrop-blur-sm dark:backdrop-blur-md',
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
        data-slot="backdrop-root"
        data-testid="backdrop-root"
        className={cn(
          'inset-0 z-[1100] flex items-center justify-center p-6 isolate',
          fixed ? 'fixed' : 'absolute'
        )}
      >
        {overlay}
        {children}
      </div>
    );
  }

  return overlay;
});

Backdrop.displayName = 'Backdrop';
