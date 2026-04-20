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
      className={cn('breadcrumb__ellipsis', className)}
      {...props}
    >
      <LuEllipsis className="breadcrumb__ellipsis-icon" />
      <span className="sr-only">More</span>
    </span>
  );
}
