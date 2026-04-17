import * as React from 'react';
import { cn } from '../utils/cn';
import { motion, type Transition } from 'framer-motion';

export type SpinnerColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | string;

export interface SpinnerProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'> {
  size?: number | string;
  color?: SpinnerColor;
  thickness?: number;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--color-primary)',
  success: 'var(--color-ds-success-600)',
  warning: 'var(--color-ds-warning-500)',
  danger: 'var(--color-ds-danger-600)',
  info: 'var(--color-ds-info-600)',
  neutral: 'var(--color-ds-500)',
};

const SVG_CLASSES = "drop-shadow-sm";
const SVG_ANIMATE = { rotate: 360 };
const SVG_TRANSITION: Transition = { repeat: Infinity, duration: 1.5, ease: "linear" };

const TRACK_CIRCLE_OPACITY = 0.15;

const ACTIVE_CIRCLE_INITIAL = { pathLength: 0.1, pathOffset: 0 };
const ACTIVE_CIRCLE_ANIMATE = { pathLength: [0.1, 0.8, 0.1], pathOffset: [0, 0.5, 1] };
const ACTIVE_CIRCLE_TRANSITION: Transition = { repeat: Infinity, duration: 1.5, ease: "easeInOut" };

export function Spinner({
  size = 24,
  color = 'currentColor',
  thickness = 2.5,
  className,
  ...props
}: SpinnerProps) {
  const spinnerSize = typeof size === 'number' ? `${size}px` : size;
  const strokeColor = COLOR_MAP[color as string] || color;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={thickness}
      strokeLinecap="round"
      className={cn(SVG_CLASSES, className)}
      animate={SVG_ANIMATE}
      transition={SVG_TRANSITION}
      {...(props as React.ComponentProps<typeof motion.svg>)}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity={TRACK_CIRCLE_OPACITY} />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        strokeOpacity="1"
        initial={ACTIVE_CIRCLE_INITIAL}
        animate={ACTIVE_CIRCLE_ANIMATE}
        transition={ACTIVE_CIRCLE_TRANSITION}
      />
    </motion.svg>
  );
}

Spinner.displayName = 'Spinner';
