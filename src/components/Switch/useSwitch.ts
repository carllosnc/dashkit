export interface UseSwitchProps {
  id?: string;
  label?: string;
}

export function useSwitch({ id, label }: UseSwitchProps) {
  const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return {
    switchId
  };
}
