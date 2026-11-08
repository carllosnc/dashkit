import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

const STEPS = [
  {
    input: "bunx carllosnc/dashkit add button",
    output: [
      "✔ Fetching registry...",
      "✔ Resolving dependencies...",
      "✔ Writing src/components/Button/Button.tsx",
      "✨ Component 'button' added successfully!"
    ]
  },
  {
    input: "bunx carllosnc/dashkit add card",
    output: [
      "✔ Fetching registry...",
      "✔ Writing src/components/Card/Card.tsx",
      "✨ Component 'card' added successfully!"
    ]
  },
  {
    input: "bunx carllosnc/dashkit add area-chart",
    output: [
      "✔ Fetching registry...",
      "✔ Resolving dependencies: framer-motion, clsx, tailwind-merge",
      "✔ Writing src/components/AreaChart/AreaChart.tsx",
      "✨ Component 'area-chart' added successfully!"
    ]
  },
  {
    input: "bunx carllosnc/dashkit add sidebar",
    output: [
      "✔ Fetching registry...",
      "✔ Resolving dependencies: framer-motion",
      "✔ Writing src/components/Sidebar/Sidebar.tsx",
      "✨ Component 'sidebar' added successfully!"
    ]
  },
  {
    input: "bunx carllosnc/dashkit add datepicker",
    output: [
      "✔ Fetching registry...",
      "✔ Resolving dependencies: framer-motion, clsx, tailwind-merge, react-icons",
      "✔ Writing src/components/DatePicker/DatePicker.tsx",
      "✨ Component 'datepicker' added successfully!"
    ]
  }
];

export const CliEmulator = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [displayedInput, setDisplayedInput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [phase, setPhase] = useState<'typing' | 'output' | 'idle'>('typing');

  const currentStep = STEPS[stepIndex];
  const activeInput = shouldReduceMotion ? currentStep.input : displayedInput;
  const activeOutput = shouldReduceMotion ? currentStep.output : displayedOutput;

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayedInput.length < currentStep.input.length) {
        timeout = setTimeout(() => {
          setDisplayedInput(currentStep.input.slice(0, displayedInput.length + 1));
        }, 50 + Math.random() * 50);
      } else {
        timeout = setTimeout(() => {
          setPhase('output');
        }, 500);
      }
    } else if (phase === 'output') {
      if (displayedOutput.length < currentStep.output.length) {
        timeout = setTimeout(() => {
          setDisplayedOutput(prev => [...prev, currentStep.output[prev.length]]);
        }, 150 + Math.random() * 200);
      } else {
        timeout = setTimeout(() => {
          setPhase('idle');
        }, 2000);
      }
    } else if (phase === 'idle') {
      timeout = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % STEPS.length);
        setDisplayedInput("");
        setDisplayedOutput([]);
        setPhase('typing');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [displayedInput, displayedOutput, phase, stepIndex, isPaused, shouldReduceMotion, currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-xl overflow-hidden font-mono text-sm md:text-base">
        {/* Terminal Header */}
        <div className="bg-muted/40 px-4 py-3 flex items-center gap-2 border-b border-border">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-danger/80" />
            <div className="size-3 rounded-full bg-warning/80" />
            <div className="size-3 rounded-full bg-success/80" />
          </div>
          <div className="flex-1 text-center pr-10 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold select-none">
            dashkit-cli — bash
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-[260px] flex flex-col gap-2 text-left overflow-hidden bg-gradient-to-b from-transparent to-muted/15">
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold select-none transition-opacity duration-300">~</span>
            <span className="text-foreground flex-1 flex items-center">
              {activeInput}
              {phase === 'typing' && !shouldReduceMotion && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-5 bg-primary ml-1 inline-block motion-reduce:hidden"
                />
              )}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <AnimatePresence mode="popLayout">
              {activeOutput.map((line, i) => (
                <motion.div
                  key={`${stepIndex}-${i}`}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className={`${
                    line.startsWith('✨') 
                      ? 'text-primary font-bold mt-2' 
                      : line.startsWith('✖') 
                        ? 'text-danger' 
                        : 'text-muted-foreground'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-muted/30 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground select-none">
          <span className="italic">Dashkit CLI</span>
          <button
            type="button"
            onClick={() => setIsPaused(p => !p)}
            className="hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer px-2 py-0.5 rounded border border-border font-mono text-[10px]"
            aria-label={isPaused ? "Play terminal animation" : "Pause terminal animation"}
          >
            {isPaused ? "▶ Play" : "⏸ Pause"}
          </button>
          <span className="italic">UTF-8</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Zero-bloat installation directly into your codebase
        </p>
      </div>
    </div>
  );
};
