import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const cardVariants = cva(
  'relative bg-card text-card-foreground p-6 rounded-xl gap-6 flex flex-col font-sans',
  {
    variants: {
      bordered: {
        true: 'border border-border/80 ds-border-width',
        false: 'border-0',
      },
      shadowed: {
        true: 'shadow-sm',
        false: 'shadow-none ds-card-shadow',
      },
    },
    defaultVariants: {
      bordered: true,
      shadowed: false,
    },
  }
);

export type CardProps = Omit<HTMLMotionProps<'div'>, 'title'> &
  StrictVariantProps<typeof cardVariants> & {
    /** @default false */
    animate?: boolean;
    ref?: React.Ref<HTMLDivElement>;
  };

export function Card({
  children,
  animate = false,
  bordered = true,
  shadowed = false,
  className,
  ref,
  ...props
}: CardProps) {
  return (
    <motion.div
      {...props}
      ref={ref}
      data-slot="card"
      initial={animate ? { opacity: 0, y: 10 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(cardVariants({ bordered, shadowed }), className)}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}
