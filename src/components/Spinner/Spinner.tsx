import * as React from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /** Size of the spinner in pixels or any valid CSS unit. Defaults to 24px. */
  size?: number | string;
  /** Color of the spinner. Defaults to currentColor. */
  color?: string;
  /** Thickness of the spinner stroke. Defaults to 2. */
  thickness?: number;
  /** Additional CSS classes for the container. */
  className?: string;
}

/**
 * A sleek, high-performance loading spinner built with SVG and standard Tailwind CSS animations.
 * 
 * @see https://dashkit-ui.com/docs/spinner
 */
export const Spinner = ({
  size = 24,
  color = 'currentColor',
  thickness = 2,
  className,
  ...props
}: SpinnerProps) => {
  const spinnerSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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


