import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  extra?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
};

export type CardTitleProps = React.ComponentPropsWithRef<'h3'>;
export type CardDescriptionProps = React.ComponentPropsWithRef<'p'>;
export type CardContentProps = React.ComponentPropsWithRef<'div'>;
export type CardFooterProps = React.ComponentPropsWithRef<'div'>;

export function CardHeader({
  className,
  extra,
  children,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn("p-6 flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex flex-col gap-1 flex-1">
        {children}
      </div>
      {extra && <div className="shrink-0">{extra}</div>}
    </div>
  );
}

export function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-bold text-foreground tracking-tight leading-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ref, ...props }: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground font-medium", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn("p-6 flex-1", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 flex items-center justify-end gap-3 bg-card border-t border-border",
        className
      )}
      {...props}
    />
  );
}

// --- Main Component ---

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
        "bg-card text-card-foreground rounded-lg shadow-sm overflow-hidden flex flex-col font-sans",
        !bordered && "border-none",
        !shadowed && "shadow-none",
        className
      )}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}


