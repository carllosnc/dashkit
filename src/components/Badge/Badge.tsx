import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'solid' | 'soft';
export type BadgeColor = 'success' | 'warning' | 'danger' | 'error' | 'info' | 'base';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const solidColorStyles: Record<BadgeColor, string> = {
  success: "bg-success text-success-foreground border-transparent",
  warning: "bg-warning text-warning-foreground border-transparent",
  danger: "bg-danger text-danger-foreground border-transparent",
  error: "bg-danger text-danger-foreground border-transparent",
  info: "bg-info text-info-foreground border-transparent",
  base: "bg-ds-500 text-white border-transparent"
};

const softColorStyles: Record<BadgeColor, string> = {
  success: "bg-success/15 text-success dark:bg-success/20 border-transparent",
  warning: "bg-warning/15 text-warning dark:bg-warning/20 border-transparent",
  danger: "bg-danger/15 text-danger dark:bg-danger/20 border-transparent",
  error: "bg-danger/15 text-danger dark:bg-danger/20 border-transparent",
  info: "bg-info/15 text-info dark:bg-info/20 border-transparent",
  base: "bg-ds-500/15 text-ds-600 dark:text-ds-400 border-transparent"
};

const pulseStyles: Record<BadgeColor, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  error: "bg-danger",
  info: "bg-info",
  base: "bg-ds-500"
};

const positionClasses: Record<BadgePosition, string> = {
  'top-right': 'top-0 right-0 -translate-y-1/2 translate-x-1/2',
  'top-left': 'top-0 left-0 -translate-y-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-0 right-0 translate-y-1/2 translate-x-1/2',
  'bottom-left': 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2'
};

export interface BadgeProps {
  /** Content to display inside the badge */
  content?: React.ReactNode;
  /** Color palette */
  color?: BadgeColor;
  /** Visual style variant */
  variant?: BadgeVariant;
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
  variant = 'solid',
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
    return variant === 'solid' ? solidColorStyles[color] : softColorStyles[color];
  }, [color, variant]);

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
        className={cn(
          "absolute z-10",
          positionClasses[position],
          props.dot && (
            position === 'top-right' ? "-translate-y-[50%] translate-x-[20%]" :
            position === 'top-left' ? "-translate-y-[50%] -translate-x-[20%]" :
            position === 'bottom-right' ? "translate-y-[10%] translate-x-[10%]" :
            "translate-y-[10%] -translate-x-[10%]"
          ),
          className
        )}
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


