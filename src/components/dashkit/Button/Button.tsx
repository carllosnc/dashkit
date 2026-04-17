import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '../Spinner/Spinner';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'soft';
  color?: 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const BUTTON_BASE = "ds-rounded inline-flex font-medium items-center justify-center focus:outline-none cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed";

const BUTTON_VARIANTS = {
  filled: {
    primary: "ds-primary-gradient text-primary-foreground hover:brightness-120 transition-colors",
    danger: "ds-danger-gradient text-red-50 hover:brightness-120 transition-colors",
  },
  outlined: {
    primary: "bg-transparent hover:brightness-80 text-foreground border border-ds-300 dark:border-ds-700",
    danger: "bg-transparent hover:bg-ds-danger-50 text-ds-danger-600 border border-ds-danger-200 dark:border-ds-danger-900/50",
  },
  soft: {
    primary: "bg-secondary text-secondary-foreground hover:brightness-90 dark:hover:brightness-110",
    danger: "bg-ds-danger-600/10 text-ds-danger-600 hover:bg-ds-danger-600/20",
  },
} as const;

const BUTTON_SIZES = {
  sm: "h-7 text-xs",
  md: "h-9 text-sm",
  lg: "h-11 text-base",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'filled',
      color = 'primary',
      size = 'md',
      children,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      ...props
    },
    ref
  ) {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          BUTTON_BASE,
          BUTTON_VARIANTS[variant][color] as string,
          BUTTON_SIZES[size],
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


