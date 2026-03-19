import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useToast, type ToastData, type ToastType, removeToast, type ToastPosition, setToastDefaultPosition} from './useToast';
export type { ToastOptions, ToastType, ToastData, ToastPosition } from './useToast';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-8 left-8 items-start',
  'top-right': 'top-8 right-8 items-end',
  'top-center': 'top-8 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-8 left-8 items-start',
  'bottom-right': 'bottom-8 right-8 items-end',
  'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2 items-center',
};

// Provider Component
export function ToastProvider({ 
  children, 
  position = 'bottom-right' 
}: { 
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  const { toasts } = useToast();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setToastDefaultPosition(position);
  }, [position]);

  return (
    <>
      {children}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <>
          {(Object.keys(positionClasses) as ToastPosition[]).map((pos) => {
            const posToasts = toasts.filter(t => t.position === pos);
            if (posToasts.length === 0) return null;
            
            return (
              <div 
                key={pos} 
                className={cn(
                  "fixed z-[100] flex flex-col pointer-events-none w-[380px] max-w-[calc(100vw-4rem)] gap-3",
                  positionClasses[pos]
                )}
              >
                <AnimatePresence mode="popLayout">
                  {posToasts.map((t, index) => (
                    <ToastItem 
                      key={t.id} 
                      toast={t} 
                      index={index} 
                      total={posToasts.length} 
                      position={pos}
                    />
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </>,
        document.body
      )}
    </>
  );
}

const typeIcons: Record<ToastType, React.ReactNode> = {
  success: <FiCheckCircle className="text-emerald-500" />,
  error: <FiAlertCircle className="text-red-500" />,
  warning: <FiAlertTriangle className="text-amber-500" />,
  info: <FiInfo className="text-blue-500" />,
  default: null
};

function ToastItem({ 
  toast, 
  index, 
  total, 
  position 
}: { 
  toast: ToastData; 
  index: number; 
  total: number; 
  position: ToastPosition;
}) {
  const isStacked = index > 0;
  const isTop = position.startsWith('top');
  
  const offset = index * 12;
  const scale = 1 - index * 0.05;
  const opacity = 1 - index * 0.2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isTop ? -50 : 50, scale: 0.8 }}
      animate={{ 
        opacity: opacity > 0 ? opacity : 0, 
        y: isTop ? offset : -offset, 
        scale,
        zIndex: total - index,
        filter: isStacked ? 'blur(0.5px)' : 'none'
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "absolute w-full pointer-events-auto",
        isTop ? "top-0 origin-top" : "bottom-0 origin-bottom",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
        "rounded-2xl shadow-2xl p-4 flex gap-4 group transition-shadow hover:shadow-neutral-400/20 dark:hover:shadow-black"
      )}
    >
      <div className="shrink-0 mt-0.5 text-xl">
        {toast.icon || typeIcons[toast.type]}
      </div>
      
      <div className="flex flex-col gap-1 flex-1 overflow-hidden">
        {toast.title && (
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight truncate">
            {toast.title}
          </h4>
        )}
        {toast.description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 h-fit p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
      >
        <FiX size={14} />
      </button>
    </motion.div>
  );
}



