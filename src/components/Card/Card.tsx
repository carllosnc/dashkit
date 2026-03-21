import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

// --- Composed Components ---

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Extra content on the top right, perfect for badges or status indicators */
  extra?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, extra, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pt-6 pb-0 flex items-start justify-between gap-10 relative",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1.5 flex-1">
        {children}
      </div>
      {extra && <div className="shrink-0">{extra}</div>}
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
      className={cn("text-[13px] text-base-500 dark:text-base-400 leading-relaxed font-medium", className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-6 flex-1", className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

/** Alias for CardContent */
export const CardComponent = CardContent;

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4 bg-base-50 dark:bg-white/[0.02] border-t border-base-200 dark:border-base-800 flex items-center justify-end gap-3",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// --- Main Card Wrapper ---

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  /** Border style */
  bordered?: boolean;
  /** Shadow style */
  shadowed?: boolean;
  /** Entrance animation */
  animate?: boolean;
}

/**
 * A premium composed Card Wrapper. 
 * Use with sub-components (CardHeader, CardContent, CardFooter) for full layout control.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    bordered = true, 
    shadowed = false,
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
          "bg-white dark:bg-base-900 overflow-hidden flex flex-col font-sans",
          bordered && "border border-base-200 dark:border-base-800 rounded-lg",
          shadowed && "shadow-md shadow-base-200/50 dark:shadow-black/40",
          className
        )}
      >
        {children as React.ReactNode}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
