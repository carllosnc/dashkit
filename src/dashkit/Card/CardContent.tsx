import * as React from 'react';
import { cn } from '../utils/cn';

export type CardContentProps = React.ComponentPropsWithRef<'div'>;

export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn('card__content', className)}
      {...props}
    />
  );
}
