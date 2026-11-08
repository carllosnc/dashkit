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
  width?: number;
  collapsedWidth?: number;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      children,
      collapsible = true,
      defaultOpen = true,
      open: controlledOpen,
      onOpenChange,
      width = 272,
      collapsedWidth = 72,
      ...props
    },
    ref
  ) => {
    const { isOpen, setIsOpen, toggle } = useSidebarState({ defaultOpen, open: controlledOpen, onOpenChange });

    // Memoized so consumers (SidebarHeader, SidebarItem, ...) don't re-render
    // on every parent render. setIsOpen was previously a no-op, so calling it
    // from useSidebar() silently did nothing.
    const contextValue = React.useMemo(
      () => ({ isOpen, setIsOpen, toggle }),
      [isOpen, setIsOpen, toggle]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <motion.aside
          ref={ref as React.Ref<HTMLDivElement>}
          initial={false}
          animate={{
            width: isOpen ? width : collapsedWidth
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
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-expanded={isOpen}
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
        paddingLeft: isOpen ? 16 : 0,
        paddingRight: isOpen ? 16 : 0,
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
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: isOpen ? 16 : 12,
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

export interface SidebarSubItemConfig {
  label: React.ReactNode;
  href?: string;
  target?: string;
  active?: boolean;
  onClick?: () => void;
  badgeSlot?: React.ReactNode;
  className?: string;
}

export interface SidebarSubItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  target?: string;
  badgeSlot?: React.ReactNode;
  className?: string;
}

export function SidebarSubItem({
  children,
  active,
  href,
  target,
  badgeSlot,
  className,
  onClick,
  ...props
}: SidebarSubItemProps) {
  const sharedClasses = cn(
    "sidebar__subitem",
    active && "sidebar__subitem--active",
    className
  );

  const content = (
    <>
      <span className="sidebar__subitem-text" title={typeof children === 'string' ? children : undefined}>
        {children}
      </span>
      {badgeSlot && (
        <span className="sidebar__subitem-badge">
          {badgeSlot}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        aria-current={active ? 'page' : undefined}
        className={sharedClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={sharedClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}

export function SidebarSubList({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;

  return (
    <div className={cn("sidebar__sublist", className)}>
      {children}
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
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  subItems?: SidebarSubItemConfig[];
}

export function SidebarItem({
  icon,
  active,
  children,
  badgeSlot,
  className,
  href,
  target,
  collapsible = false,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  subItems,
  onClick,
  ...props
}: SidebarItemProps) {
  const { isOpen } = useSidebar();
  const hasSubItems = Boolean((subItems && subItems.length > 0) || collapsible);

  const [isSubOpen, setIsSubOpen] = React.useState(defaultOpen);
  const isExpanded = controlledOpen !== undefined ? controlledOpen : isSubOpen;

  const handleToggleSub = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (hasSubItems) {
      const next = !isExpanded;
      if (controlledOpen === undefined) {
        setIsSubOpen(next);
      }
      onOpenChange?.(next);
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const sharedClasses = cn(
    "sidebar__item",
    active ? "sidebar__item--active" : "sidebar__item--inactive",
    isOpen ? "sidebar__item--open" : "sidebar__item--closed",
    className
  );

  const content = (
    <>
      {icon && (
        <span className="sidebar__item-icon">
          {icon}
        </span>
      )}
      {!isOpen && (
        <span className="sr-only">{children}</span>
      )}
      <motion.span
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.2 }}
        title={typeof children === 'string' ? children : undefined}
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

      {isOpen && hasSubItems && (
        <motion.span
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          className="sidebar__item-chevron"
        >
          <FiChevronDown size={15} />
        </motion.span>
      )}
    </>
  );

  const itemElement = href && !hasSubItems ? (
    <motion.a
      href={href}
      target={target}
      aria-current={active ? 'page' : undefined}
      className={sharedClasses}
      onClick={handleToggleSub as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      {...props as HTMLMotionProps<'a'>}
    >
      {content}
    </motion.a>
  ) : (
    <motion.button
      type="button"
      aria-current={active ? 'page' : undefined}
      aria-expanded={hasSubItems ? isExpanded : undefined}
      className={sharedClasses}
      onClick={handleToggleSub as unknown as React.MouseEventHandler<HTMLButtonElement>}
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

  if (hasSubItems && subItems && subItems.length > 0) {
    return (
      <div className="w-full">
        {itemElement}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <SidebarSubList>
                {subItems.map((sub, idx) => (
                  <SidebarSubItem
                    key={idx}
                    active={sub.active}
                    href={sub.href}
                    target={sub.target}
                    onClick={sub.onClick}
                    badgeSlot={sub.badgeSlot}
                    className={sub.className}
                  >
                    {sub.label}
                  </SidebarSubItem>
                ))}
              </SidebarSubList>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return itemElement;
}
