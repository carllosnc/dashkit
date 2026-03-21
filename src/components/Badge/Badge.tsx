import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'solid';
export type BadgeColor = 'success' | 'warning' | 'error' | 'info' | 'base';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const colorStyles: Record<BadgeColor, string> = {
  success: "bg-base-success dark:bg-base-success-dark text-white",
  warning: "bg-base-warning dark:bg-base-warning-dark text-white",
  error: "bg-base-error dark:bg-base-error-dark text-white",
  info: "bg-base-info dark:bg-base-info-dark text-white",
  base: "bg-base-900 text-white dark:bg-white dark:text-base-950"
};

const pulseStyles: Record<BadgeColor, string> = {
  success: "bg-base-success dark:bg-base-success-dark",
  warning: "bg-base-warning dark:bg-base-warning-dark",
  error: "bg-base-error dark:bg-base-error-dark",
  info: "bg-base-info dark:bg-base-info-dark",
  base: "bg-base-900 dark:bg-white"
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
 * 
 * @see https://dashkit-ui.com/docs/badge
 */
export const Badge = ({
  content,
  color = 'success',
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
    return colorStyles[color];
  }, [color]);

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className={cn(
            "relative inline-flex items-center justify-center font-semibold select-none whitespace-nowrap",
            dot ? "w-2.5 h-2.5 rounded-full" : "min-w-[1.125rem] pt-[5px] pb-[3px] px-1.5 rounded-sm text-[11px] flex items-center justify-center leading-none",
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
                pulseStyles[color]
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
 * 
 * @see https://dashkit-ui.com/docs/badge
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
