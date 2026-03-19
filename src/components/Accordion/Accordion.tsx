import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  value: string | string[];
  onValueChange: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
}

export const Accordion = ({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: AccordionProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string | string[];

    if (type === 'single') {
      newValue = value === itemValue ? '' : itemValue;
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(itemValue)
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
    }

    if (!isControlled) setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange }}>
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean } | undefined>(undefined);

export const AccordionItem = ({ value, children, className, disabled }: AccordionItemProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = Array.isArray(context.value) 
    ? context.value.includes(value) 
    : context.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn(
        "border-b border-base-300 dark:border-base-800 last:border-b-0 transition-colors duration-200",
        disabled && "opacity-50 pointer-events-none",
        className
      )}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const itemContext = React.useContext(AccordionItemContext);
  const context = React.useContext(AccordionContext);
  if (!itemContext || !context) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      onClick={() => context.onValueChange(itemContext.value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-base-900 dark:hover:text-white group",
        itemContext.isOpen ? "text-base-900 dark:text-white" : "text-base-500 dark:text-base-400",
        className
      )}
    >
      <span className="text-sm tracking-tight">{children}</span>
      <motion.div
        animate={{ rotate: itemContext.isOpen ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="text-base-400 group-hover:text-base-900 dark:group-hover:text-white shrink-0 ml-4"
      >
        <FiChevronDown size={16} />
      </motion.div>
    </button>
  );
};

export const AccordionContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext) throw new Error('AccordionContent must be used within AccordionItem');

  return (
    <AnimatePresence initial={false}>
      {itemContext.isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="overflow-hidden"
        >
          <div className={cn("pb-4 text-sm text-base-500 dark:text-base-400 leading-relaxed", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
