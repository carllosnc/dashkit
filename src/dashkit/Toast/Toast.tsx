import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { useToast, type ToastData, type ToastType, removeToast, type ToastPosition, setToastDefaultPosition } from './useToast';
import { cn } from '../utils/cn';
import './toast.css';

export type { ToastOptions, ToastType, ToastData, ToastPosition } from './useToast';

const POSITIONS: ToastPosition[] = [
  'top-left', 'top-right', 'top-center',
  'bottom-left', 'bottom-right', 'bottom-center'
];

export function ToastProvider({
  children,
  position = 'bottom-right',
  invert = false
}: {
  children: React.ReactNode;
  position?: ToastPosition;
  invert?: boolean;
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
          {POSITIONS.map((pos) => {
            const posToasts = toasts.filter(t => t.position === pos);
            if (posToasts.length === 0) return null;

            return (
              <div
                key={pos}
                className={cn('toast-viewport', `toast-viewport--${pos}`)}
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
        'toast-item',
        invert ? 'toast-item--invert' : 'toast-item--default',
        isTop ? 'toast-item--top' : 'toast-item--bottom'
      )}
    >
      <div className="toast-item__icon">
        {toast.icon || TYPE_ICONS[toast.type]}
      </div>

      <div className="toast-item__content">
        {toast.title && (
          <h4 className={cn('toast-item__title', invert ? 'toast-item__title--invert' : 'toast-item__title--default')}>
            {toast.title}
          </h4>
        )}
        {toast.description && (
          <p className={cn('toast-item__description', invert ? 'toast-item__description--invert' : 'toast-item__description--default')}>
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className={cn('toast-item__close', invert ? 'toast-item__close--invert' : 'toast-item__close--default')}
      >
        <FiX size={14} />
      </button>
    </motion.div>
  );
}

ToastProvider.displayName = 'ToastProvider';
