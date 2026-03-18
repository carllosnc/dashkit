import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const LoadingSpinner = () => (
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
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', children, leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-4 py-[5px] rounded-full",
          "text-sm border transition-all duration-200 focus:outline-none",
          {
            "bg-black text-white border-transparent dark:bg-white dark:text-black": variant === 'filled',
            "bg-transparent text-black border-neutral-500 hover:bg-neutral-100 dark:text-white dark:border-white": variant === 'outlined',
            "opacity-60 cursor-not-allowed": loading || disabled,
          },
          className
        )}
        {...props}
      >
        {loading ? <LoadingSpinner /> : leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
