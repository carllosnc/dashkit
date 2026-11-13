import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
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

export interface ScrollAreaProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof viewportVariants> {
  children: ReactNode;
  viewportClassName?: string;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  {
    children,
    className,
    viewportClassName,
    orientation,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="scroll-area"
      className={cn('relative overflow-hidden w-full h-full', className)}
      {...props}
    >
      <div data-slot="scroll-area-viewport" className={cn(viewportVariants({ orientation }), viewportClassName)}>
        {children}
      </div>
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';
