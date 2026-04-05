import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ScrollAreaProps {
  /**
   * The content to be rendered inside the scroll area.
   */
  children: ReactNode;
  /**
   * Additional CSS classes for the container.
   */
  className?: string;
  /**
   * Additional CSS classes for the viewport (the scrollable area).
   */
  viewportClassName?: string;
  /**
   * The orientation of the scrollable area.
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
}

const SCROLL_AREA_BASE = "relative overflow-hidden w-full h-full";
const VIEWPORT_BASE = "h-full w-full rounded-[inherit] custom-scrollbar";

/**
 * A minimalist scroll area component that provides theme-aware, custom scrollbars
 * using Dashkit's design tokens and native scrolling for maximum performance.
 */
export function ScrollArea({
  children,
  className,
  viewportClassName,
  orientation = 'vertical',
}: ScrollAreaProps) {
  return (
    <div className={cn(SCROLL_AREA_BASE, className)}>
      <div
        className={cn(
          VIEWPORT_BASE,
          orientation === 'vertical' && "overflow-y-auto overflow-x-hidden",
          orientation === 'horizontal' && "overflow-x-auto overflow-y-hidden",
          orientation === 'both' && "overflow-auto",
          viewportClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

ScrollArea.displayName = 'ScrollArea';
