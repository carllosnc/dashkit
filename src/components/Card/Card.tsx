import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

export type CardTitleProps = React.ComponentPropsWithRef<'h3'>;
export type CardDescriptionProps = React.ComponentPropsWithRef<'p'>;
export type CardContentProps = React.ComponentPropsWithRef<'div'>;
export type CardFooterProps = React.ComponentPropsWithRef<'div'>;

export function CardHeader({
  className,
  children,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {children}
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
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn("flex-1", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-3",
        className
      )}
      {...props}
    />
  );
}

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
        "bg-card text-card-foreground p-6 rounded-lg shadow-sm overflow-hidden gap-6 flex flex-col font-sans",
        !bordered && "border-none",
        !shadowed && "shadow-none",
        className
      )}
    >
      {children as React.ReactNode}
    </motion.div>
  );
}


