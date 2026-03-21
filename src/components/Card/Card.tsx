import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

// --- Card Parts ---

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  extra?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, extra, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex flex-col gap-1 flex-1">
        {children}
      </div>
      {extra && <div className="shrink-0 pt-1">{extra}</div>}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-bold text-base-950 dark:text-white tracking-tight leading-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-base-500 dark:text-base-400 font-medium", className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pb-6 flex-1", className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4 bg-base-50/50 dark:bg-black/20 border-t border-layout-divider dark:border-layout-dark-divider flex items-center justify-end gap-3",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// --- Main Component ---

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  bordered?: boolean;
  shadowed?: boolean;
  animate?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    bordered = true, 
    shadowed = true, 
    animate = false, 
    className, 
    ...props 
  }, ref) => {
    return (
      <motion.div
        {...props}
        ref={ref}
        initial={animate ? { opacity: 0, y: 10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          "bg-block-bg dark:bg-block-dark-bg overflow-hidden flex flex-col font-sans",
          bordered && "border border-block-border dark:border-block-dark-border rounded-block",
          shadowed && "shadow-block dark:shadow-block-dark",
          className
        )}
      >
        {children as React.ReactNode}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
