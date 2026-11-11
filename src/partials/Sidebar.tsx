import * as React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
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
  isActive?: (linkTo: string, currentPath: string) => boolean;
  searchable?: boolean;
}

export function Sidebar({
  sections,
  currentPath,
  onItemClick,
  isActive: customIsActive,
  searchable = false,
}: SidebarProps) {
  const [query, setQuery] = React.useState('');

  const checkIsActive = (linkTo: string) => {
    if (customIsActive) return customIsActive(linkTo, currentPath);
    return currentPath === linkTo;
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = React.useMemo(() => {
    if (!normalizedQuery) return sections;
    return sections
      .map((sec) => ({
        ...sec,
        links: sec.links.filter((link) => link.label.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((sec) => sec.links.length > 0);
  }, [sections, normalizedQuery]);

  return (
    <>
      {searchable && (
        <div className="mb-6">
          <div className="relative flex items-center">
            <FiSearch className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter components..."
              aria-label="Filter documentation links"
              className="w-full h-8 pl-8 pr-7 text-xs bg-input-bg text-input-fg border border-input-border ds-rounded-sm outline-none transition-colors focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="absolute right-2 p-0.5 rounded text-muted-foreground hover:text-foreground"
              >
                <FiX className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {filteredSections.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            No results for &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-xs font-medium text-primary hover:underline"
          >
            Clear filter
          </button>
        </div>
      ) : (
        filteredSections.map((section, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-3 px-3">
              {section.title}
            </h4>
            <nav className="flex flex-col gap-0.5">
              {section.links.map((link) => {
                const active = checkIsActive(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={link.disabled ? (e) => e.preventDefault() : onItemClick}
                    className={clsx(
                      "relative px-3 py-1.5 rounded-lg text-[13px] transition-colors duration-150 flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-muted text-foreground font-semibold dark:bg-muted/70"
                        : "text-muted-foreground font-medium hover:text-foreground hover:bg-muted/50",
                      link.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                    )}
                  >
                    <div className={clsx(
                      "shrink-0 transition-colors duration-150",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {link.icon}
                    </div>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))
      )}
    </>
  );
}
