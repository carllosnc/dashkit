import { Digit } from './Digit';

export interface AnimateNumberProps {
  value: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  locale?: string;
}

export function AnimateNumber({
  value,
  precision = 0,
  prefix = '',
  suffix = '',
  className,
  duration = 0.35,
  locale = 'en-US',
}: AnimateNumberProps) {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);

  const fullString = `${prefix}${formatted}${suffix}`;
  const chars = fullString.split("");

  return (
    <span className={className}>
      {chars.map((char, index) => (
        <Digit 
          key={index} 
          char={char} 
          duration={duration}
        />
      ))}
    </span>
  );
}
