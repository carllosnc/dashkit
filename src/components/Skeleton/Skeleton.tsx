import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'shimmer' | 'pulse' | 'none';
}

export const Skeleton = ({
  variant = 'rectangular',
  animation = 'shimmer',
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        variant === 'text' && "h-4 w-full rounded-sm",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-lg",
        animation === 'shimmer' && "after:absolute after:inset-0 after:-translate-x-full after:animate-[ds-shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-foreground/5 after:to-transparent",
        animation === 'pulse' && "animate-[ds-pulse_1.2s_infinite]",
        className
      )}
      {...props}
    />
  );
};
