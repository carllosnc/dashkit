import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '../Spinner/Spinner';
import './button.css';

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
          'button',
          `button--${variant}-${color}`,
          `button--${size}`,
          {
            "button--loading": loading,
            "button--with-text": !isIconOnly,
            "button--with-text-sm": size === 'sm' && !isIconOnly,
            "button--with-text-lg": size === 'lg' && !isIconOnly,
            "button--icon-only": isIconOnly,
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



