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

export type CardTitleProps = React.ComponentPropsWithRef<'h3'>;

export function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <h3
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
