import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export type BadgeVariant = 'solid' | 'soft';
export type BadgeColor = 'success' | 'warning' | 'danger' | 'error' | 'info' | 'base';

const SOLID_SUCCESS = "bg-ds-success-600 dark:bg-ds-success-500 text-ds-success-50 dark:text-ds-success-950 border-transparent";
const SOLID_WARNING = "bg-ds-warning-500 dark:bg-ds-warning-400 text-ds-warning-950 dark:text-ds-warning-950 border-transparent";
const SOLID_DANGER = "bg-ds-danger-600 dark:bg-ds-danger-500 text-ds-danger-50 dark:text-ds-danger-950 border-transparent";
const SOLID_INFO = "bg-ds-info-600 dark:bg-ds-info-500 text-ds-info-50 dark:text-ds-info-950 border-transparent";
const SOLID_BASE = "bg-ds-500 text-white border-transparent";

const SOFT_SUCCESS = "bg-ds-success-600/15 text-ds-success-600 dark:text-ds-success-400 dark:bg-ds-success-500/20 border-transparent";
const SOFT_WARNING = "bg-ds-warning-500/15 text-ds-warning-600 dark:text-ds-warning-400 dark:bg-ds-warning-500/20 border-transparent";
const SOFT_DANGER = "bg-ds-danger-600/15 text-ds-danger-600 dark:text-ds-danger-400 dark:bg-ds-danger-500/20 border-transparent";
const SOFT_INFO = "bg-ds-info-600/15 text-ds-info-600 dark:text-ds-info-400 dark:bg-ds-info-500/20 border-transparent";
const SOFT_BASE = "bg-ds-500/15 text-ds-600 dark:text-ds-400 border-transparent";

const PULSE_SUCCESS = "bg-ds-success-600 dark:bg-ds-success-500";
const PULSE_WARNING = "bg-ds-warning-500 dark:bg-ds-warning-500";
const PULSE_DANGER = "bg-ds-danger-600 dark:bg-ds-danger-500";
const PULSE_INFO = "bg-ds-info-600 dark:bg-ds-info-500";
const PULSE_BASE_STYLE = "bg-ds-500";

const BADGE_ROOT = "relative inline-flex items-center justify-center font-semibold select-none whitespace-nowrap uppercase";
const DOT_STYLE = "w-2.5 h-2.5 rounded-full";
const CONTENT_STYLE = "min-w-[1.125rem] pt-[5px] pb-[3px] px-2 ds-rounded text-[11px] flex items-center justify-center leading-none";
const PULSE_CONTAINER = "absolute animate-ping opacity-60";
const PULSE_DOT = "inset-0 rounded-full";
const PULSE_RECT = "inset-[2px] rounded-[calc(var(--radius)-2px)]";
const INNER_CONTENT = "relative z-20";

const solidColorStyles: Record<BadgeColor, string> = {
  success: SOLID_SUCCESS,
  warning: SOLID_WARNING,
  danger: SOLID_DANGER,
  error: SOLID_DANGER,
  info: SOLID_INFO,
  base: SOLID_BASE
};

const softColorStyles: Record<BadgeColor, string> = {
  success: SOFT_SUCCESS,
  warning: SOFT_WARNING,
  danger: SOFT_DANGER,
  error: SOFT_DANGER,
  info: SOFT_INFO,
  base: SOFT_BASE
};

const pulseStyles: Record<BadgeColor, string> = {
  success: PULSE_SUCCESS,
  warning: PULSE_WARNING,
  danger: PULSE_DANGER,
  error: PULSE_DANGER,
  info: PULSE_INFO,
  base: PULSE_BASE_STYLE
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

export function Badge({
  content,
  color = 'success',
  variant = 'solid',
  pulse = false,
  dot = false,
  show = true,
  max = 99,
  className,
}: BadgeProps) {
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
            BADGE_ROOT,
            dot ? DOT_STYLE : CONTENT_STYLE,
            badgeStyles,
            className
          )}
          data-testid="badge"
        >
          {pulse && (
            <span
              className={cn(
                PULSE_CONTAINER,
                dot ? PULSE_DOT : PULSE_RECT,
                pulseStyles[color]
              )}
            />
          )}
          <span className={INNER_CONTENT}>{displayContent}</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

