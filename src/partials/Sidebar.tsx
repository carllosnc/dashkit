import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface SidebarLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

interface SidebarProps {
  sections: SidebarSection[];
  currentPath: string;
  onItemClick?: () => void;
  layoutId?: string;
  /**
   * Optional custom logic to determine if a link is active.
   * If not provided, it uses an exact match.
   */
  isActive?: (linkTo: string, currentPath: string) => boolean;
}

export function Sidebar({ 
  sections, 
  currentPath, 
  onItemClick, 
  layoutId = "sidebar-active-item",
  isActive: customIsActive 
}: SidebarProps) {
  const checkIsActive = (linkTo: string) => {
    if (customIsActive) return customIsActive(linkTo, currentPath);
    return currentPath === linkTo;
  };

  return (
    <>
      {sections.map((section, idx) => (
        <div key={idx} className="mb-10 last:mb-0">
          <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {section.title}
          </h4>
          <nav className="flex flex-col gap-1">
            {section.links.map((link) => {
              const active = checkIsActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={link.disabled ? (e) => e.preventDefault() : onItemClick}
                  className={clsx(
                    "relative px-3 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-3",
                    active
                      ? "text-ds-50 font-semibold dark:text-ds-950"
                      : "text-ds-500 font-medium hover:text-ds-950 hover:bg-white dark:text-ds-400 dark:hover:text-white dark:hover:bg-white/5",
                    link.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-ds-500"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId={layoutId}
                      className="absolute inset-0 bg-ds-800 dark:bg-ds-0 dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-full"
                      transition={{ type: "spring", bounce: 0.0, duration: 0.6 }}
                    />
                  )}
                  <div className={clsx(
                    "shrink-0 transition-colors duration-200 relative z-10",
                    active
                      ? "text-ds-50 dark:text-ds-950"
                      : "text-ds-400 group-hover:text-ds-900 dark:text-ds-500 dark:group-hover:text-white"
                  )}>
                    {link.icon}
                  </div>
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </>
  );
}
