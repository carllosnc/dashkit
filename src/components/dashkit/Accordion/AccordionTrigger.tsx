import * as React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

const TRIGGER_BASE = "flex w-full items-center gap-3 px-4 py-4 text-left hover:text-block-fg dark:hover:text-block-dark-fg group";
const TRIGGER_ACTIVE = "text-block-fg dark:text-block-dark-fg font-medium";
const TRIGGER_INACTIVE = "text-ds-950 dark:text-ds-300 font-medium";
const TRIGGER_CONTENT = "text-base text-foreground font-medium tracking-tight";

export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const itemContext = React.useContext(AccordionItemContext);
  const context = React.useContext(AccordionContext);
  if (!itemContext || !context) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      onClick={() => context.onValueChange(itemContext.value)}
      className={cn(
        TRIGGER_BASE,
        itemContext.isOpen ? TRIGGER_ACTIVE : TRIGGER_INACTIVE,
        className
      )}
    >
      <motion.div
        animate={{ rotate: itemContext.isOpen ? 90 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="text-ds-400 shrink-0"
      >
        <FiChevronRight size={18} />
      </motion.div>
      <span className={TRIGGER_CONTENT}>{children}</span>
    </button>
  );
}

AccordionTrigger.displayName = 'AccordionTrigger';
