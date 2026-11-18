import { useId } from 'react';

export interface UseSwitchProps {
  id?: string;
}

export function useSwitch({ id }: UseSwitchProps) {
  const generatedId = useId();
  const switchId = id || `switch-${generatedId}`;

  return {
    switchId
  };
}
