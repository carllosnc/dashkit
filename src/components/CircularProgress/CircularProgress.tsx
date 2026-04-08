import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CircularProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg' | number;
  strokeWidth?: number;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  variant?: 'solid' | 'soft';
  showValue?: boolean;
  showTrack?: boolean;
  roundCaps?: boolean;
  trackColor?: string;
  className?: string;
}

const ROOT_WRAPPER = "relative inline-flex items-center justify-center";
const SVG_ROOT = "rotate-[-90deg]";
const VALUE_WRAPPER = "absolute inset-0 flex flex-col items-center justify-center text-center px-1";
const VALUE_BASE = "font-bold text-foreground leading-none";

const LIGHT_TRACK = "text-ds-100 dark:text-ds-800";

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

const textSizes = {
  sm: "text-[10px]",
  md: "text-base",
  lg: "text-xl",
};

const indicatorColorClasses = {
  primary: 'text-primary',
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  danger: 'text-rose-500',
  info: 'text-sky-500',
};

const softTrackColors = {
  primary: 'text-primary/20',
  success: 'text-emerald-500/20',
  warning: 'text-amber-500/20',
  danger: 'text-rose-500/20',
  info: 'text-sky-500/20',
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

    const trackClasses = trackColor || (variant === 'solid' ? LIGHT_TRACK : softTrackColors[color]);

    return (
      <div
        ref={ref}
        className={cn(ROOT_WRAPPER, className)}
        style={{ width: dimension, height: dimension }}
      >
        <svg
          width={dimension}
          height={dimension}
          viewBox={`0 0 ${dimension} ${dimension}`}
          className={SVG_ROOT}
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
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap={roundCaps ? "round" : "butt"}
            className={indicatorColorClasses[color]}
          />
        </svg>

        {showValue && (
          <div className={VALUE_WRAPPER}>
            <span className={cn(
              VALUE_BASE,
              typeof size === 'number' ? "text-[1em]" : textSizes[size]
            )}>
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);
