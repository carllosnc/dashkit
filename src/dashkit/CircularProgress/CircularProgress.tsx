import './circular-progress.css';
import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

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

    const trackClasses = trackColor || (variant === 'solid' ? 'circular-progress__track' : `circular-progress__track--soft-${color}`);

    return (
      <div
        ref={ref}
        className={cn(
          'circular-progress',
          typeof size === 'string' && `circular-progress--${size}`,
          className
        )}
        style={{ width: dimension, height: dimension }}
      >
        <svg
          width={dimension}
          height={dimension}
          viewBox={`0 0 ${dimension} ${dimension}`}
          className="circular-progress__svg"
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
            className={`circular-progress__indicator--${color}`}
          />
        </svg>

        {showValue && (
          <div className="circular-progress__value-wrapper">
            <span className={cn(
              'circular-progress__value',
              typeof size === 'number' && "text-[1em]"
            )}>
              {Math.round(value)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);
