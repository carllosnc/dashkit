import * as React from 'react';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';

import './icon-button.css';

type IconButtonBaseProps = {
  variant?: 'filled' | 'outlined' | 'soft' | 'ghost';
  icon: ReactNode;
  rounded?: boolean;
};

export type IconButtonProps = IconButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(function IconButton(
  { className, variant = 'soft', icon, rounded = false, ...props },
  ref
) {
  const isLink = 'href' in props && props.href !== undefined;

  const classes = cn(
    'icon-button',
    'size-9', // Default size as utility so it can be overridden
    `icon-button--${variant}`,
    rounded && 'icon-button--rounded',
    {
      'icon-button--disabled': 'disabled' in props && props.disabled,
    },
    className
  );

  const content = <div className="icon-button__wrapper">{icon}</div>;

  if (isLink) {
    const { href, target, rel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
});

IconButton.displayName = 'IconButton';
