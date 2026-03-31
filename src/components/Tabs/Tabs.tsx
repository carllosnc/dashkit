import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
      <div className={cn("w-full flex flex-col font-sans ds-rounded shadow-sm overflow-hidden bg-card", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex w-full items-stretch justify-start border-b border-border/70 bg-muted/20", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "relative flex-1 text-sm px-4 py-3 font-medium duration-200 outline-none isolate whitespace-nowrap flex items-center justify-center cursor-pointer border-r border-border/70 last:border-r-0 bg-card",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={`active-tab-line-${context.tabsId}`}
          className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary z-10"
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

export function TabsContent({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn("p-6 flex-1 outline-none", className)}
    >
      {children}
    </motion.div>
  );
}


