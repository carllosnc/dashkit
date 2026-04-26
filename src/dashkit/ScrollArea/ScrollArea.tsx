import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import './scroll-area.css';

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export function ScrollArea({
  children,
  className,
  viewportClassName,
  orientation = 'vertical',
}: ScrollAreaProps) {
  return (
    <div className={cn('scroll-area', className)}>
      <div
        className={cn(
          'scroll-area__viewport',
          orientation === 'vertical' && 'scroll-area__viewport--vertical',
          orientation === 'horizontal' && 'scroll-area__viewport--horizontal',
          orientation === 'both' && 'scroll-area__viewport--both',
          viewportClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

ScrollArea.displayName = 'ScrollArea';
