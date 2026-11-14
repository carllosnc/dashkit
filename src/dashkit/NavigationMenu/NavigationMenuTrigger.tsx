import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useNavigationMenuContext } from './NavigationMenuContext';

export interface NavigationMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
}

export const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  function NavigationMenuTrigger({ value, children, className, onClick, ...props }, ref) {
    const { activeValue, setActiveValue, setTriggerRect } = useNavigationMenuContext();
    const innerRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      if (innerRef.current) {
        setTriggerRect(value, innerRef.current.getBoundingClientRect());
      }
    }, [value, setTriggerRect]);

    const isActive = activeValue === value;

    return (
      <button
        ref={setRefs}
        type="button"
        data-slot="navigation-menu-trigger"
        aria-expanded={isActive}
        onClick={(e) => {
          setActiveValue(isActive ? null : value);
          onClick?.(e);
        }}
        className={cn(
          'inline-flex h-9 w-max items-center justify-center ds-rounded bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          isActive && 'text-foreground',
          className
        )}
        {...props}
      >
        {children}
        <FiChevronDown
          className={cn(
            'relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200',
            isActive && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';
