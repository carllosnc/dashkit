import * as React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '../utils/cn';

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <LuChevronRight size={14} className="text-ds-400" />}
    </li>
  );
}

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
