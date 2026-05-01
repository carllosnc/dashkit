import * as React from 'react';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FiChevronsLeft, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { SidebarContext, useSidebar } from './SidebarContext';
import { useSidebarState } from './useSidebar';
import { AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip/Tooltip';
import './sidebar.css';

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
    const { isOpen, toggle } = useSidebarState({ defaultOpen, open: controlledOpen, onOpenChange });

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
          className={cn("sidebar", className)}
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
                "sidebar__toggle",
                !isOpen && "sidebar__toggle--closed"
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
  const { isOpen } = useSidebar();

  return (
    <motion.div
      initial={false}
      animate={{
        paddingLeft: isOpen ? 24 : 0,
        paddingRight: isOpen ? 24 : 0,
        justifyContent: isOpen ? 'flex-start' : 'center'
      }}
      className={cn("sidebar__header", className)}
    >
      {children}
    </motion.div>
  );
}

export function SidebarHeaderOpen({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;
  return <>{children}</>;
}

export function SidebarHeaderClose({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  if (isOpen) return null;
  return <>{children}</>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen } = useSidebar();

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
      className={cn("sidebar__footer", className)}
    >
      {children}
    </motion.div>
  );
}

export function SidebarFooterOpen({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;
  return <>{children}</>;
}

export function SidebarFooterClose({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  if (isOpen) return null;
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
    <div className={cn("sidebar__section", className)}>
      {title && isOpen && (
        <div className="overflow-hidden">
          <button
            type="button"
            onClick={() => collapsible && setIsSectionOpen(!isSectionOpen)}
            className={cn(
              "sidebar__section-button",
              collapsible ? "sidebar__section-button--collapsible" : "sidebar__section-button--static"
            )}
          >
            <h4 className="sidebar__section-title">
              {title}
            </h4>

            <div className="sidebar__section-badge-container">
              {badge && (
                <div className="shrink-0">
                  {badge}
                </div>
              )}
              {collapsible && (
                <motion.div
                  animate={{ rotate: isSectionOpen ? 0 : -90 }}
                  className="sidebar__section-chevron"
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
            className="sidebar__section-content"
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

export function SidebarItem({ icon, active, children, badgeSlot, className, href, target, ...props }: SidebarItemProps) {
  const { isOpen } = useSidebar();

  const sharedClasses = cn(
    "sidebar__item",
    active ? "sidebar__item--active" : "sidebar__item--inactive",
    isOpen ? "sidebar__item--open" : "sidebar__item--closed",
    className
  );

  const content = (
    <>
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="sidebar__item-indicator"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 35
          }}
        />
      )}
      {icon && (
        <span className="sidebar__item-icon">
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
          "sidebar__item-text",
          isOpen ? "sidebar__item-text--open" : "sidebar__item-text--closed"
        )}
      >
        {children}
      </motion.span>

      {isOpen && badgeSlot && (
        <div className="sidebar__item-badge">
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
