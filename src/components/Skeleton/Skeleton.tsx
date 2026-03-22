import * as React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variants */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Animation type */
  animation?: 'shimmer' | 'pulse' | 'none';
}

/**
 * Skeleton component for loading states.
 * Provides a placeholder that mimics the layout of the actual content.
 * 
 * @see https://dashkit-ui.com/docs/skeleton
 */
export const Skeleton = ({
  variant = 'rectangular',
  animation = 'shimmer',
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        "ds-skeleton",
        variant === 'text' && "h-4 w-full rounded-sm",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-lg",
        animation === 'shimmer' && "ds-skeleton-shimmer",
        animation === 'pulse' && "ds-skeleton-pulse",
        className
      )}
      {...props}
    />
  );
};
