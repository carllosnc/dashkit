import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type IconButtonBaseProps = {
  variant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  icon: ReactNode;
  rounded?: boolean;
};

const variantClasses = {
  filled: "bg-primary text-primary-foreground border-transparent hover:brightness-120 active:scale-95",
  outlined: "bg-linear-to-b from-ds-0 to-ds-100 dark:from-ds-900 dark:to-ds-950 text-foreground border-border hover:from-ds-50 hover:to-ds-100 dark:hover:from-ds-800 dark:hover:to-ds-900 hover:border-ds-400 dark:hover:border-ds-700 active:scale-95 backdrop-blur-md",
  soft: "bg-secondary text-secondary-foreground border-transparent hover:brightness-105 active:scale-95",
  ghost: "bg-transparent text-muted-foreground border-transparent hover:bg-accent hover:text-accent-foreground active:scale-95",
} as const;

export type IconButtonProps = IconButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  ({ className, variant = 'soft', icon, rounded = false, ...props }, ref) => {
    const isLink = 'href' in props && props.href !== undefined;

    const commonClasses = cn(
      "rounded-[var(--radius)] inline-flex font-medium items-center justify-center focus:outline-none cursor-pointer whitespace-nowrap border select-none shrink-0 size-9",
      rounded ? "rounded-full" : "rounded-md",
      variantClasses[variant],
      {
        "opacity-50 cursor-not-allowed": 'disabled' in props && props.disabled,
      },
      className
    );

    const iconSizeClasses = cn(
      "flex items-center justify-center",
      {
        "size-[18px]": true,
      }
    );

    if (isLink) {
      const { href, target, rel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={commonClasses}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <div className={iconSizeClasses}>{icon}</div>
        </a>
      );
    }

    const { type = 'button', disabled, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={commonClasses}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <div className={iconSizeClasses}>{icon}</div>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';


