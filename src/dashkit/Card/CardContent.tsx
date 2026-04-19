import * as React from 'react';
import { cn } from '../utils/cn';

const CONTENT_ROOT = "flex-1";

export type CardContentProps = React.ComponentPropsWithRef<'div'>;

export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn(CONTENT_ROOT, className)}
      {...props}
    />
  );
}
