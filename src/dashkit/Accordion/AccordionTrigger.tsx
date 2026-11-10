import * as React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const itemContext = React.useContext(AccordionItemContext);
  const context = React.useContext(AccordionContext);
  if (!itemContext || !context) throw new Error('AccordionTrigger must be used within AccordionItem');

  const { disabled } = itemContext;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-expanded={itemContext.isOpen}
      onClick={() => {
        if (disabled) return;
        context.onValueChange(itemContext.value);
      }}
      className={cn(
        'group flex w-full items-center justify-between py-4 text-left transition-colors cursor-pointer outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring font-medium',
        itemContext.isOpen ? 'text-foreground' : 'text-ds-700 dark:text-ds-300',
        className
      )}
    >
      <span className="text-sm md:text-base font-medium tracking-tight text-foreground flex-1">{children}</span>
      <motion.div
        animate={{ rotate: itemContext.isOpen ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
      >
        <FiChevronDown size={16} />
      </motion.div>
    </button>
  );
}

AccordionTrigger.displayName = 'AccordionTrigger';
