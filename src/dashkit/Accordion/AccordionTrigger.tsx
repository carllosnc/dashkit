import * as React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';
import './accordion.css';

export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const itemContext = React.useContext(AccordionItemContext);
  const context = React.useContext(AccordionContext);
  if (!itemContext || !context) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      onClick={() => context.onValueChange(itemContext.value)}
      className={cn(
        'accordion__trigger',
        itemContext.isOpen && 'accordion__trigger--active',
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
      <span className="accordion__trigger-content">{children}</span>
    </button>
  );
}

AccordionTrigger.displayName = 'AccordionTrigger';

