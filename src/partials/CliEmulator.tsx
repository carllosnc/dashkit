import { motion, AnimatePresence } from 'framer-motion';
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
      "✔ Resolving dependencies: recharts, framer-motion",
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
      "✔ Resolving dependencies: date-fns, lucide-react",
      "✔ Writing src/components/DatePicker/DatePicker.tsx",
      "✨ Component 'datepicker' added successfully!"
    ]
  }
];

export const CliEmulator = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [displayedInput, setDisplayedInput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [phase, setPhase] = useState<'typing' | 'output' | 'idle'>('typing');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentStep = STEPS[stepIndex];

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
  }, [displayedInput, displayedOutput, phase, stepIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <div className="bg-[#0D0D0D] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm md:text-base">
        {/* Terminal Header */}
        <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#FF5F56]" />
            <div className="size-3 rounded-full bg-[#FFBD2E]" />
            <div className="size-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 text-center pr-10 text-[10px] uppercase tracking-widest text-white/30 font-bold select-none">
            dashkit-cli — bash
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-[260px] flex flex-col gap-2 text-left overflow-hidden bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-[#27C93F] font-bold select-none transition-opacity duration-300">~</span>
            <span className="text-white flex-1 flex items-center">
              {displayedInput}
              {phase === 'typing' && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-5 bg-[#27C93F] ml-1 inline-block"
                />
              )}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <AnimatePresence mode="popLayout">
              {displayedOutput.map((line, i) => (
                <motion.div
                  key={`${stepIndex}-${i}`}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    line.startsWith('✨') 
                      ? 'text-[#27C93F] font-bold mt-2' 
                      : line.startsWith('✖') 
                        ? 'text-[#FF5F56]' 
                        : 'text-white/60'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-white/5 flex items-center justify-between italic text-[10px] text-white/20 select-none">
          <span>Dashkit v1.0.4</span>
          <span>UTF-8</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground font-medium grayscale">
          Zero-bloat installation directly into your codebase
        </p>
      </div>
    </div>
  );
};
