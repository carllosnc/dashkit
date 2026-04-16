import * as React from 'react';
import { cn } from '../utils/cn';

const DESCRIPTION_ROOT = "text-sm text-muted-foreground";

export type CardDescriptionProps = React.ComponentPropsWithRef<'p'>;

export function CardDescription({ className, ref, ...props }: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn(DESCRIPTION_ROOT, className)}
      {...props}
    />
  );
}
