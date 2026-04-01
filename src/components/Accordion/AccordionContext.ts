import * as React from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContextValue {
  type: AccordionType;
  value: string | string[];
  onValueChange: (value: string) => void;
  shadowed?: boolean;
}

export const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

export const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);
