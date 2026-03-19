import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const colorStyles: Record<BadgeColor, string> = {
  primary: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90",
  success: "bg-emerald-500 text-white hover:bg-emerald-600",
  warning: "bg-amber-500 text-white hover:bg-amber-600",
  error: "bg-red-500 text-white hover:bg-red-600",
  info: "bg-blue-500 text-white hover:bg-blue-600",
  neutral: "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700"
};

const softStyles: Record<BadgeColor, string> = {
  primary: "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  error: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  info: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  neutral: "bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
};

const outlineStyles: Record<BadgeColor, string> = {
  primary: "border-black text-black dark:border-white dark:text-white",
  success: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
  warning: "border-amber-500 text-amber-600 dark:text-amber-400",
  error: "border-red-500 text-red-600 dark:text-red-400",
  info: "border-blue-500 text-blue-600 dark:text-blue-400",
  neutral: "border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
};

const positionClasses: Record<BadgePosition, string> = {
  'top-right': 'top-0 right-0 -translate-y-[45%] translate-x-[45%]',
  'top-left': 'top-0 left-0 -translate-y-[45%] -translate-x-[45%]',
  'bottom-right': 'bottom-0 right-0 translate-y-[45%] translate-x-[45%]',
  'bottom-left': 'bottom-0 left-0 translate-y-[45%] -translate-x-[45%]'
};

export interface BadgeProps {
  /** Content to display inside the badge */
  content?: React.ReactNode;
  /** Styling variant */
  variant?: BadgeVariant;
  /** Color palette */
  color?: BadgeColor;
  /** Whether to show a pulse animation */
  pulse?: boolean;
  /** Whether to show just a dot */
  dot?: boolean;
  /** Whether the badge is visible */
  show?: boolean;
  /** Maximum number to display (e.g., 99+) */
  max?: number;
  /** Custom classes */
  className?: string;
}

/**
 * Standard Inline Badge component.
 * Used for standalone status indicators or labels.
 */
export const Badge = ({
  content,
  variant = 'solid',
  color = 'primary',
  pulse = false,
  dot = false,
  show = true,
  max = 99,
  className,
}: BadgeProps) => {
  const displayContent = React.useMemo(() => {
    if (dot) return null;
    if (typeof content === 'number' && content > max) return `${max}+`;
    return content;
  }, [content, max, dot]);

  const badgeStyles = React.useMemo(() => {
    if (variant === 'soft') return softStyles[color];
    if (variant === 'outline') return `border ${outlineStyles[color]}`;
    return colorStyles[color];
  }, [variant, color]);

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          className={cn(
            "relative inline-flex items-center justify-center font-bold select-none whitespace-nowrap",
            dot ? "w-2.5 h-2.5 rounded-full" : "min-w-[1.25rem] h-5 px-1.5 rounded-sm text-[10px] leading-none",
            badgeStyles,
            className
          )}
          data-testid="badge"
        >
          {pulse && (
            <span 
              className={cn(
                "absolute inset-0 animate-ping opacity-60",
                dot ? "rounded-full" : "rounded-sm",
                badgeStyles
              )} 
            />
          )}
          <span className="relative z-20">{displayContent}</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export interface FloatBadgeProps extends BadgeProps {
  /** The element the badge will be attached to */
  children: React.ReactNode;
  /** Placement relative to children */
  position?: BadgePosition;
  /** Custom offset [x, y] */
  offset?: [number, number];
}

/**
 * FloatBadge component.
 * Wraps an element and places a badge over it at a specific position.
 */
export const FloatBadge = ({
  children,
  position = 'top-right',
  offset,
  className,
  ...props
}: FloatBadgeProps) => {
  return (
    <div className="relative inline-flex align-middle shrink-0">
      {children}
      <div 
        className={cn("absolute z-10", positionClasses[position], className)}
        style={{
          marginTop: offset ? offset[1] : undefined,
          marginRight: offset && (position === 'top-right' || position === 'bottom-right') ? -offset[0] : undefined,
          marginLeft: offset && (position === 'top-left' || position === 'bottom-left') ? offset[0] : undefined,
        }}
      >
        <Badge {...props} />
      </div>
    </div>
  );
};
