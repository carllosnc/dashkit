import * as React from 'react';
import { cn } from '../utils/cn';
import { NavigationMenuContext } from './NavigationMenuContext';
import { useNavigationMenu } from './useNavigationMenu';

export interface NavigationMenuProps extends React.ComponentPropsWithoutRef<'nav'> {
  children: React.ReactNode;
}

/**
 * Compound desktop navigation bar (`children` with `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`).
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem value="docs">
 *       <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
 *       <NavigationMenuContent>Links</NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  function NavigationMenu({ children, className, ...props }, ref) {
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

    const setNavRef = React.useCallback(
      (node: HTMLElement | null) => {
        menuRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [menuRef, ref]
    );

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
          ref={setNavRef}
          data-slot="navigation-menu"
          className={cn('relative z-[999] flex w-full items-center justify-center', className)}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);

NavigationMenu.displayName = 'NavigationMenu';
