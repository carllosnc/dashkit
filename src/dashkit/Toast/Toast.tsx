import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { useToast, type ToastData, type ToastType, removeToast, pauseToastTimer, resumeToastTimer, type ToastPosition, setToastDefaultPosition } from './useToast';
import { cn } from '../utils/cn';

export type { ToastOptions, ToastType, ToastData, ToastPosition } from './useToast';

const POSITIONS: ToastPosition[] = [
  'top-left', 'top-right', 'top-center',
  'bottom-left', 'bottom-right', 'bottom-center'
];

const viewportPositionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-8 left-8 items-start',
  'top-right': 'top-8 right-8 items-end',
  'top-center': 'top-8 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-8 left-8 items-start',
  'bottom-right': 'bottom-8 right-8 items-end',
  'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2 items-center',
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  invert?: boolean;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  invert = false
}: ToastProviderProps) {
  const { toasts } = useToast();
  const isMounted = React.useSyncExternalStore(
    React.useCallback(() => () => {}, []),
    () => true,
    () => false
  );

  React.useEffect(() => {
    setToastDefaultPosition(position);
  }, [position]);

  return (
    <>
      {children}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <>
          {POSITIONS.map((pos) => {
            const posToasts = toasts.filter(t => t.position === pos);
            if (posToasts.length === 0) return null;

            return (
              <div
                key={pos}
                aria-live="polite"
                data-testid="toast-viewport"
                data-position={pos}
                className={cn(
                  'fixed z-[100] flex flex-col pointer-events-none w-[380px] max-w-[calc(100vw-4rem)] gap-3',
                  viewportPositionClasses[pos]
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
                      invert={t.invert ?? invert}
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

const TYPE_ICONS: Record<ToastType, React.ReactNode> = {
  success: <FiCheckCircle className="text-ds-success-600 dark:text-ds-success-400" />,
  error: <FiAlertCircle className="text-ds-danger-600 dark:text-ds-danger-400" />,
  warning: <FiAlertTriangle className="text-ds-warning-500 dark:text-ds-warning-400" />,
  info: <FiInfo className="text-ds-info-600 dark:text-ds-info-400" />,
  default: null
};

interface ToastItemProps {
  toast: ToastData;
  index: number;
  total: number;
  position: ToastPosition;
  invert?: boolean;
}

function ToastItem({
  toast,
  index,
  total,
  position,
  invert
}: ToastItemProps) {
  const isTop = position.startsWith('top');
  const isUrgent = toast.type === 'error' || toast.type === 'warning';

  const offset = index * 12;
  const scale = 1 - index * 0.05;
  const opacity = 1 - index * 0.2;

  return (
    <motion.div
      layout
      role={isUrgent ? 'alert' : 'status'}
      aria-atomic="true"
      initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }}
      animate={{
        opacity: opacity > 0 ? opacity : 0,
        y: isTop ? offset : -offset,
        scale,
        zIndex: total - index,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      onMouseEnter={() => pauseToastTimer(toast.id)}
      onMouseLeave={() => resumeToastTimer(toast.id)}
      onFocus={() => pauseToastTimer(toast.id)}
      onBlur={() => resumeToastTimer(toast.id)}
      className={cn(
        'group absolute w-full pointer-events-auto border ds-rounded shadow-2xl p-4 flex items-center gap-4 transition-shadow',
        invert
          ? 'bg-ds-950 text-ds-50 border-ds-800 dark:bg-ds-0 dark:text-ds-950 dark:border-ds-200'
          : 'bg-card text-card-foreground border-border',
        isTop ? 'top-0 origin-top' : 'bottom-0 origin-bottom'
      )}
    >
      <div className="shrink-0 text-xl">
        {toast.icon || TYPE_ICONS[toast.type]}
      </div>

      <div className="flex flex-col gap-1 flex-1 overflow-hidden">
        {toast.title && (
          <h4 className={cn('text-sm font-bold leading-tight', invert ? 'text-ds-50 dark:text-ds-950' : 'text-foreground')}>
            {toast.title}
          </h4>
        )}
        {toast.description && (
          <p className={cn('text-xs leading-relaxed', invert ? 'text-ds-300 dark:text-ds-600' : 'text-muted-foreground')}>
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => removeToast(toast.id)}
        className={cn(
          'shrink-0 h-fit p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:opacity-100',
          invert
            ? 'text-ds-400 hover:text-ds-50 hover:bg-ds-800 dark:text-ds-500 dark:hover:text-ds-950 dark:hover:bg-ds-200'
            : 'text-ds-600 dark:text-ds-400 hover:text-foreground hover:bg-muted'
        )}
      >
        <FiX size={16} />
      </button>
    </motion.div>
  );
}
