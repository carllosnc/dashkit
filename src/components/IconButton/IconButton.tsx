import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type IconButtonBaseProps = {
  /** The variant style of the button. Defaults to 'soft'. */
  variant?: 'filled' | 'ghost' | 'soft';
  /** The icon element to render. */
  icon: ReactNode;
  /** Whether the button should be perfectly circular. Defaults to false (rounded-xl). */
  rounded?: boolean;
};

export type IconButtonProps = IconButtonBaseProps & 
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

/**
 * A specialized button for icon-only actions with premium hover effects and multiple size scales.
 *
 * @see https://dashkit-ui.com/docs/icon-button
 */
export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  ({ className, variant = 'soft', icon, rounded = false, ...props }, ref) => {
    const isLink = 'href' in props && props.href !== undefined;

    const commonClasses = cn(
      "inline-flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer border select-none shrink-0",
      rounded ? "rounded-full" : "rounded-md",
      {
        // Variants
        "bg-base-950 text-white border-transparent hover:bg-black dark:bg-white dark:text-base-950 dark:hover:bg-base-100": variant === 'filled',
        "bg-base-100 text-base-700 border-transparent hover:bg-base-200 dark:bg-white/15 dark:text-white dark:hover:bg-white/20": variant === 'soft',
        "bg-transparent text-base-500 border-transparent hover:bg-base-100 dark:text-base-400 dark:hover:bg-white/5": variant === 'ghost',
        "opacity-50 cursor-not-allowed": 'disabled' in props && props.disabled,

        // Box Size matched to default Button Component height
        "size-9": true,
      },
      className
    );

    const iconSizeClasses = cn(
      "flex items-center justify-center transition-transform group-hover:scale-110",
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
