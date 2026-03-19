import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return twMerge(clsx(inputs));
}

// Global state for Toasts
type ToastType = 'default' | 'success' | 'info' | 'error' | 'warning';

interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  type?: ToastType;
  duration?: number;
}

type ToastData = ToastOptions & { id: string };

let toastCount = 0;
const observers = new Set<(toasts: ToastData[]) => void>();
let currentToasts: ToastData[] = [];

const notify = () => observers.forEach(fn => fn([...currentToasts]));

export const toast = (options: ToastOptions) => {
  const id = options.id || `toast-${toastCount++}`;
  const newToast: ToastData = { ...options, id, type: options.type || 'default' };
  
  currentToasts = [newToast, ...currentToasts].slice(0, 5); // Max 5 toasts
  notify();

  if (options.duration !== 0) {
    setTimeout(() => removeToast(id), options.duration || 5000);
  }
  return id;
};

export const removeToast = (id: string) => {
  currentToasts = currentToasts.filter(t => t.id !== id);
  notify();
};

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  React.useEffect(() => {
    observers.add(setToasts);
    return () => { observers.delete(setToasts); };
  }, []);

  return { toasts, toast, removeToast };
}

// Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts } = useToast();

  return (
    <>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none w-[380px]">
          <AnimatePresence mode="popLayout">
            {toasts.map((t, index) => (
              <ToastItem 
                key={t.id} 
                toast={t} 
                index={index} 
                total={toasts.length} 
              />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </>
  );
}

const typeIcons = {
  success: <FiCheckCircle className="text-emerald-500" />,
  error: <FiAlertCircle className="text-red-500" />,
  warning: <FiAlertTriangle className="text-amber-500" />,
  info: <FiInfo className="text-blue-500" />,
  default: null
};

function ToastItem({ toast, index, total }: { toast: ToastData; index: number; total: number }) {
  // Stacking logic: 
  // index 0 is the newest (top of the view, bottom of stack visually if we use negative Y)
  // We want the newest at the front.
  // We'll use absolute positioning for the stack effect.
  
  const isStacked = index > 0;
  const offset = index * 12;
  const scale = 1 - index * 0.05;
  const opacity = 1 - index * 0.2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ 
        opacity: opacity > 0 ? opacity : 0, 
        y: -offset, 
        scale,
        zIndex: total - index,
        filter: isStacked ? 'blur(0.5px)' : 'none'
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "absolute bottom-0 right-0 w-full pointer-events-auto origin-bottom",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800",
        "rounded-2xl shadow-2xl p-4 flex gap-4 group transition-shadow hover:shadow-neutral-400/20 dark:hover:shadow-black"
      )}
    >
      <div className="shrink-0 mt-0.5 text-xl">
        {toast.icon || typeIcons[toast.type || 'default']}
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
