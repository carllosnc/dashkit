import { createContext, forwardRef, useContext, useState, type ComponentPropsWithoutRef, type ReactNode, type KeyboardEvent } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';

export type TabsVariant = 'line' | 'pills';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (val: string) => void;
  tabsId: string;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const tabsVariants = cva('flex flex-col font-sans', {
  variants: {
    variant: {
      line: 'w-full',
      pills: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
});

const tabsListVariants = cva('flex items-center', {
  variants: {
    variant: {
      line: 'w-full justify-start border-b border-border gap-6',
      pills: 'inline-flex w-fit bg-muted p-0.5 ds-rounded-lg gap-0.5 border border-border/40',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
});

const tabsTriggerVariants = cva(
  'relative inline-flex items-center justify-center gap-2 text-sm font-medium outline-none isolate whitespace-nowrap cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        line: 'pb-2.5 pt-1 px-1',
        pills: 'px-3 py-1.5 ds-rounded-md duration-150',
      },
      active: {
        true: '',
        false: 'text-muted-foreground hover:text-foreground',
      },
    },
    compoundVariants: [
      {
        variant: 'line',
        active: true,
        className: 'text-foreground font-medium',
      },
      {
        variant: 'pills',
        active: true,
        className: 'text-foreground font-semibold',
      },
    ],
    defaultVariants: {
      variant: 'line',
      active: false,
    },
  }
);

export interface TabsProps extends ComponentPropsWithoutRef<'div'> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: ReactNode;
  /** @default 'line' */
  variant?: TabsVariant;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { defaultValue, value, onValueChange, children, className, variant = 'line', ...props },
  ref
) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [tabsId] = useState(() => Math.random().toString(36).substring(7));

  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (val: string) => {
    if (value === undefined) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabsId, variant }}>
      <div
        ref={ref}
        data-slot="tabs"
        data-variant={variant}
        className={cn(tabsVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  variant?: TabsVariant;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, className, variant: variantProp, ...props },
  ref
) {
  const context = useContext(TabsContext);
  const variant = variantProp || context?.variant || 'line';

  return (
    <div
      ref={ref}
      data-slot="tabs-list"
      role="tablist"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

export interface TabsTriggerProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
  children: ReactNode;
}

const TAB_KEYS = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, children, className, disabled, onClick, onKeyDown, ...props },
  ref
) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;
  const variant = context.variant;

  const focusTab = (tab: HTMLElement | undefined) => {
    if (!tab) return;
    tab.focus();
    tab.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!TAB_KEYS.includes(event.key)) return;
    const list = event.currentTarget.closest('[role="tablist"]');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    const index = tabs.indexOf(event.currentTarget);
    if (index === -1) return;

    event.preventDefault();
    switch (event.key) {
      case 'ArrowRight':
        focusTab(tabs[(index + 1) % tabs.length]);
        break;
      case 'ArrowLeft':
        focusTab(tabs[(index - 1 + tabs.length) % tabs.length]);
        break;
      case 'Home':
        focusTab(tabs[0]);
        break;
      case 'End':
        focusTab(tabs[tabs.length - 1]);
        break;
    }
  };

  return (
    <button
      ref={ref}
      data-slot="tabs-trigger"
      type="button"
      role="tab"
      id={`${context.tabsId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${context.tabsId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={(e) => {
        context.setActiveTab(value);
        onClick?.(e);
      }}
      onKeyDown={(e) => {
        handleKeyDown(e);
        onKeyDown?.(e);
      }}
      className={cn(
        tabsTriggerVariants({ variant, active: isActive }),
        className
      )}
      {...props}
    >
      {isActive && variant === 'line' && (
        <motion.div
          layoutId={`active-tab-line-${context.tabsId}`}
          className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary z-10 rounded-full"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.25
          }}
        />
      )}
      {isActive && variant === 'pills' && (
        <motion.div
          layoutId={`active-tab-pill-${context.tabsId}`}
          className="absolute inset-0 bg-card text-foreground shadow-xs ds-rounded-md z-0 border border-border/50"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.25
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
});

export interface TabsContentProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  value: string;
  children: ReactNode;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, children, className, ...props },
  ref
) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <motion.div
      ref={ref}
      data-slot="tabs-content"
      role="tabpanel"
      id={`${context.tabsId}-panel-${value}`}
      aria-labelledby={`${context.tabsId}-tab-${value}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn('flex-1 outline-none pt-4 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
