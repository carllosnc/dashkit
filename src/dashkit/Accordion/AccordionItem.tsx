import * as React from 'react';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, children, className, disabled, ...props }, ref) {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error('AccordionItem must be used within Accordion');

    const isOpen = Array.isArray(context.value)
      ? context.value.includes(value)
      : context.value === value;

    return (
      <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
        <div
          ref={ref}
          data-slot="accordion-item"
          data-disabled={disabled || undefined}
          aria-disabled={disabled || undefined}
          className={cn(
            'border-b border-border transition-colors last:border-b-0',
            disabled && 'opacity-50 pointer-events-none',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

