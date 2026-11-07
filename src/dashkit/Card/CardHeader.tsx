import * as React from 'react';
import { cn } from '../utils/cn';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftIcon?: React.ReactNode;
  action?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function CardHeader({
  className,
  children,
  leftIcon,
  action,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn('card__header flex gap-3 items-start', className)}
      {...props}
    >
      {leftIcon && (
        <div className="card__header-icon shrink-0 text-muted-foreground mt-0.5">
          {leftIcon}
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {children}
      </div>
      {action && (
        <div className="card__header-action shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  ref?: React.Ref<HTMLHeadingElement>;
};

export function CardTitle({ className, as: Component = 'h3', ref, ...props }: CardTitleProps) {
  return (
    <Component
      ref={ref}
      className={cn('card__title', className)}
      {...props}
    />
  );
}

export type CardDescriptionProps = React.ComponentPropsWithRef<'p'>;

export function CardDescription({ className, ref, ...props }: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn('card__description', className)}
      {...props}
    />
  );
}
