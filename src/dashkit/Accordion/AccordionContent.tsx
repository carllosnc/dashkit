import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { AccordionItemContext } from './AccordionContext';

export type AccordionContentProps = React.ComponentPropsWithoutRef<'div'>;

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ children, className, ...props }, ref) {
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
            <div
              ref={ref}
              data-slot="accordion-content"
              className={cn('pb-4 pt-1 text-sm text-muted-foreground leading-relaxed font-normal', className)}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

