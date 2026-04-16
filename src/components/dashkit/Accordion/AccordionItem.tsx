import * as React from 'react';
import { cn } from '../utils/cn';
import { AccordionContext, AccordionItemContext } from './AccordionContext';

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const ACCORDION_ITEM_BASE = "bg-card text-card-foreground ds-rounded shadow-sm overflow-hidden";

export function AccordionItem({ value, children, className, disabled }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn(
        ACCORDION_ITEM_BASE,
        isOpen && "bg-card",
        context.shadowed ? "bg-card" : "shadow-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

AccordionItem.displayName = 'AccordionItem';
