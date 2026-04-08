import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

const CARD_ROOT = "bg-card text-card-foreground p-6 ds-rounded shadow-sm overflow-hidden gap-6 flex flex-col font-sans";
const BORDER_NONE = "border-none";
const SHADOW_NONE = "shadow-none";

export type CardProps = Omit<HTMLMotionProps<'div'>, 'title'> & {
  bordered?: boolean;
  shadowed?: boolean;
  animate?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

export function Card({
  children,
  bordered = true,
  shadowed = true,
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
        CARD_ROOT,
        !bordered && BORDER_NONE,
        !shadowed && SHADOW_NONE,
        className
      )}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}

