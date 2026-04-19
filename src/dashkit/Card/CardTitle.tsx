import * as React from 'react';
import { cn } from '../utils/cn';

const TITLE_ROOT = "text-base font-medium text-foreground tracking-tight leading-tight";

export type CardTitleProps = React.ComponentPropsWithRef<'h3'>;

export function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn(TITLE_ROOT, className)}
      {...props}
    />
  );
}
