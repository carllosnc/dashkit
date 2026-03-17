import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', children, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-4 py-[5px] rounded-full",
          "text-sm border",
          "transition-colors duration-200",
          "focus:outline-none",
          {
            "bg-black text-white border-transparent hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200": variant === 'filled',
            "bg-transparent text-black border-neutral-500 hover:bg-neutral-100 dark:text-white dark:border-white dark:hover:bg-neutral-800": variant === 'outlined',
          },
          className
        )}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
