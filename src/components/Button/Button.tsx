import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const LoadingSpinner = () => (

  <>
    <style>{`
      @keyframes spinner-dash {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }

      .animate-spinner-dash {
        animation: spinner-dash 1.5s ease-in-out infinite;
      }
    `}</style>
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <circle
        className="animate-spinner-dash"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  </>
);

/**
 * Button component with multiple variants, icons, and loading states.
 * 
 * @see https://dashkit-ui.com/docs/button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', size = 'md', children, leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex font-medium items-center justify-center rounded-button transition-all duration-200 focus:outline-none cursor-pointer whitespace-nowrap",
          "text-sm border",
          {
            "bg-button-filled-bg text-button-filled-fg border-transparent hover:bg-button-filled-hover dark:bg-button-filled-dark-bg dark:text-button-filled-dark-fg dark:hover:bg-button-filled-dark-hover": variant === 'filled',
            "bg-button-outlined-bg text-button-outlined-fg border-button-outlined-border hover:bg-button-outlined-hover dark:bg-button-outlined-dark-bg dark:text-button-outlined-dark-fg dark:border-button-outlined-dark-border dark:hover:bg-button-outlined-dark-hover": variant === 'outlined',
            "bg-button-soft-bg text-button-soft-fg border-transparent hover:bg-button-soft-hover dark:bg-button-soft-dark-bg dark:text-button-soft-dark-fg dark:hover:bg-button-soft-dark-hover": variant === 'soft',
            "opacity-60 cursor-not-allowed": loading || disabled,
            // Sizes
            "h-7 text-xs": size === 'sm',
            "h-9 text-sm": size === 'md',
            "h-11 text-base": size === 'lg',
            // Layout
            "gap-2 px-4 py-[5px]": !isIconOnly,
            "px-2": size === 'sm' && !isIconOnly,
            "px-6": size === 'lg' && !isIconOnly,
            "p-[8px] aspect-square": isIconOnly,
          },
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
