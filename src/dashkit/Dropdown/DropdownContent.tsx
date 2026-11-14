import * as React from 'react';
import { createPortal } from 'react-dom';
import { useDropdownContext } from './useDropdown';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';

export interface DropdownContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  align?: 'start' | 'end' | 'center';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  function DropdownContent(
    {
      children,
      className,
      align = 'start',
      side = 'bottom',
      sideOffset = 8,
      style: userStyle,
      ...props
    },
    ref
  ) {
    const { open, triggerElement, setTriggerRect, triggerRect, portalRef } = useDropdownContext();
    const [contentRect, setContentRect] = React.useState<DOMRect | null>(null);

    const setContentRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        portalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [portalRef, ref]
    );

  // Latest trigger element for the focus-restore cleanup below, so the focus
  // effect can depend only on `open`.
  const triggerElementRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    triggerElementRef.current = triggerElement;
  }, [triggerElement]);

  React.useLayoutEffect(() => {
    if (open && portalRef.current) {
      setContentRect(portalRef.current.getBoundingClientRect());
    }
  }, [open, portalRef]);

  // Move focus into the popup on open and hand it back to the trigger on
  // close, so keyboard users never end up tabbing through the page behind
  // the dropdown (WCAG 2.4.3).
  React.useEffect(() => {
    if (!open) return;

    const firstItem = portalRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstItem?.focus();

    return () => {
      const active = document.activeElement;
      // Only take focus back when it would otherwise be lost (the popup is
      // gone or focus already fell to <body>); never steal it from a control
      // the user just clicked.
      if (!active || active === document.body || active === document.documentElement) {
        triggerElementRef.current?.focus();
      }
    };
  }, [open, portalRef]);

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

  let top: number;
  let left: number;
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
      ref={setContentRef}
      data-slot="dropdown-content"
      {...getPortalThemeAttrs(triggerElement)}
      style={{ ...style, ...userStyle }}
      className={cn(
        'min-w-[12rem] bg-popover/95 backdrop-blur-md text-popover-fg border border-popover-border/80 ds-border-width ds-popover-shadow ds-rounded-lg p-1.5 overflow-hidden flex flex-col gap-0.5',
        animProps.originClass,
        className
      )}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
});

DropdownContent.displayName = 'DropdownContent';
