import {
  forwardRef,
  cloneElement,
  Children,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';
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
  /**
   * Render the button styles onto its single child element instead of a
   * <button> — use for links (<Link>, <a>) so interactive content is never
   * nested inside an anchor.
   */
  asChild?: boolean;
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
      asChild = false,
      ...props
    },
    ref
  ) {
    const isIconOnly = !children && (!!leftIcon || !!rightIcon);

    const classes = cn(
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
    );

    if (asChild) {
      const child = Children.only(children);
      if (!isValidElement(child)) {
        throw new Error('Button with asChild must have a single React element as its child.');
      }

      const childProps = child.props as { className?: string; children?: ReactNode };

      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        ref,
        className: twMerge(classes, childProps.className),
        children: (
          <>
            {loading && <Spinner size={16} color="currentColor" thickness={3} />}
            {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {childProps.children}
            {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
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



