import * as React from 'react';
import { createPortal } from 'react-dom';
import { useDropdownContext } from './useDropdown';
import { cn } from '../utils/cn';

export interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'end' | 'center';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export function DropdownContent({
  children,
  className,
  align = 'start',
  side = 'bottom',
  sideOffset = 8
}: DropdownContentProps) {
  const { open, triggerElement, setTriggerRect, triggerRect } = useDropdownContext();
  const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (open && contentRef.current) {
      setContentRect(contentRef.current.getBoundingClientRect());
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (triggerElement) {
        setTriggerRect(triggerElement.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [open, triggerElement, setTriggerRect]);

  if (!triggerRect) return null;

  const dropdownHeight = contentRect?.height || 0;
  const dropdownWidth = contentRect?.width || 0;

  let top = 0;
  let left = 0;
  let actualSide = side;

  if (side === 'bottom' || side === 'top') {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    actualSide = (side === 'bottom' && spaceBelow < dropdownHeight && spaceAbove > spaceBelow) || 
                (side === 'top' && spaceAbove < dropdownHeight && spaceBelow > spaceAbove)
      ? (side === 'bottom' ? 'top' : 'bottom')
      : side;

    top = actualSide === 'top' ? triggerRect.top - dropdownHeight - sideOffset : triggerRect.bottom + sideOffset;

    if (align === 'start') left = triggerRect.left;
    else if (align === 'end') left = triggerRect.right - dropdownWidth;
    else left = triggerRect.left + (triggerRect.width - dropdownWidth) / 2;
  } else {
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    actualSide = (side === 'right' && spaceRight < dropdownWidth && spaceLeft > spaceRight) || 
                (side === 'left' && spaceLeft < dropdownWidth && spaceRight > spaceLeft)
      ? (side === 'right' ? 'left' : 'right')
      : side;

    left = actualSide === 'right' ? triggerRect.right + sideOffset : triggerRect.left - dropdownWidth - sideOffset;

    if (align === 'start') top = triggerRect.top;
    else if (align === 'end') top = triggerRect.bottom - dropdownHeight;
    else top = triggerRect.top + (triggerRect.height - dropdownHeight) / 2;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - dropdownWidth - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - dropdownHeight - 8));

  const style: React.CSSProperties = {
    position: 'fixed',
    top,
    left,
    zIndex: 9999,
  };

  const getAnimationProps = () => {
    switch (actualSide) {
      case 'top': return { originClass: 'origin-bottom' };
      case 'bottom': return { originClass: 'origin-top' };
      case 'left': return { originClass: 'origin-right' };
      case 'right': return { originClass: 'origin-left' };
      default: return { originClass: 'origin-top' };
    }
  };

  const animProps = getAnimationProps();

  if (!open || !triggerRect) return null;

  return createPortal(
    <div
      ref={contentRef}
      id="dashkit-dropdown-portal"
      style={style}
      className={cn(
        "min-w-[12rem] bg-popover text-popover-fg border border-popover-border ds-rounded shadow-lg p-1 overflow-hidden",
        animProps.originClass,
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}
