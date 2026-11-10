import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent cursor-pointer whitespace-nowrap select-none shrink-0 font-medium active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        filled: 'ds-primary-gradient text-primary-foreground border border-transparent hover:brightness-105',
        outlined: 'bg-transparent text-foreground border border-ds-300 hover:bg-ds-50 hover:brightness-95 dark:border-ds-700 dark:hover:bg-ds-800/50 dark:hover:brightness-110',
        soft: 'bg-secondary text-secondary-foreground border border-transparent hover:brightness-85 dark:hover:brightness-150',
        ghost: 'bg-transparent text-muted-foreground border border-transparent hover:bg-accent hover:text-accent-foreground hover:brightness-95 dark:hover:brightness-110',
      },
      size: {
        sm: 'size-7 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-11 text-base',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'soft',
      size: 'md',
      rounded: false,
    },
  }
);

type IconButtonBaseProps = Omit<VariantProps<typeof iconButtonVariants>, 'rounded'> & {
  icon: ReactNode;
  rounded?: boolean;
};

export type IconButtonProps = IconButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(function IconButton(
  { className, variant = 'soft', size = 'md', icon, rounded = false, ...props },
  ref
) {
  const isLink = 'href' in props && props.href !== undefined;
  const classes = cn(
    iconButtonVariants({ variant, size, rounded }),
    'disabled' in props && props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = <div className="flex items-center justify-center">{icon}</div>;

  if (isLink) {
    const { href, target, rel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
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
