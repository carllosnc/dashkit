import * as React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FiChevronsLeft, FiMenu } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { SidebarContext } from './SidebarContext';

/* ────────────────────────────────────────────────
   1. Root Sidebar component
──────────────────────────────────────────────── */
export interface SidebarProps extends
  Omit<HTMLMotionProps<'aside'>, 'children' | 'defaultValue'> {
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, collapsible = true, defaultOpen = true, open: controlledOpen, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const setIsOpen = React.useCallback(
      (value: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [controlledOpen, onOpenChange]
    );

    const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

    return (
      <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
        <motion.aside
          ref={ref as React.Ref<HTMLDivElement>}
          initial={false}
          animate={{
            width: isOpen ? 256 : 80
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          className={cn(
            "h-screen flex flex-col border-r border-border bg-card relative z-[40]",
            className
          )}
          {...props}
        >
          {children}
          {collapsible && (
            <IconButton
              variant="filled"
              icon={isOpen ? <FiChevronsLeft /> : <FiMenu />}
              onClick={toggle}
              rounded
              className={cn(
                "absolute -right-3 top-16 -translate-y-1/2 z-[60] size-6 shadow-md transition-transform hover:scale-110",
                !isOpen && "rotate-180"
              )}
            />
          )}
        </motion.aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = 'Sidebar';

/* ────────────────────────────────────────────────
   2. Header & Footer
──────────────────────────────────────────────── */
export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarHeader must be used within Sidebar');
  const { isOpen } = sidebarContext;

  return (
    <motion.div
      initial={false}
      animate={{
        paddingLeft: isOpen ? 24 : 0,
        paddingRight: isOpen ? 24 : 0,
        justifyContent: isOpen ? 'flex-start' : 'center'
      }}
      className={cn(
        "h-16 flex items-center shrink-0 border-b border-border/50 overflow-hidden", 
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function SidebarHeaderOpen({ children }: { children: React.ReactNode }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarHeaderOpen must be used within Sidebar');
  if (!sidebarContext.isOpen) return null;
  return <>{children}</>;
}

export function SidebarHeaderClose({ children }: { children: React.ReactNode }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarHeaderClose must be used within Sidebar');
  if (sidebarContext.isOpen) return null;
  return <>{children}</>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarFooter must be used within Sidebar');
  const { isOpen } = sidebarContext;

  return (
    <motion.div 
      initial={false}
      animate={{ 
        padding: 16,
        alignItems: isOpen ? 'stretch' : 'center'
      }}
      className={cn(
        "mt-auto shrink-0 border-t border-border/50 flex flex-col",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function SidebarFooterOpen({ children }: { children: React.ReactNode }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarFooterOpen must be used within Sidebar');
  if (!sidebarContext.isOpen) return null;
  return <>{children}</>;
}

export function SidebarFooterClose({ children }: { children: React.ReactNode }) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarFooterClose must be used within Sidebar');
  if (sidebarContext.isOpen) return null;
  return <>{children}</>;
}

/* ────────────────────────────────────────────────
   3. Sections and Items
──────────────────────────────────────────────── */
export function SidebarSection({ title, badge, children, className }: { title?: string; badge?: React.ReactNode; children: React.ReactNode; className?: string }) {
  const sidebarContext = React.useContext(SidebarContext);
  const isOpen = sidebarContext?.isOpen ?? true;

  return (
    <div className={cn("py-4", className)}>
      {title && (
        <div className="flex items-center justify-between overflow-hidden">
          <motion.h4 
            initial={false}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              height: isOpen ? 'auto' : 0,
              marginBottom: isOpen ? 8 : 0
            }}
            className={cn(
              "text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] truncate px-6",
            )}
          >
            {title}
          </motion.h4>

          {isOpen && badge && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 pb-2"
            >
              {badge}
            </motion.div>
          )}
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export interface SidebarItemProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon?: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
  badgeSlot?: React.ReactNode;
}

export function SidebarItem({ icon, active, children, badgeSlot, className, ...props }: SidebarItemProps) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarItem must be used within Sidebar');
  const { isOpen } = sidebarContext;

  return (
    <motion.button
      className={cn(
        "relative flex w-full items-center py-2.5 text-sm font-medium transition-all duration-150 outline-none group isolate",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
        isOpen ? "px-6 gap-3 text-left" : "px-0 justify-center text-center",
        className
      )}
      {...props}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary z-10"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 35
          }}
        />
      )}
      {icon && (
        <span className={cn(
          "shrink-0 transition-colors relative flex items-center justify-center",
          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {icon}
        </span>
      )}
      <motion.span
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? 'auto' : 0,
          marginLeft: isOpen ? 12 : 0
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "text-left truncate whitespace-nowrap",
          isOpen ? "flex-1" : "invisible w-0"
        )}
      >
        {children}
      </motion.span>

      {isOpen && badgeSlot && (
        <div className="ml-auto pointer-events-none origin-right transition-opacity duration-200">
          {badgeSlot}
        </div>
      )}
    </motion.button>
  );
}
