import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const skeletonVariants = cva('relative overflow-hidden bg-muted', {
  variants: {
    variant: {
      text: 'h-4 w-full ds-rounded',
      circular: 'rounded-full',
      rectangular: 'ds-rounded',
    },
    animation: {
      shimmer:
        'after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-foreground/5 after:to-transparent after:animate-[ds-shimmer_1.5s_infinite]',
      pulse: 'animate-[ds-pulse_1.2s_infinite]',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
    animation: 'shimmer',
  },
});

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StrictVariantProps<typeof skeletonVariants> {}

/**
 * Animated loading placeholder (`variant="text" | "circular" | "rectangular"`).
 *
 * @example
 * ```tsx
 * <Skeleton variant="rectangular" className="h-24 w-full" />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    variant = 'rectangular',
    animation = 'shimmer',
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, animation }), className)}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
