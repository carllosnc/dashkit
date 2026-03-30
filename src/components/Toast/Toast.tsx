import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';
import { useToast, type ToastData, type ToastType, removeToast, type ToastPosition, setToastDefaultPosition } from './useToast';

export type { ToastOptions, ToastType, ToastData, ToastPosition } from './useToast';

function cn(...inputs: ClassValue[]) {
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
  success: <FiCheckCircle className="text-ds-success-600 dark:text-ds-success-400" />,
  error: <FiAlertCircle className="text-ds-danger-600 dark:text-ds-danger-400" />,
  warning: <FiAlertTriangle className="text-ds-warning-500 dark:text-ds-warning-400" />,
  info: <FiInfo className="text-ds-info-600 dark:text-ds-info-400" />,
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
  const isTop = position.startsWith('top');

  const offset = index * 12;
  const scale = 1 - index * 0.05;
  const opacity = 1 - index * 0.2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }}
      animate={{
        opacity: opacity > 0 ? opacity : 0,
        y: isTop ? offset : -offset,
        scale,
        zIndex: total - index,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={cn(
          "absolute w-full pointer-events-auto bg-card text-card-fg border rounded-[var(--radius)] shadow-2xl p-4 flex items-center gap-4 group transition-shadow",
        isTop ? "top-0 origin-top" : "bottom-0 origin-bottom"
      )}
    >
      <div className="shrink-0 text-xl">
        {toast.icon || typeIcons[toast.type]}
      </div>

      <div className="flex flex-col gap-1 flex-1 overflow-hidden">
        {toast.title && (
          <h4 className="text-sm font-bold text-card-foreground dark:text-card-dark-foreground leading-tight truncate">
            {toast.title}
          </h4>
        )}
        {toast.description && (
          <p className="text-xs text-card-foreground dark:text-card-dark-foreground leading-relaxed line-clamp-2">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 h-fit p-1 rounded-md text-ds-400 hover:text-block-fg dark:hover:text-block-dark-fg hover:bg-floating-item-bg-hover dark:hover:bg-floating-item-dark-bg-hover transition-all opacity-0 group-hover:opacity-100"
      >
        <FiX size={14} />
      </button>
    </motion.div>
  );
}
