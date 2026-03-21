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
    <>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes skeleton-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.40;
          }
        }
      `}</style>
      <div
        className={cn(
          "relative overflow-hidden bg-layout-divider dark:bg-layout-dark-divider",
          variant === 'text' && "h-4 w-full rounded-sm",
          variant === 'circular' && "rounded-full",
          variant === 'rectangular' && "rounded-block",
          animation === 'shimmer' && "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 dark:after:via-white/10 after:to-transparent",
          animation === 'pulse' && "animate-[skeleton-pulse_1.2s_infinite]",
          className
        )}
        {...props}
      />
    </>
  );
};
