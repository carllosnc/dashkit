import * as React from 'react';
import { cn } from '../utils/cn';

export type SpinnerColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | string;

export interface SpinnerProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'> {
  size?: number | string;
  color?: SpinnerColor;
  thickness?: number;
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: 'var(--color-primary)',
  success: 'var(--color-ds-success-600)',
  warning: 'var(--color-ds-warning-500)',
  danger: 'var(--color-ds-danger-600)',
  info: 'var(--color-ds-info-600)',
  neutral: 'var(--color-ds-500)',
};

export const Spinner = ({
  size = 24,
  color = 'currentColor',
  thickness = 2,
  className,
  ...props
}: SpinnerProps) => {
  const spinnerSize = typeof size === 'number' ? `${size}px` : size;
  const strokeColor = colorMap[color as string] || color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={thickness}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

Spinner.displayName = 'Spinner';
