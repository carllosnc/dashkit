import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/**
 * Root Tabs component managing the selection state
 */
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
      <div className={cn("w-full h-full flex flex-col font-sans", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/**
 * Container for the list of tab triggers
 */
export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("ds-tabs-list", className)}>
      {children}
    </div>
  );
}

/**
 * Individual tab trigger button
 */
export function TabsTrigger({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  
  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "ds-tabs-trigger",
        isActive ? "ds-tabs-trigger-active" : "",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={`active-tab-${context.tabsId}`}
          className="ds-tabs-active-bg"
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30 
          }}
        />
      )}
      {children}
    </button>
  );
}

/**
 * Content that is revealed when its tab is active
 */
export function TabsContent({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("mt-4 flex-1 outline-none", className)}
    >
      {children}
    </motion.div>
  );
}
