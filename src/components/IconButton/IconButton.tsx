import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type IconButtonBaseProps = {
  /** The variant style of the button. Defaults to 'soft'. */
  variant?: 'filled' | 'outlined' | 'ghost' | 'soft';
  /** The scale of the button. Defaults to 'md'. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  ({ className, variant = 'soft', size = 'md', icon, rounded = false, ...props }, ref) => {
    const isLink = 'href' in props && props.href !== undefined;

    const commonClasses = cn(
      "inline-flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer border select-none shrink-0",
      rounded ? "rounded-full" : "rounded-xl",
      {
        // Variants
        "bg-base-950 text-white border-transparent hover:bg-black dark:bg-white dark:text-base-950 dark:hover:bg-base-100": variant === 'filled',
        "bg-transparent text-base-700 border-base-200 hover:bg-base-50 dark:text-base-300 dark:border-base-800 dark:hover:bg-white/10": variant === 'outlined',
        "bg-base-100 text-base-900 border-transparent hover:bg-base-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15": variant === 'soft',
        "bg-transparent text-base-500 border-transparent hover:bg-base-100 dark:text-base-400 dark:hover:bg-white/5": variant === 'ghost',
        "opacity-50 cursor-not-allowed": 'disabled' in props && props.disabled,

        // Sizes (Box Size)
        "size-7": size === 'xs',
        "size-9": size === 'sm',
        "size-11": size === 'md',
        "size-14": size === 'lg',
        "size-20": size === 'xl',
      },
      className
    );

    const iconSizeClasses = cn(
      "flex items-center justify-center transition-transform group-hover:scale-110",
      {
        "size-4": size === 'xs',
        "size-5": size === 'sm',
        "size-6": size === 'md',
        "size-8": size === 'lg',
        "size-12": size === 'xl',
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
