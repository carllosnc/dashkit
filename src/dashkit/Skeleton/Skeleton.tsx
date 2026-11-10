import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

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

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({
  variant = 'rectangular',
  animation = 'shimmer',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, animation }), className)}
      {...props}
    />
  );
}

Skeleton.displayName = 'Skeleton';
