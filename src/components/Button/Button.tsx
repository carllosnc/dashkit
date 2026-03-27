import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

import { Spinner } from '../Spinner/Spinner';

const variantClasses = {
  filled: "bg-primary text-primary-foreground hover:brightness-120 active:scale-[0.98]",
  outlined: "bg-linear-to-b from-ds-0 to-ds-100 dark:from-ds-900 dark:to-ds-950 text-foreground border hover:from-ds-50 hover:to-ds-100 dark:hover:from-ds-800 dark:hover:to-ds-900 hover:border-ds-400 dark:hover:border-ds-700 active:scale-[0.98] backdrop-blur-md",
  soft: "bg-secondary text-secondary-foreground hover:brightness-105 active:scale-[0.98]",
} as const;

const sizeClasses = {
  sm: "h-7 text-xs",
  md: "h-9 text-sm",
  lg: "h-11 text-base",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', size = 'md', children, leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "rounded-lg inline-flex font-medium items-center justify-center focus:outline-none cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          {
            "opacity-60 cursor-not-allowed": loading,
            "gap-2 px-4 py-[5px]": !isIconOnly,
            "px-2": size === 'sm' && !isIconOnly,
            "px-6": size === 'lg' && !isIconOnly,
            "p-[8px] aspect-square": isIconOnly,
          },
          className
        )}
        {...props}
      >
        {loading && <Spinner size={16} color="currentColor" thickness={3} />}
        {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';


