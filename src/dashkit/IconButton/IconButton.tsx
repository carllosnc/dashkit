import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StrictVariantProps } from '../utils/types';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent cursor-pointer whitespace-nowrap select-none shrink-0 font-medium active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        filled: 'border border-transparent ds-button-surface',
        outlined: 'bg-card text-foreground border border-border ds-button-outlined-surface',
        soft: 'border border-transparent ds-button-soft-surface',
        ghost: 'bg-transparent border border-transparent',
      },
      color: {
        primary: '',
        danger: '',
      },
      size: {
        sm: 'size-7 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-11 text-base',
      },
      rounded: {
        true: 'rounded-full ds-pill',
        false: 'rounded-md',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        className: 'ds-primary-gradient text-primary-foreground hover:brightness-105',
      },
      {
        variant: 'filled',
        color: 'danger',
        className: 'ds-danger-gradient text-danger-foreground hover:brightness-120',
      },
      {
        variant: 'outlined',
        color: 'primary',
        className: 'hover:bg-muted/60 dark:hover:bg-muted/60 dark:hover:brightness-110',
      },
      {
        variant: 'outlined',
        color: 'danger',
        className: 'bg-transparent text-ds-danger-600 border-ds-danger-400 hover:bg-ds-danger-50 dark:border-ds-danger-500 dark:text-ds-danger-400 dark:hover:bg-ds-danger-500/10 dark:hover:brightness-110',
      },
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-secondary text-secondary-foreground hover:brightness-90 dark:hover:brightness-125',
      },
      {
        variant: 'soft',
        color: 'danger',
        className: 'bg-ds-danger-600/10 text-ds-danger-600 hover:bg-ds-danger-600/20 dark:bg-ds-danger-500/20 dark:text-ds-danger-400 dark:hover:brightness-125',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-ds-danger-600 hover:bg-ds-danger-600/10 dark:text-ds-danger-400 dark:hover:bg-ds-danger-500/20',
      },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'primary',
      size: 'md',
      rounded: false,
    },
  }
);

export type IconButtonVariant = 'filled' | 'outlined' | 'soft' | 'ghost';
export type IconButtonColor = 'primary' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

type IconButtonBaseProps = Omit<StrictVariantProps<typeof iconButtonVariants>, 'rounded'> & {
  icon: ReactNode;
  rounded?: boolean;
};

export type IconButtonProps = IconButtonBaseProps &
  (
    | (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & { href?: never })
    | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & { href: string })
  );

/**
 * Prop-driven (`icon`) square or pill action button; renders `<a>` automatically when `href` is passed.
 *
 * @example
 * ```tsx
 * <IconButton icon={<PlusIcon />} aria-label="Add item" variant="soft" />
 * ```
 */
export const IconButton = forwardRef<HTMLElement, IconButtonProps>(function IconButton(
  { className, variant = 'soft', color = 'primary', size = 'md', icon, rounded = false, ...props },
  ref
) {
  const isLink = 'href' in props && props.href !== undefined;
  const classes = cn(
    iconButtonVariants({ variant, color, size, rounded }),
    'disabled' in props && props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = <span className="flex items-center justify-center">{icon}</span>;

  if (isLink) {
    const { href, target, rel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isDisabled = 'disabled' in props && Boolean(props.disabled);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={isDisabled ? undefined : href}
        target={target}
        rel={rel}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
});

IconButton.displayName = 'IconButton';
