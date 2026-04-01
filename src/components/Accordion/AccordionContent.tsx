import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { AccordionItemContext } from './AccordionContext';

const CONTENT_BASE = "overflow-hidden";
const CONTENT_INNER = "px-4 pb-4 pl-[44px] text-sm text-muted-foreground leading-relaxed font-medium";

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
          className={CONTENT_BASE}
        >
          <div className={cn(CONTENT_INNER, className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

AccordionContent.displayName = 'AccordionContent';
