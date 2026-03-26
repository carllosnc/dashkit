import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { FiX, FiMenu } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';

export interface FloatActionMenuProps {
  /**
   * Icon to display in the floating button
   * @default <FiMenu />
   */
  icon?: React.ReactNode;
  /**
   * Label to display in the floating button
   */
  label?: string;
  /**
   * The content to display when the menu is expanded
   */
  children: React.ReactNode;
  /**
   * Position of the button on the screen
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * Additional classes for the container
   */
  className?: string;
  /**
   * Additional classes for the button
   */
  buttonClassName?: string;
  /**
   * Additional classes for the menu board
   */
  menuClassName?: string;
}

  const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6',
};

export function FloatActionMenu({
  icon = <FiMenu />,
  label,
  children,
  position = 'bottom-right',
  className,
  buttonClassName,
  menuClassName,
}: FloatActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
          'flex items-center gap-2.5 px-4 py-3 rounded-lg bg-linear-to-br from-primary to-blue-600 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] active:scale-95 transition-all cursor-pointer border border-white/10',
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
              'absolute bottom-0 right-0 w-[400px] max-w-[400px] min-h-[300px] bg-white dark:bg-ds-900 rounded-lg shadow-md border border-border dark:border-ds-800 overflow-hidden flex flex-col',
              menuClassName
            )}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 40, stiffness: 450 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100 || info.velocity.x > 500) {
                setIsOpen(false);
              }
            }}
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
