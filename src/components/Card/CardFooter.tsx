import * as React from 'react';
import { cn } from '../../utils/cn';

const FOOTER_ROOT = "flex gap-3";

export type CardFooterProps = React.ComponentPropsWithRef<'div'>;

export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(FOOTER_ROOT, className)}
      {...props}
    />
  );
}
