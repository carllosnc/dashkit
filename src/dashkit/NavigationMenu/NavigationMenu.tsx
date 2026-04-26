import * as React from 'react';
import { cn } from '../utils/cn';
import { NavigationMenuContext } from './NavigationMenuContext';
import { useNavigationMenu } from './useNavigationMenu';
import './navigation-menu.css';

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
        className={cn('navigation-menu', className)}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
}
