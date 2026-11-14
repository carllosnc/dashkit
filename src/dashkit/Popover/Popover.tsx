import * as React from 'react';
import { usePopover, PopoverContext, type PopoverTriggerMode } from './usePopover';
import { cn } from '../utils/cn';

export interface PopoverProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  /** @default 'click' */
  trigger?: PopoverTriggerMode;
}

/**
 * Compound floating overlay (`children` with `PopoverTrigger` and `PopoverContent`).
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Popover body</PopoverContent>
 * </Popover>
 * ```
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  { children, trigger = 'click', className, ...props },
  ref
) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef,
    portalRef
  } = usePopover();

  const closeTimer = React.useRef<number | null>(null);

  const onMouseEnter = React.useCallback(() => {
    if (trigger !== 'hover') return;
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }, [trigger, setOpen]);

  const onMouseLeave = React.useCallback(() => {
    if (trigger !== 'hover') return;
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [trigger, setOpen]);

  // Hover popovers must also open from the keyboard: focus plays the role of
  // "enter" and blur that of "leave" (WCAG 2.1.1).
  const onFocus = onMouseEnter;
  const onBlur = onMouseLeave;

  // Handle triggerRect update on open for hover
  React.useEffect(() => {
    if (open && trigger === 'hover' && triggerElement) {
        setTriggerRect(triggerElement.getBoundingClientRect());
    }
  }, [open, trigger, triggerElement, setTriggerRect]);

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [containerRef, ref]
  );

  return (
    <PopoverContext.Provider value={{
        open,
        setOpen,
        triggerRect,
        setTriggerRect,
        triggerElement,
        setTriggerElement,
        triggerMode: trigger,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        portalRef
    }}>
      <div
        data-slot="popover"
        className={cn('relative inline-block text-left', className)}
        ref={setRootRef}
        {...props}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
});

Popover.displayName = 'Popover';
