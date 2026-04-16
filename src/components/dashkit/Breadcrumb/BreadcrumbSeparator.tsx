import * as React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '../utils/cn';

const SEPARATOR_ROOT = '[&>svg]:size-3.5';
const ICON_COLOR = "text-ds-400";

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(SEPARATOR_ROOT, className)}
      {...props}
    >
      {children ?? <LuChevronRight size={14} className={ICON_COLOR} />}
    </li>
  );
}
