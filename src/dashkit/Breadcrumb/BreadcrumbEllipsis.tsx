import * as React from 'react';
import { LuEllipsis } from 'react-icons/lu';
import { cn } from '../utils/cn';

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <LuEllipsis className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
