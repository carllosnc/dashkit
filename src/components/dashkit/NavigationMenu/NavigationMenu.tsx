import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';

// --- Types ---

interface NavigationMenuContextType {
  activeValue: string | null;
  setActiveValue: (val: string | null) => void;
  triggerRects: Record<string, DOMRect>;
  setTriggerRect: (val: string, rect: DOMRect) => void;
  registerContent: (val: string, node: React.ReactNode) => void;
  contentMap: Record<string, React.ReactNode>;
  menuRect: DOMRect | null;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextType | undefined>(undefined);

function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) throw new Error('NavigationMenu components must be used within NavigationMenu');
  return context;
}

// --- Main Components ---

export interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function NavigationMenu({ children, className }: NavigationMenuProps) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const [triggerRects, setTriggerRects] = React.useState<Record<string, DOMRect>>({});
  const [contentMap, setContentMap] = React.useState<Record<string, React.ReactNode>>({});
  const [menuRect, setMenuRect] = React.useState<DOMRect | null>(null);
  const menuRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (menuRef.current) {
      setMenuRect(menuRef.current.getBoundingClientRect());
    }
  }, []);

  const handleSetTriggerRect = React.useCallback((val: string, rect: DOMRect) => {
    setTriggerRects(prev => {
      if (prev[val]?.left === rect.left && prev[val]?.width === rect.width) return prev;
      return { ...prev, [val]: rect };
    });
  }, []);

  const handleRegisterContent = React.useCallback((val: string, node: React.ReactNode) => {
    setContentMap(prev => ({ ...prev, [val]: node }));
  }, []);

  const handleValueChange = React.useCallback((val: string | null) => {
    setActiveValue(val);
  }, []);

  // Handle click outside and Escape key to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveValue(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveValue(null);
      }
    };

    if (activeValue) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeValue]);

  return (
    <NavigationMenuContext.Provider
      value={{
        activeValue,
        setActiveValue: handleValueChange,
        triggerRects,
        setTriggerRect: handleSetTriggerRect,
        registerContent: handleRegisterContent,
        contentMap,
        menuRect
      }}
    >
      <nav
        ref={menuRef}
        className={cn("relative z-[100] flex w-full items-center justify-center", className)}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}>
      {children}
    </ul>
  );
}

export function NavigationMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("relative", className)}>
      {children}
    </li>
  );
}

export function NavigationMenuTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeValue, setActiveValue, setTriggerRect } = useNavigationMenuContext();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setTriggerRect(value, ref.current.getBoundingClientRect());
    }
  }, [value, setTriggerRect]);

  const isActive = activeValue === value;

  return (
    <button
      ref={ref}
      onClick={() => setActiveValue(isActive ? null : value)}
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center ds-rounded bg-transparent px-4 py-2 text-sm font-medium hover:bg-ds-100 dark:hover:bg-ds-800 focus:bg-ds-100 dark:focus:bg-ds-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive ? "text-foreground" : "text-muted-foreground",
        className
      )}
    >
      {children}
      <FiChevronDown
        className={cn(
          "relative top-[1px] ml-1 h-3 w-3",
          isActive ? "rotate-180" : ""
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export function NavigationMenuContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { registerContent } = useNavigationMenuContext();

  React.useEffect(() => {
    registerContent(value, children);
  }, [value, children, registerContent]);

  return null;
}

export function NavigationMenuViewport({ className }: { className?: string }) {
  const { activeValue, triggerRects, contentMap, menuRect } = useNavigationMenuContext();
  const [contentRef, setContentRef] = React.useState<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (contentRef) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });
      resizeObserver.observe(contentRef);
      return () => resizeObserver.disconnect();
    }
  }, [contentRef]);

  const activeTrigger = activeValue ? triggerRects[activeValue] : null;

  let x = 0;
  if (activeTrigger && menuRect) {
    x = activeTrigger.left - menuRect.left + activeTrigger.width / 2 - menuRect.width / 2;
  }

  return (
    <AnimatePresence>
      {activeValue && activeTrigger && (
        <div
          className="absolute left-0 top-full flex justify-center w-full pointer-events-none z-[100]"
          style={{ perspective: '2000px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              width: dimensions.width,
              height: dimensions.height,
              x
            }}
            exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className={cn(
              "relative mt-1 ds-rounded border border-ds-200 dark:border-ds-900 bg-popover text-popover-foreground shadow-2xl pointer-events-auto",
              className
            )}
          >
            <div ref={setContentRef} className="w-max p-2 min-w-[300px]">
              {contentMap[activeValue]}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function NavigationMenuLink({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "block select-none space-y-1 ds-rounded p-2 leading-none no-underline outline-none hover:bg-ds-100 dark:hover:bg-ds-900 transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}
