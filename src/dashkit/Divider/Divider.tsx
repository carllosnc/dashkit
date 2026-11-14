import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const dividerVariants = cva('shrink-0 border-border', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-auto self-stretch',
    },
    variant: {
      solid: 'bg-ds-200 dark:bg-ds-800',
      dashed: 'bg-transparent border-dashed',
      dotted: 'bg-transparent border-dotted',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'solid',
      className: 'h-[1px]',
    },
    {
      orientation: 'vertical',
      variant: 'solid',
      className: 'w-[1px]',
    },
    {
      orientation: 'horizontal',
      variant: ['dashed', 'dotted'],
      className: 'h-0 border-t',
    },
    {
      orientation: 'vertical',
      variant: ['dashed', 'dotted'],
      className: 'w-0 border-l',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
  },
});

const dividerLineVariants = cva('flex-1 border-border', {
  variants: {
    variant: {
      solid: 'h-[1px] bg-ds-200 dark:bg-ds-800',
      dashed: 'bg-transparent border-t border-dashed',
      dotted: 'bg-transparent border-t border-dotted',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});

export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerContentPosition = 'left' | 'center' | 'right';

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StrictVariantProps<typeof dividerVariants> {
  children?: React.ReactNode;
  contentPosition?: DividerContentPosition;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      children,
      variant = 'solid',
      contentPosition = 'center',
      className,
      ...props
    },
    ref
  ) {
    const isHorizontal = orientation === 'horizontal';
    const hasContent = isHorizontal && !!children;

    if (hasContent) {
      return (
        <div
          ref={ref}
          data-slot="divider"
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center w-full gap-4 bg-transparent h-auto border-none', className)}
          {...props}
        >
          <div
            data-testid="divider-line"
            className={cn(dividerLineVariants({ variant }), contentPosition === 'left' && 'hidden')}
          />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ds-400 select-none whitespace-nowrap">
            {children}
          </span>
          <div
            data-testid="divider-line"
            className={cn(dividerLineVariants({ variant }), contentPosition === 'right' && 'hidden')}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="divider"
        role="separator"
        aria-orientation={orientation ?? undefined}
        className={cn(dividerVariants({ orientation, variant }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
