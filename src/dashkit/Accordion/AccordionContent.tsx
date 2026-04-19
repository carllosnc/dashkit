import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { AccordionItemContext } from './AccordionContext';
import './accordion.css';

export function AccordionContent({ children, className }: { children: React.ReactNode; className?: string }) {
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
          className="accordion-content"
        >
          <div className={cn('accordion-content-inner', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

AccordionContent.displayName = 'AccordionContent';

