export interface UseProgressBarProps {
  value: number;
  max: number;
}

export function useProgressBar({ value, max }: UseProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return {
    percentage
  };
}
