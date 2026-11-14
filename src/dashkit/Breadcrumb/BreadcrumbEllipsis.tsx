import * as React from 'react';
import { LuEllipsis } from 'react-icons/lu';
import { cn } from '../utils/cn';

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(function BreadcrumbEllipsis({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <LuEllipsis className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
});

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
