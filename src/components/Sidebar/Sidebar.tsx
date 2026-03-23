import * as React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

/* ────────────────────────────────────────────────
   1. Root Sidebar component
──────────────────────────────────────────────── */
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  collapsible?: boolean;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "w-64 h-screen flex flex-col border-r border-border bg-card transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

/* ────────────────────────────────────────────────
   2. Header & Footer
──────────────────────────────────────────────── */
export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("h-16 flex items-center px-6 shrink-0 border-b border-border/50", className)}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-auto p-4 shrink-0 border-t border-border/50", className)}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────
   3. Sections and Items
──────────────────────────────────────────────── */
export function SidebarSection({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("py-4", className)}>
      {title && (
        <h4 className="px-6 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
          {title}
        </h4>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export interface SidebarSectionItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}

export function SidebarSectionItem({ icon, active, children, className, ...props }: SidebarSectionItemProps) {
  return (
    <button
      className={cn(
        "relative flex w-full items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all duration-200 outline-none group isolate",
        active 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
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
          "shrink-0 size-4 transition-colors",
          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {icon}
        </span>
      )}
      <span className="flex-1 text-left truncate">{children}</span>
    </button>
  );
}
