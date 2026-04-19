import { useState, useEffect } from 'react';
import { cn } from '../dashkit/utils/cn';

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingEffect({
  words,
  typingSpeed = 120,
  erasingSpeed = 50,
  pauseDuration = 2000,
  className,
  cursorClassName,
}: TypingEffectProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? erasingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, erasingSpeed, pauseDuration]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {words[index].substring(0, subIndex)}
      <span 
        className={cn(
          "inline-block w-[3px] h-[1.1em] bg-current opacity-60 ml-1.5 animate-pulse align-middle mb-0.5", 
          cursorClassName
        )} 
      />
    </span>
  );
}
