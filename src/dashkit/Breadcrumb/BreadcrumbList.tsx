import * as React from 'react';
import { cn } from '../utils/cn';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(function BreadcrumbList({ className, ...props }, ref) {
  return (
    <ol
      ref={ref}
      className={cn('flex items-center gap-1.5 text-sm text-ds-500 sm:gap-2.5 dark:text-ds-400', className)}
      {...props}
    />
  );
});

BreadcrumbList.displayName = 'BreadcrumbList';
