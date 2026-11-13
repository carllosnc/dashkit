import type { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const viewportVariants = cva('h-full w-full rounded-[inherit] custom-scrollbar', {
  variants: {
    orientation: {
      vertical: 'overflow-y-auto overflow-x-hidden',
      horizontal: 'overflow-x-auto overflow-y-hidden',
      both: 'overflow-auto',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends StrictVariantProps<typeof viewportVariants> {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
}

export function ScrollArea({
  children,
  className,
  viewportClassName,
  orientation,
}: ScrollAreaProps) {
  return (
    <div className={cn('relative overflow-hidden w-full h-full', className)}>
      <div className={cn(viewportVariants({ orientation }), viewportClassName)}>
        {children}
      </div>
    </div>
  );
}

ScrollArea.displayName = 'ScrollArea';
