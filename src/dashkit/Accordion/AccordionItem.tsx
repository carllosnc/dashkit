import * as React from 'react';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';
import './accordion.css';

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function AccordionItem({ value, children, className, disabled }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn(
        'accordion__item',
        isOpen && "accordion__item--open",
        !context.shadowed && "accordion__item--shadow-none",
        disabled && "accordion__item--disabled",
        className
      )}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

AccordionItem.displayName = 'AccordionItem';

