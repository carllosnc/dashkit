import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

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

export interface ScrollAreaProps extends VariantProps<typeof viewportVariants> {
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
