import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export type CircularProgressColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type CircularProgressVariant = 'solid' | 'soft';
export type CircularProgressSize = 'sm' | 'md' | 'lg' | number;

export interface CircularProgressProps {
  value: number;
  size?: CircularProgressSize;
  strokeWidth?: number;
  color?: CircularProgressColor;
  variant?: CircularProgressVariant;
  showValue?: boolean;
  showTrack?: boolean;
  roundCaps?: boolean;
  trackColor?: string;
  className?: string;
}

const sizeMap = {
  sm: 40,
  md: 64,
  lg: 96,
};

const strokeWidthMap = {
  sm: 4,
  md: 6,
  lg: 8,
};

const softTrackColors: Record<NonNullable<CircularProgressProps['color']>, string> = {
  primary: 'text-primary/20',
  success: 'text-success/20',
  warning: 'text-warning/20',
  danger: 'text-danger/20',
  info: 'text-info/20',
};

const indicatorColors: Record<NonNullable<CircularProgressProps['color']>, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
};

const valueSizeClasses: Record<string, string> = {
  sm: 'text-[10px]',
  md: 'text-base',
  lg: 'text-xl',
};

export const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress({
    value,
    size = 'md',
    strokeWidth,
    color = 'primary',
    variant = 'solid',
    showValue = false,
    showTrack = true,
    roundCaps = true,
    trackColor,
    className
  }, ref) {
    const dimension = typeof size === 'number' ? size : sizeMap[size];
    const stroke = strokeWidth || (typeof size === 'number' ? Math.max(2, size / 10) : strokeWidthMap[size]);

    const radius = (dimension - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    const trackClasses = trackColor || (variant === 'solid' ? 'text-ds-100 dark:text-ds-800' : softTrackColors[color]);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: dimension, height: dimension }}
      >
        <svg
          width={dimension}
          height={dimension}
          viewBox={`0 0 ${dimension} ${dimension}`}
          className="rotate-[-90deg]"
        >
          {showTrack && (
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={stroke}
              className={trackClasses}
            />
          )}
          <motion.circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap={roundCaps ? 'round' : 'butt'}
            className={indicatorColors[color]}
          />
        </svg>

        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
            <span
              className={cn(
                'font-bold text-foreground leading-none',
                typeof size === 'string' ? valueSizeClasses[size] : 'text-[1em]'
              )}
            >
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
