import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'solid' | 'soft';
export type BadgeColor = 'success' | 'warning' | 'danger' | 'error' | 'info' | 'base';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const solidColorStyles: Record<BadgeColor, string> = {
  success: "bg-ds-success-600 dark:bg-ds-success-500 text-ds-success-50 dark:text-ds-success-950 border-transparent",
  warning: "bg-ds-warning-500 dark:bg-ds-warning-400 text-ds-warning-950 dark:text-ds-warning-950 border-transparent",
  danger: "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent",
  error: "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent",
  info: "bg-ds-info-600 dark:bg-ds-info-500 text-ds-info-50 dark:text-ds-info-950 border-transparent",
  base: "bg-ds-500 text-white border-transparent"
};

const softColorStyles: Record<BadgeColor, string> = {
  success: "bg-ds-success-600/15 text-ds-success-600 dark:text-ds-success-400 dark:bg-ds-success-500/20 border-transparent",
  warning: "bg-ds-warning-500/15 text-ds-warning-600 dark:text-ds-warning-400 dark:bg-ds-warning-500/20 border-transparent",
  danger: "bg-ds-danger-600/15 text-ds-danger-600 dark:text-ds-danger-400 dark:bg-ds-danger-500/20 border-transparent",
  error: "bg-ds-danger-600/15 text-ds-danger-600 dark:text-ds-danger-400 dark:bg-ds-danger-500/20 border-transparent",
  info: "bg-ds-info-600/15 text-ds-info-600 dark:text-ds-info-400 dark:bg-ds-info-500/20 border-transparent",
  base: "bg-ds-500/15 text-ds-600 dark:text-ds-400 border-transparent"
};

const pulseStyles: Record<BadgeColor, string> = {
  success: "bg-ds-success-600 dark:bg-ds-success-500",
  warning: "bg-ds-warning-500 dark:bg-ds-warning-500",
  danger: "bg-ds-danger-600 dark:bg-ds-danger-500",
  error: "bg-ds-danger-600 dark:bg-ds-danger-500",
  info: "bg-ds-info-600 dark:bg-ds-info-500",
  base: "bg-ds-500"
};

const positionClasses: Record<BadgePosition, string> = {
  'top-right': 'top-0 right-0 -translate-y-1/2 translate-x-1/2',
  'top-left': 'top-0 left-0 -translate-y-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-0 right-0 translate-y-1/2 translate-x-1/2',
  'bottom-left': 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2'
};

export interface BadgeProps {
  content?: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  pulse?: boolean;
  dot?: boolean;
  show?: boolean;
  max?: number;
  className?: string;
}

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
            dot ? "w-2.5 h-2.5 rounded-full" : "min-w-[1.125rem] pt-[5px] pb-[3px] px-1.5 rounded-[var(--radius)] text-[11px] flex items-center justify-center leading-none",
            badgeStyles,
            className
          )}
          data-testid="badge"
        >
          {pulse && (
            <span
              className={cn(
                "absolute inset-0 animate-ping opacity-60",
                dot ? "rounded-full" : "rounded-[var(--radius)]",
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
  children: React.ReactNode;
  position?: BadgePosition;
  offset?: [number, number];
}

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
