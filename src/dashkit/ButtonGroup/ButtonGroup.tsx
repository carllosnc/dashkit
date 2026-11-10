import { type ReactNode, type ButtonHTMLAttributes } from 'react';
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

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}

export function ButtonGroup({ children, className, vertical = false }: ButtonGroupProps) {
  return (
    <div className={cn(buttonGroupVariants({ vertical }), className)}>
      {children}
    </div>
  );
}

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function ButtonGroupItem({
  children,
  className,
  selected = false,
  ...props
}: ButtonGroupItemProps) {
  return (
    <button
      className={cn(
        'ds-rounded relative inline-flex items-center justify-center font-medium text-sm h-9 px-4',
        'bg-ds-0 text-foreground border border-ds-300 hover:bg-ds-50 transition-all cursor-pointer',
        'focus:outline-none focus:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring active:scale-[0.98]',
        'dark:bg-ds-900 dark:border-ds-700 dark:hover:bg-ds-800',
        selected && 'bg-ds-200 text-foreground font-semibold z-10 shadow-xs dark:bg-ds-700 dark:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroupItem.displayName = 'ButtonGroupItem';
