import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

const badgeVariants = cva(
  'relative inline-flex items-center justify-center font-semibold select-none whitespace-nowrap w-fit shrink-0',
  {
    variants: {
      variant: {
        solid: 'border-transparent',
        soft: 'border-transparent',
      },
      color: {
        base: '',
        success: '',
        warning: '',
        danger: '',
        error: '',
        info: '',
        primary: '',
      },
      dot: {
        true: 'size-2 rounded-full',
        false: 'min-w-5 h-5.5 px-2.5 ds-rounded-sm text-[11px] leading-none',
      },
    },
    compoundVariants: [
      // Base
      { variant: 'solid', color: 'base', className: 'bg-ds-600 text-ds-50 dark:bg-ds-500 dark:text-ds-950' },
      { variant: 'soft', color: 'base', className: 'bg-ds-500/15 text-ds-600 dark:text-ds-400 dark:bg-ds-500/20' },
      // Success
      { variant: 'solid', color: 'success', className: 'bg-ds-success-600 text-ds-success-50 dark:bg-ds-success-500 dark:text-ds-success-950' },
      { variant: 'soft', color: 'success', className: 'bg-ds-success-600/15 text-ds-success-600 dark:text-ds-success-400 dark:bg-ds-success-500/20' },
      // Warning
      { variant: 'solid', color: 'warning', className: 'bg-ds-warning-500 text-ds-warning-950 dark:bg-ds-warning-400 dark:text-ds-warning-950' },
      { variant: 'soft', color: 'warning', className: 'bg-ds-warning-500/15 text-ds-warning-600 dark:text-ds-warning-400 dark:bg-ds-warning-500/20' },
      // Danger / Error
      { variant: 'solid', color: 'danger', className: 'bg-ds-danger-600 text-ds-danger-50 dark:bg-ds-danger-500 dark:text-ds-danger-950' },
      { variant: 'soft', color: 'danger', className: 'bg-ds-danger-600/15 text-ds-danger-600 dark:text-ds-danger-400 dark:bg-ds-danger-500/20' },
      { variant: 'solid', color: 'error', className: 'bg-ds-danger-600 text-ds-danger-50 dark:bg-ds-danger-500 dark:text-ds-danger-950' },
      { variant: 'soft', color: 'error', className: 'bg-ds-danger-600/15 text-ds-danger-600 dark:text-ds-danger-400 dark:bg-ds-danger-500/20' },
      // Info
      { variant: 'solid', color: 'info', className: 'bg-ds-info-600 text-ds-info-50 dark:bg-ds-info-500 dark:text-ds-info-950' },
      { variant: 'soft', color: 'info', className: 'bg-ds-info-600/15 text-ds-info-600 dark:text-ds-info-400 dark:bg-ds-info-500/20' },
      // Primary
      { variant: 'solid', color: 'primary', className: 'bg-primary text-primary-foreground' },
      { variant: 'soft', color: 'primary', className: 'bg-primary/15 text-primary dark:text-ds-primary-400 dark:bg-ds-primary-500/20' },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'success',
      dot: false,
    },
  }
);

const pulseColorClasses: Record<BadgeColor, string> = {
  base: 'bg-ds-500',
  success: 'bg-ds-success-600 dark:bg-ds-success-500',
  warning: 'bg-ds-warning-500',
  danger: 'bg-ds-danger-600 dark:bg-ds-danger-500',
  error: 'bg-ds-danger-600 dark:bg-ds-danger-500',
  info: 'bg-ds-info-600 dark:bg-ds-info-500',
  primary: 'bg-primary',
};

export type BadgeVariant = 'solid' | 'soft';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'base';

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'content'> {
  content?: React.ReactNode;
  /** @default 'success' */
  color?: BadgeColor;
  /** @default 'solid' */
  variant?: BadgeVariant;
  /** @default false */
  pulse?: boolean;
  /** @default false */
  dot?: boolean;
  /** @default true */
  show?: boolean;
  /** @default 99 */
  max?: number;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    content,
    color = 'success',
    variant = 'solid',
    pulse = false,
    dot = false,
    show = true,
    max = 99,
    className,
    ...props
  },
  ref
) {
  const displayContent = React.useMemo(() => {
    if (dot) return null;
    if (typeof content === 'number' && content > max) return `${max}+`;
    return content;
  }, [content, max, dot]);

  const colorKey = color === 'error' ? 'danger' : color;

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          ref={ref}
          data-slot="badge"
          className={cn(
            badgeVariants({ variant, color: colorKey, dot }),
            className
          )}
          data-testid="badge"
          {...props}
        >
          {pulse && (
            <span
              data-testid="badge-pulse"
              className={cn(
                'absolute animate-ping opacity-60',
                dot ? 'inset-0 rounded-full' : 'inset-[2px] rounded-[calc(var(--radius)-2px)]',
                pulseColorClasses[colorKey]
              )}
            />
          )}
          <span className="relative z-20 flex items-center justify-center translate-y-[0.5px]">
            {displayContent}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
});

Badge.displayName = 'Badge';
