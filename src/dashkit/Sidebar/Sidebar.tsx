import * as React from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FiChevronsLeft, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { SidebarContext } from './SidebarContext';
import { useSidebar } from './useSidebar';
import { AnimatePresence } from 'framer-motion';

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
    const { isOpen, toggle } = useSidebar({ defaultOpen, open: controlledOpen, onOpenChange });

    return (
      <SidebarContext.Provider value={{ isOpen, setIsOpen: () => {}, toggle }}>
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
            "h-screen flex flex-col border-r bg-card relative z-[40]",
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
                "absolute -right-3 top-16 -translate-y-1/2 z-[60] size-6 shadow-md",
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
        "h-16 flex items-center mb-[20px] shrink-0 border-b overflow-hidden",
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
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: isOpen ? 28 : 16,
        alignItems: isOpen ? 'stretch' : 'center'
      }}
      className={cn(
        "mt-auto shrink-0 border-t flex flex-col",
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

export interface SidebarSectionProps {
  title?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function SidebarSection({
  title,
  badge,
  children,
  className,
  collapsible = false,
  defaultOpen = true
}: SidebarSectionProps) {
  const sidebarContext = React.useContext(SidebarContext);
  const isOpen = sidebarContext?.isOpen ?? true;
  const [isSectionOpen, setIsSectionOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("text-ds-slate-900 dark:text-ds-slate-100", className)}>
      {title && isOpen && (
        <div className="overflow-hidden">
          <button
            type="button"
            onClick={() => collapsible && setIsSectionOpen(!isSectionOpen)}
            className={cn(
              "w-full flex items-center my-1 justify-between py-2 transition-all duration-200 outline-none",
              collapsible && "hover:bg-muted/50 cursor-pointer group/section",
              !collapsible && "cursor-default"
            )}
          >
            <h4
              className={cn(
                "text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] truncate px-4",
                collapsible && "group-hover/section:text-foreground transition-colors"
              )}
            >
              {title}
            </h4>

            <div className="px-2 flex items-center gap-2">
              {badge && (
                <div className="shrink-0">
                  {badge}
                </div>
              )}
              {collapsible && (
                <motion.div
                  animate={{ rotate: isSectionOpen ? 0 : -90 }}
                  className="text-muted-foreground group-hover/section:text-foreground transition-colors"
                >
                  <FiChevronDown size={14} />
                </motion.div>
              )}
            </div>
          </button>
        </div>
      )}
      <AnimatePresence initial={false}>
        {(isSectionOpen || !isOpen) && (
          <motion.div
            initial={collapsible ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-1 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface SidebarItemProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  icon?: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
  badgeSlot?: React.ReactNode;
  href?: string;
  target?: string;
}

import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip/Tooltip';

export function SidebarItem({ icon, active, children, badgeSlot, className, href, target, ...props }: SidebarItemProps) {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) throw new Error('SidebarItem must be used within Sidebar');
  const { isOpen } = sidebarContext;

  const sharedClasses = cn(
    "relative flex w-full items-center py-[8px] text-sm font-medium outline-none group isolate transition-all duration-200",
    active
      ? "text-primary"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
    isOpen ? "px-6 gap-3 text-left" : "px-0 justify-center text-center",
    className
  );

  const content = (
    <>
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
          "shrink-0 relative flex items-center justify-center",
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
        <div className="ml-auto pointer-events-none origin-right">
          {badgeSlot}
        </div>
      )}
    </>
  );

  const itemElement = href ? (
    <motion.a
      href={href}
      target={target}
      className={sharedClasses}
      {...props as HTMLMotionProps<'a'>}
    >
      {content}
    </motion.a>
  ) : (
    <motion.button
      type="button"
      className={sharedClasses}
      {...props as HTMLMotionProps<'button'>}
    >
      {content}
    </motion.button>
  );

  if (!isOpen) {
    return (
      <Tooltip className="block w-full">
        <TooltipTrigger asChild>
          {itemElement}
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={12}>
          {children}
        </TooltipContent>
      </Tooltip>
    );
  }

  return itemElement;
}
