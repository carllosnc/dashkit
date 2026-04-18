import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';

type IconButtonBaseProps = {
  variant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  icon: ReactNode;
  rounded?: boolean;
};

export type IconButtonProps = IconButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

const VARIANT_CLASSES = {
  filled: "ds-primary-gradient text-primary-foreground border-transparent hover:brightness-125",
  outlined: "bg-transparent text-foreground border border-ds-200 dark:border-ds-800 hover:bg-ds-100/50 dark:hover:bg-ds-800/50 hover:brightness-95 dark:hover:brightness-110",
  soft: "bg-secondary text-secondary-foreground border-transparent hover:brightness-85 dark:hover:brightness-150",
  ghost: "bg-transparent text-muted-foreground border-transparent hover:bg-accent hover:text-accent-foreground hover:brightness-95 dark:hover:brightness-110",
} as const;

const BASE_CLASSES = "ds-rounded inline-flex font-medium items-center justify-center focus:outline-none cursor-pointer whitespace-nowrap border select-none shrink-0 size-9 transition-all duration-200";
const ICON_WRAPPER_CLASSES = "flex items-center justify-center size-[18px]";

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(function IconButton(
  { className, variant = 'soft', icon, rounded = false, ...props },
  ref
) {
  const isLink = 'href' in props && props.href !== undefined;

  const classes = cn(
    BASE_CLASSES,
    rounded ? "rounded-full" : "",
    VARIANT_CLASSES[variant],
    {
      "opacity-50 cursor-not-allowed pointer-events-none": 'disabled' in props && props.disabled,
    },
    className
  );

  const content = <div className={ICON_WRAPPER_CLASSES}>{icon}</div>;

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
