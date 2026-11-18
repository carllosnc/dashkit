export interface UseProgressBarProps {
  value: number;
  max: number;
}

export function useProgressBar({ value, max }: UseProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100);

  return {
    percentage
  };
}
