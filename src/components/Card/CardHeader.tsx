import * as React from 'react';
import { cn } from '../../utils/cn';

const HEADER_ROOT = "flex flex-col gap-1";

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
      className={cn(HEADER_ROOT, className)}
      {...props}
    >
      {children}
    </div>
  );
}
