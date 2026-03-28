import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
  animate?: boolean;
}

const DockContext = React.createContext<{
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  animate: boolean;
} | undefined>(undefined);

export function Dock({
  children,
  className,
  magnification = 60,
  distance = 140,
  animate = true
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, animate }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-16 items-end gap-4 rounded-full bg-ds-950/20 dark:bg-ds-0/30 backdrop-blur-lg px-4 pb-3 shadow-2xl",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function DockItem({ icon, label, onClick, href, className }: DockItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const context = React.useContext(DockContext);

  if (!context) throw new Error('DockItem must be used within a Dock');
  const { mouseX, magnification, distance, animate } = context;

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width: animate ? width : 40 }}
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-full bg-ds-950 dark:bg-ds-100 text-ds-100 hover:text-ds-0 dark:text-ds-950 dark:hover:text-ds-950 transition-colors shadow-sm",
        className
      )}
    >
      <div className="flex h-full w-full items-center justify-center text-current [&>svg]:size-5">
        {icon}
      </div>
      {label && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 bg-ds-950 px-2 py-1 text-[10px] font-bold text-ds-0 group-hover:scale-100 dark:bg-ds-0 dark:text-ds-950 border border-ds-800 dark:border-ds-200 whitespace-nowrap z-[100]">
          {label}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="outline-none focus-visible:ring-2 focus-visible:ring-ds-400 rounded-full">
      {content}
    </button>
  );
}
