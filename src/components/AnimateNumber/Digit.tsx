import { motion, AnimatePresence } from "framer-motion";

interface DigitProps {
  char: string;
  duration: number;
}

const DIGIT_CONTAINER = "relative inline-flex items-center h-[1em] overflow-hidden leading-none align-bottom";
const DIGIT_CONTENT = "inline-block";

export function Digit({ char, duration }: DigitProps) {
  return (
    <span className={DIGIT_CONTAINER}>
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
          className={DIGIT_CONTENT}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
