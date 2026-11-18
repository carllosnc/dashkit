import { useId } from 'react';

export interface UseRadioProps {
  id?: string;
}

export function useRadio({ id }: UseRadioProps) {
  const generatedId = useId();
  const radioId = id || `radio-${generatedId}`;

  return {
    radioId
  };
}
