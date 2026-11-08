import * as React from 'react';

export interface UseSidebarProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpenMobile?: boolean;
  openMobile?: boolean;
  onOpenMobileChange?: (open: boolean) => void;
  mobileBreakpoint?: number;
}

function useIsMobile(breakpoint: number) {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {};
      }
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      if (mql.addEventListener) {
        mql.addEventListener('change', onStoreChange);
        return () => mql.removeEventListener('change', onStoreChange);
      } else if ((mql as unknown as { addListener?: (cb: () => void) => void }).addListener) {
        const legacyMql = mql as unknown as { addListener: (cb: () => void) => void; removeListener: (cb: () => void) => void };
        legacyMql.addListener(onStoreChange);
        return () => legacyMql.removeListener(onStoreChange);
      }
      return () => {};
    },
    () => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
      return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    },
    () => false
  );
}

export function useSidebarState({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  defaultOpenMobile = false,
  openMobile: controlledOpenMobile,
  onOpenMobileChange,
  mobileBreakpoint = 768,
}: UseSidebarProps = {}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [internalOpenMobile, setInternalOpenMobile] = React.useState(defaultOpenMobile);

  const isMobile = useIsMobile(mobileBreakpoint);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const rawOpenMobile = controlledOpenMobile !== undefined ? controlledOpenMobile : internalOpenMobile;
  const openMobile = isMobile ? rawOpenMobile : false;

  const setIsOpen = React.useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  const setOpenMobile = React.useCallback(
    (value: boolean) => {
      if (controlledOpenMobile === undefined) {
        setInternalOpenMobile(value);
      }
      onOpenMobileChange?.(value);
    },
    [controlledOpenMobile, onOpenMobileChange]
  );

  const toggle = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setIsOpen(!isOpen);
    }
  }, [isMobile, openMobile, setOpenMobile, isOpen, setIsOpen]);

  const toggleMobile = React.useCallback(() => {
    setOpenMobile(!openMobile);
  }, [openMobile, setOpenMobile]);

  return {
    isOpen,
    setIsOpen,
    toggle,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleMobile,
  };
}
