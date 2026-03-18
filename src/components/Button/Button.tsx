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
  variant?: 'filled' | 'outlined';
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', children, leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none",
          "text-sm border",
          {
            "bg-black text-white border-transparent dark:bg-white dark:text-black": variant === 'filled',
            "bg-transparent text-neutral-800 border-neutral-400 hover:bg-neutral-50 dark:text-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900/50": variant === 'outlined',
            "opacity-60 cursor-not-allowed": loading || disabled,
            // Layout
            "gap-2 px-4 py-[5px]": !isIconOnly,
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
