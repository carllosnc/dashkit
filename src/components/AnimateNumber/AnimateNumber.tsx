import { motion, AnimatePresence } from "framer-motion";

export interface AnimateNumberProps {
  /** The target value to animate to */
  value: number;
  /** Number of decimal places to show */
  precision?: number;
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string;
  /** Suffix to display after the number (e.g., "%") */
  suffix?: string;
  /** Custom CSS classes */
  className?: string;
  /** Animation duration for each character in seconds */
  duration?: number;
  /** Locale for formatting (defaults to 'en-US') */
  locale?: string;
}

/**
 * A character component that animates its content with a sliding effect.
 * When the character changes, the old one slides out and the new one slides in from the top.
 */
function Digit({ char, duration }: { char: string, duration: number }) {
  return (
    <span className="relative inline-flex items-center h-[1em] overflow-hidden leading-none align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * A component that animates numeric value changes with a sleek top-to-bottom entrance/exit.
 * This creates a more dynamic and "premium" look compared to simple value interpolation.
 */
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
