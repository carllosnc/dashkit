import * as React from 'react';
import { cn } from '../utils/cn';

export type CardFooterProps = React.ComponentPropsWithRef<'div'>;

export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex gap-3', className)}
      {...props}
    />
  );
}
