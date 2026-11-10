import * as React from 'react';
import { cn } from '../utils/cn';
import { NavigationMenuContext } from './NavigationMenuContext';
import { useNavigationMenu } from './useNavigationMenu';

export interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function NavigationMenu({ children, className }: NavigationMenuProps) {
  const {
    activeValue,
    setActiveValue,
    triggerRects,
    setTriggerRect,
    registerContent,
    contentMap,
    menuRect,
    menuRef,
  } = useNavigationMenu();

  return (
    <NavigationMenuContext.Provider
      value={{
        activeValue,
        setActiveValue,
        triggerRects,
        setTriggerRect,
        registerContent,
        contentMap,
        menuRect
      }}
    >
      <nav
        ref={menuRef}
        className={cn('relative z-[999] flex w-full items-center justify-center', className)}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
}
