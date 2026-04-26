import * as React from 'react';
import { cn } from '../utils/cn';
import './skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'shimmer' | 'pulse' | 'none';
}

export function Skeleton({
  variant = 'rectangular',
  animation = 'shimmer',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        `skeleton--${variant}`,
        animation !== 'none' && `skeleton--${animation}`,
        className
      )}
      {...props}
    />
  );
}

Skeleton.displayName = 'Skeleton';
