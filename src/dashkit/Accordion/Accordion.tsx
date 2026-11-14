import * as React from 'react';
import { cn } from '../utils/cn';
import { AccordionContext, type AccordionType } from './AccordionContext';

export interface AccordionProps extends React.ComponentPropsWithoutRef<'div'> {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = 'single',
    defaultValue,
    value: controlledValue,
    onValueChange,
    children,
    className,
    ...props
  },
  ref
) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (itemValue: string) => {
    let newValue: string | string[];

    if (type === 'single') {
      newValue = value === itemValue ? '' : itemValue;
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      newValue = currentValues.includes(itemValue)
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
    }

    if (!isControlled) setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange }}>
      <div ref={ref} data-slot="accordion" className={cn('flex flex-col w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

