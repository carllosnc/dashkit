import * as React from 'react';
import { cn } from '../utils/cn';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(function BreadcrumbList({ className, ...props }, ref) {
  return (
    <ol
      ref={ref}
      className={cn('breadcrumb__list', className)}
      {...props}
    />
  );
});
