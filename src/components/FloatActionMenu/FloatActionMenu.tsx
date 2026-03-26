import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { FiX, FiMenu } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { useFloatActionMenu, type FloatActionPosition } from './useFloatActionMenu';

export interface FloatActionMenuProps {
  icon?: React.ReactNode;
  label?: string;
  children: React.ReactNode;
  position?: FloatActionPosition;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

export { type FloatActionPosition };

export function FloatActionMenu({
  icon = <FiMenu />,
  label,
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
    positionClasses,
    menuPositionClasses
  } = useFloatActionMenu({ position });

  const hasPosition = className?.includes('fixed') || className?.includes('absolute') || className?.includes('relative') || className?.includes('sticky');

  return (
    <div className={cn(
      'z-50',
      !hasPosition && 'fixed',
      positionClasses[position],
      className
    )}>
      <motion.button
        key="fab"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2.5 px-4 py-3 rounded-lg bg-linear-to-br from-primary to-blue-600 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] active:scale-95 transition-all cursor-pointer border border-white/10 relative z-10',
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
              'absolute w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px] min-h-[300px] bg-white dark:bg-ds-900 rounded-lg shadow-2xl border border-border dark:border-ds-800 overflow-hidden flex flex-col z-20',
              menuPositionClasses[position],
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
              <div className='p-4'>
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
