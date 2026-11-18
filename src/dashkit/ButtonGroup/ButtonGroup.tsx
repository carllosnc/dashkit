import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type HTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonGroupVariants = cva(
  'inline-flex isolate ds-rounded overflow-hidden',
  {
    variants: {
      vertical: {
        true: 'flex-col -space-y-px [&>*:first-child]:!rounded-b-none [&>*:last-child]:!rounded-t-none [&>*:not(:first-child):not(:last-child)]:!rounded-none',
        false: 'flex-row -space-x-px [&>*:first-child]:!rounded-r-none [&>*:last-child]:!rounded-l-none [&>*:not(:first-child):not(:last-child)]:!rounded-none',
      },
    },
    defaultVariants: {
      vertical: false,
    },
  }
);

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** @default false */
  vertical?: boolean;
}

/**
 * Compound segmented button container (`children` with `ButtonGroupItem`).
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <ButtonGroupItem selected>Day</ButtonGroupItem>
 *   <ButtonGroupItem>Week</ButtonGroupItem>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup({ children, className, vertical = false, role = 'group', ...props }, ref) {
    return (
      <div
        ref={ref}
        role={role}
        className={cn(buttonGroupVariants({ vertical }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default false */
  selected?: boolean;
}

export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  function ButtonGroupItem(
    {
      children,
      className,
      selected = false,
      type = 'button',
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        className={cn(
          'ds-rounded relative inline-flex items-center justify-center font-medium text-sm h-9 px-4',
          'bg-card text-foreground border border-border ds-border-width hover:bg-muted/60 transition-all cursor-pointer',
          'focus:outline-none focus:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          selected && 'bg-ds-200 text-foreground font-semibold z-10 shadow-xs dark:bg-ds-700 dark:text-foreground',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroupItem.displayName = 'ButtonGroupItem';
