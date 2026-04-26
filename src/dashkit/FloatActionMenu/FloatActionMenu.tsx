import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { FiX, FiMenu } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { useFloatActionMenu, type FloatActionPosition } from './useFloatActionMenu';
import './float-action-menu.css';

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
  } = useFloatActionMenu({ position });

  const hasPosition = className?.includes('fixed') || className?.includes('absolute') || className?.includes('relative') || className?.includes('sticky');

  return (
    <div className={cn(
      'float-action-menu',
      !hasPosition && 'float-action-menu--fixed',
      `float-action-menu--${position}`,
      className
    )}>
      <motion.button
        key="fab"
        onClick={() => setIsOpen(!isOpen)}
        className={cn('float-action-menu__button', buttonClassName)}
      >
        <div className="float-action-menu__icon">
          {icon}
        </div>
        {label && (
          <span className="float-action-menu__label">
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
              'float-action-menu__menu',
              `float-action-menu__menu--${position}`,
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
              <div className="float-action-menu__header">
                {label && (
                  <h3 className="float-action-menu__title">
                    {label}
                  </h3>
                )}
                <IconButton
                  icon={<FiX />}
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="float-action-menu__content">
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
