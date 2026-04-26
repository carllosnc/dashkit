import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

import './badge.css';

export type BadgeVariant = 'solid' | 'soft';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'base';

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

  // Normalize color key (handle 'error' as 'danger')
  const colorKey = color === 'error' ? 'danger' : color;

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className={cn(
            'badge',
            dot ? 'badge__dot' : 'badge__content',
            `badge--${variant}-${colorKey}`,
            className
          )}
          data-testid="badge"
        >
          {pulse && (
            <span
              className={cn(
                'badge__pulse',
                dot ? 'badge__pulse--dot' : 'badge__pulse--rect',
                `badge__pulse--${colorKey}`
              )}
            />
          )}
          <span className="badge__inner-content">{displayContent}</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}
