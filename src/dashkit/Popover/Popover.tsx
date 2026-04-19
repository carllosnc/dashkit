import * as React from 'react';
import { usePopover, PopoverContext, type PopoverTriggerMode } from './usePopover';

export interface PopoverProps {
  children: React.ReactNode;
  trigger?: PopoverTriggerMode;
}

export function Popover({ children, trigger = 'click' }: PopoverProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
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

  // Handle triggerRect update on open for hover
  React.useEffect(() => {
    if (open && trigger === 'hover' && triggerElement) {
        setTriggerRect(triggerElement.getBoundingClientRect());
    }
  }, [open, trigger, triggerElement, setTriggerRect]);

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
        onMouseLeave
    }}>
      <div className="relative inline-block text-left" ref={containerRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}
