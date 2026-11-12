import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { FiX, FiMenu } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { useFloatActionMenu, type FloatActionPosition } from './useFloatActionMenu';

export interface FloatActionMenuProps {
  icon?: React.ReactNode;
  label?: string;
  variant?: 'neutral' | 'primary';
  children: React.ReactNode;
  position?: FloatActionPosition;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

export { type FloatActionPosition };

const POSITION_CLASSES: Record<FloatActionPosition, string> = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
};

const MENU_POSITION_CLASSES: Record<FloatActionPosition, string> = {
  'bottom-right': 'bottom-0 right-0 origin-bottom-right',
  'bottom-left': 'bottom-0 left-0 origin-bottom-left',
  'top-right': 'top-0 right-0 origin-top-right',
  'top-left': 'top-0 left-0 origin-top-left',
};

export function FloatActionMenu({
  icon = <FiMenu />,
  label,
  variant = 'neutral',
  children,
  position = 'bottom-right',
  className,
  buttonClassName,
  menuClassName,
}: FloatActionMenuProps) {
  const {
    isOpen,
    setIsOpen,
    menuRef,
    isRight,
    handleDragEnd,
  } = useFloatActionMenu({ position });

  const hasPosition = className?.includes('fixed') || className?.includes('absolute') || className?.includes('relative') || className?.includes('sticky');

  return (
    <div className={cn(
      'z-50',
      !hasPosition && 'fixed',
      POSITION_CLASSES[position],
      className
    )}>
      <motion.button
        key="fab"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2.5 px-4 py-3 ds-rounded active:scale-95 transition-all cursor-pointer relative z-10 shadow-lg',
          variant === 'primary'
            ? 'ds-primary-gradient text-primary-foreground hover:brightness-105 border border-transparent ds-button-surface'
            : 'bg-ds-900 text-ds-50 dark:bg-ds-100 dark:text-ds-950 hover:bg-ds-800 dark:hover:bg-ds-200 border border-border ds-button-surface',
          buttonClassName
        )}
      >
        <div className="flex items-center justify-center size-5">
          {icon}
        </div>
        {label && (
          <span className="font-medium text-sm tracking-tight">
            {label}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            ref={menuRef}
            className={cn(
              'absolute w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px] min-h-[300px] bg-card text-card-foreground ds-rounded shadow-2xl border border-border ds-border-width ds-card-shadow overflow-hidden flex flex-col z-20',
              MENU_POSITION_CLASSES[position],
              menuClassName
            )}
            initial={{ x: isRight ? 20 : -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRight ? 20 : -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 dark:border-ds-800">
                {label && (
                  <h3 className="font-medium text-foreground dark:text-ds-50 tracking-tight">
                    {label}
                  </h3>
                )}
                <IconButton
                  icon={<FiX />}
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="p-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

FloatActionMenu.displayName = 'FloatActionMenu';
