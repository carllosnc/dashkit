import * as React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { Input } from '../dashkit/Input';
import { IconButton } from '../dashkit/IconButton';

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
          <Input
            size="sm"
            type="text"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter components..."
            aria-label="Filter documentation links"
            leftIcon={<FiSearch className="size-3.5" />}
            rightIcon={
              query ? (
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery('')}
                  aria-label="Clear filter"
                  className="pointer-events-auto size-5 -mr-1"
                  icon={<FiX className="size-3.5" />}
                />
              ) : undefined
            }
          />
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
