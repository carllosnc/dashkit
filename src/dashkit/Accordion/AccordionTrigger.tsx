import * as React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<'button'>;

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, className, onClick, ...props }, ref) {
    const itemContext = React.useContext(AccordionItemContext);
    const context = React.useContext(AccordionContext);
    if (!itemContext || !context) throw new Error('AccordionTrigger must be used within AccordionItem');

    const { disabled } = itemContext;

    return (
      <button
        ref={ref}
        type="button"
        data-slot="accordion-trigger"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-expanded={itemContext.isOpen}
        onClick={(e) => {
          if (disabled) return;
          context.onValueChange(itemContext.value);
          onClick?.(e);
        }}
        className={cn(
          'group flex w-full items-center justify-between py-4 text-left transition-colors cursor-pointer outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring font-medium',
          itemContext.isOpen ? 'text-foreground' : 'text-muted-foreground',
          className
        )}
        {...props}
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
);

AccordionTrigger.displayName = 'AccordionTrigger';
