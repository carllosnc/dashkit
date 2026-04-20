import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

import './card.css';

export type CardProps = Omit<HTMLMotionProps<'div'>, 'title'> & {
  animate?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

export function Card({
  children,
  animate = false,
  className,
  ref,
  ...props
}: CardProps) {
  return (
    <motion.div
      {...props}
      ref={ref}
      initial={animate ? { opacity: 0, y: 10 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'card',
        className
      )}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}

