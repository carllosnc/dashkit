import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Digit } from './Digit';

export interface AnimateNumberProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  value: number;
  /** @default 0 */
  precision?: number;
  /** @default '' */
  prefix?: string;
  /** @default '' */
  suffix?: string;
  /** @default 0.35 */
  duration?: number;
  /** @default 'en-US' */
  locale?: string;
}

export const AnimateNumber = forwardRef<HTMLSpanElement, AnimateNumberProps>(function AnimateNumber(
  {
    value,
    precision = 0,
    prefix = '',
    suffix = '',
    className,
    duration = 0.35,
    locale = 'en-US',
    ...props
  },
  ref
) {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);

  const fullString = `${prefix}${formatted}${suffix}`;
  const chars = fullString.split("");

  return (
    <span ref={ref} data-slot="animate-number" className={className} {...props}>
      {chars.map((char, index) => (
        <Digit 
          key={index} 
          char={char} 
          duration={duration}
        />
      ))}
    </span>
  );
});

AnimateNumber.displayName = 'AnimateNumber';
