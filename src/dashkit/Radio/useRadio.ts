export interface UseRadioProps {
  id?: string;
  label?: string;
}

export function useRadio({ id, label }: UseRadioProps) {
  const radioId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return {
    radioId
  };
}
