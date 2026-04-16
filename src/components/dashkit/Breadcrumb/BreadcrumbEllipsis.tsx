import * as React from 'react';
import { LuEllipsis } from 'react-icons/lu';
import { cn } from '../utils/cn';

const ELLIPSIS_ROOT = 'flex h-9 w-9 items-center justify-center';
const ELLIPSIS_ICON = "size-4";

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(ELLIPSIS_ROOT, className)}
      {...props}
    >
      <LuEllipsis className={ELLIPSIS_ICON} />
      <span className="sr-only">More</span>
    </span>
  );
}
