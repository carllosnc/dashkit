import { createContext, useContext, useState, type ReactNode, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import './tabs.css';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (val: string) => void;
  tabsId: string;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [tabsId] = useState(() => Math.random().toString(36).substring(7));

  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (val: string) => {
    if (value === undefined) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabsId }}>
      <div className={cn('tabs', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div role="tablist" className={cn('tabs__list', className)}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const TAB_KEYS = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  const focusTab = (tab: HTMLElement | undefined) => {
    if (!tab) return;
    tab.focus();
    tab.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!TAB_KEYS.includes(event.key)) return;
    const list = event.currentTarget.closest('[role="tablist"]');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
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
      type="button"
      role="tab"
      id={`${context.tabsId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${context.tabsId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => context.setActiveTab(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'tabs__trigger',
        isActive ? 'tabs__trigger--active' : 'tabs__trigger--inactive',
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={`active-tab-line-${context.tabsId}`}
          className="tabs__active-indicator"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 32
          }}
        />
      )}
      {children}
    </button>
  );
}

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <motion.div
      role="tabpanel"
      id={`${context.tabsId}-panel-${value}`}
      aria-labelledby={`${context.tabsId}-tab-${value}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn('tabs__content', className)}
    >
      {children}
    </motion.div>
  );
}

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
