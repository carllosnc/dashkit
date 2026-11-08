import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { FiChevronsLeft, FiMenu, FiChevronDown, FiX } from 'react-icons/fi';
import { IconButton } from '../IconButton/IconButton';
import { Backdrop } from '../Backdrop/Backdrop';
import { lockBodyScroll } from '../utils/scrollLock';
import { SidebarContext, useSidebar } from './SidebarContext';
import { useSidebarState, type UseSidebarProps } from './useSidebar';
import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip/Tooltip';
import './sidebar.css';

export interface SidebarProviderProps extends UseSidebarProps {
  children: React.ReactNode;
}

export function SidebarProvider({
  children,
  defaultOpen,
  open,
  onOpenChange,
  defaultOpenMobile,
  openMobile,
  onOpenMobileChange,
  mobileBreakpoint,
}: SidebarProviderProps) {
  const state = useSidebarState({
    defaultOpen,
    open,
    onOpenChange,
    defaultOpenMobile,
    openMobile,
    onOpenMobileChange,
    mobileBreakpoint,
  });

  return (
    <SidebarContext.Provider value={state}>
      {children}
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends
  Omit<HTMLMotionProps<'aside'>, 'children' | 'defaultValue'> {
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number;
  collapsedWidth?: number;
  responsive?: boolean;
  defaultOpenMobile?: boolean;
  openMobile?: boolean;
  onOpenMobileChange?: (open: boolean) => void;
  mobileBreakpoint?: number;
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
      defaultOpenMobile = false,
      openMobile: controlledOpenMobile,
      onOpenMobileChange,
      width = 272,
      collapsedWidth = 72,
      responsive = true,
      mobileBreakpoint = 768,
      ...props
    },
    ref
  ) => {
    const parentContext = React.useContext(SidebarContext);

    const localState = useSidebarState({
      defaultOpen,
      open: controlledOpen,
      onOpenChange,
      defaultOpenMobile,
      openMobile: controlledOpenMobile,
      onOpenMobileChange,
      mobileBreakpoint,
    });

    const activeContext = parentContext ?? localState;
    const { isOpen, isMobile, openMobile, setOpenMobile, toggle } = activeContext;

    const isMobileMode = responsive && isMobile;

    React.useEffect(() => {
      if (!isMobileMode || !openMobile) return;
      return lockBodyScroll();
    }, [isMobileMode, openMobile]);

    React.useEffect(() => {
      if (!isMobileMode || !openMobile) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpenMobile(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMode, openMobile, setOpenMobile]);

    const desktopElement = (
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
    );

    const mobilePortal = isMobileMode && typeof document !== 'undefined' ? (
      createPortal(
        <AnimatePresence>
          {openMobile && (
            <div className="sidebar__portal">
              <Backdrop
                show={true}
                blur={true}
                fixed={false}
                onClick={() => setOpenMobile(false)}
              />
              <motion.aside
                ref={ref as React.Ref<HTMLDivElement>}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{
                  type: 'spring',
                  damping: 28,
                  stiffness: 300,
                }}
                className={cn("sidebar--mobile", className)}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation sidebar"
                {...props}
              >
                {children}
              </motion.aside>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )
    ) : null;

    const content = isMobileMode ? mobilePortal : desktopElement;

    if (parentContext) {
      return content;
    }

    return (
      <SidebarContext.Provider value={localState}>
        {content}
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger({ icon, size = 'sm', className, ...props }, ref) {
    const { toggle, isOpen, isMobile, openMobile } = useSidebar();
    const activeOpen = isMobile ? openMobile : isOpen;

    return (
      <IconButton
        ref={ref}
        variant="ghost"
        size={size}
        aria-label={activeOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={activeOpen}
        icon={icon ?? <FiMenu size={size === 'sm' ? 18 : 20} />}
        onClick={toggle}
        className={cn("sidebar__trigger", className)}
        {...props}
      />
    );
  }
);
SidebarTrigger.displayName = 'SidebarTrigger';

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SidebarContent({ children, className, ...props }: SidebarContentProps) {
  return (
    <div className={cn("sidebar__content", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, isMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <div className={cn("sidebar__header px-4 flex items-center justify-between", className)}>
        <div className="flex items-center min-w-0 flex-1">
          {children}
        </div>
        <IconButton
          variant="ghost"
          size="sm"
          icon={<FiX size={18} />}
          aria-label="Close navigation"
          onClick={() => setOpenMobile(false)}
          className="sidebar__mobile-close shrink-0 ml-2"
        />
      </div>
    );
  }

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
      <div className={cn("flex items-center min-w-0", isOpen ? "flex-1" : "justify-center w-full")}>
        {children}
      </div>
    </motion.div>
  );
}

export function SidebarHeaderOpen({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar();
  const show = isMobile ? true : isOpen;
  if (!show) return null;
  return <>{children}</>;
}

export function SidebarHeaderClose({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar();
  const show = isMobile ? false : !isOpen;
  if (!show) return null;
  return <>{children}</>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, isMobile } = useSidebar();
  const effectiveOpen = isMobile ? true : isOpen;

  return (
    <motion.div
      initial={false}
      animate={{
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: effectiveOpen ? 16 : 12,
        alignItems: effectiveOpen ? 'stretch' : 'center'
      }}
      className={cn("sidebar__footer", className)}
    >
      {children}
    </motion.div>
  );
}

export function SidebarFooterOpen({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar();
  const show = isMobile ? true : isOpen;
  if (!show) return null;
  return <>{children}</>;
}

export function SidebarFooterClose({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar();
  const show = isMobile ? false : !isOpen;
  if (!show) return null;
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
  const isMobile = sidebarContext?.isMobile ?? false;
  const isOpen = sidebarContext ? (isMobile ? true : sidebarContext.isOpen) : true;
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
  const sidebarContext = React.useContext(SidebarContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (sidebarContext?.isMobile) {
      sidebarContext.setOpenMobile(false);
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>)(e);
    }
  };

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
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
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
      onClick={handleClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      {...props}
    >
      {content}
    </button>
  );
}

export function SidebarSubList({ children, className }: { children: React.ReactNode; className?: string }) {
  const sidebarContext = React.useContext(SidebarContext);
  const isOpen = sidebarContext ? (sidebarContext.isMobile ? true : sidebarContext.isOpen) : true;
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
  const sidebarContext = React.useContext(SidebarContext);
  const isMobile = sidebarContext?.isMobile ?? false;
  const isOpen = sidebarContext?.isOpen ?? true;
  const effectiveOpen = isMobile ? true : isOpen;

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
    } else if (isMobile && sidebarContext) {
      sidebarContext.setOpenMobile(false);
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const sharedClasses = cn(
    "sidebar__item",
    active ? "sidebar__item--active" : "sidebar__item--inactive",
    effectiveOpen ? "sidebar__item--open" : "sidebar__item--closed",
    className
  );

  const content = (
    <>
      {icon && (
        <span className="sidebar__item-icon">
          {icon}
        </span>
      )}
      {!effectiveOpen && (
        <span className="sr-only">{children}</span>
      )}
      <motion.span
        initial={false}
        animate={{
          opacity: effectiveOpen ? 1 : 0,
          width: effectiveOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.2 }}
        title={typeof children === 'string' ? children : undefined}
        className={cn(
          "sidebar__item-text",
          effectiveOpen ? "sidebar__item-text--open" : "sidebar__item-text--closed"
        )}
      >
        {children}
      </motion.span>

      {effectiveOpen && badgeSlot && (
        <div className="sidebar__item-badge">
          {badgeSlot}
        </div>
      )}

      {effectiveOpen && hasSubItems && (
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

  if (!effectiveOpen) {
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
