import {
  forwardRef,
  cloneElement,
  Children,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';
import { Spinner } from '../Spinner/Spinner';

const buttonVariants = cva(
  'inline-flex font-medium items-center justify-center cursor-pointer whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        filled: 'border ds-button-surface',
        outlined: 'bg-card text-foreground border ds-button-outlined-surface',
        soft: 'border ds-button-soft-surface',
        ghost: 'bg-transparent border border-transparent',
      },
      color: {
        primary: '',
        danger: '',
      },
      size: {
        sm: 'h-7 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-11 text-base',
      },
      rounded: {
        true: 'rounded-full ds-pill',
        false: 'rounded-md',
      },
    },
    compoundVariants: [
      // filled
      {
        variant: 'filled',
        color: 'primary',
        className: 'ds-primary-gradient text-primary-foreground hover:brightness-105',
      },
      {
        variant: 'filled',
        color: 'danger',
        className: 'ds-danger-gradient text-red-50 hover:brightness-120',
      },
      // outlined
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border-border hover:bg-muted/60 dark:hover:bg-muted/60 dark:hover:brightness-110',
      },
      {
        variant: 'outlined',
        color: 'danger',
        className: 'bg-transparent text-ds-danger-600 border-ds-danger-400 hover:bg-ds-danger-50 dark:border-ds-danger-500 dark:text-ds-danger-400 dark:hover:bg-ds-danger-500/10 dark:hover:brightness-110',
      },
      // soft
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-secondary text-secondary-foreground hover:brightness-90 dark:hover:brightness-125',
      },
      {
        variant: 'soft',
        color: 'danger',
        className: 'bg-ds-danger-600/10 text-ds-danger-600 hover:bg-ds-danger-600/20 dark:bg-ds-danger-500/20 dark:hover:brightness-125',
      },
      // ghost
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-ds-danger-600 hover:bg-ds-danger-600/10 dark:text-ds-danger-400 dark:hover:bg-ds-danger-500/20',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
      size: 'md',
      rounded: true,
    },
  }
);

export type ButtonVariant = 'filled' | 'outlined' | 'soft' | 'ghost';
export type ButtonColor = 'primary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    Omit<StrictVariantProps<typeof buttonVariants>, 'rounded'> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  /** @default true */
  rounded?: boolean;
  /**
   * Render the button styles onto its single child element instead of a
   * <button> — use for links (<Link>, <a>) so interactive content is never
   * nested inside an anchor.
   * @default false
   */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'filled',
      color = 'primary',
      size = 'md',
      children,
      leftIcon,
      rightIcon,
      loading,
      rounded = true,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);
    const spinnerSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

    const classes = cn(
      buttonVariants({ variant, color, size, rounded }),
      isIconOnly
        ? 'aspect-square'
        : size === 'sm'
          ? 'px-2.5 gap-1.5'
          : size === 'lg'
            ? 'px-6 gap-2.5'
            : 'px-4 gap-2',
      loading && 'opacity-60 cursor-not-allowed',
      className
    );

    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement(child)) {
        throw new Error('Button with asChild must have a single React element as its child.');
      }

      const childProps = child.props as { className?: string; children?: ReactNode };

      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        ref,
        className: cn(classes, childProps.className),
        children: (
          <>
            {loading && <Spinner size={spinnerSize} color="currentColor" thickness={3} />}
            {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {childProps.children}
            {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && <Spinner size={spinnerSize} color="currentColor" thickness={3} />}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
