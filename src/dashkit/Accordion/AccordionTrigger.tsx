import * as React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';
import './accordion.css';

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
        'accordion__trigger',
        itemContext.isOpen && 'accordion__trigger--active',
        className
      )}
    >
      <span className="accordion__trigger-content">{children}</span>
      <motion.div
        animate={{ rotate: itemContext.isOpen ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="accordion__trigger-icon text-muted-foreground shrink-0"
      >
        <FiChevronDown size={16} />
      </motion.div>
    </button>
  );
}

AccordionTrigger.displayName = 'AccordionTrigger';
