import * as React from 'react';
import { cn } from '../utils/cn';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export function CardHeader({
  className,
  children,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn('card__header flex flex-col gap-1', className)}
      {...props}
    >
      {children}
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
