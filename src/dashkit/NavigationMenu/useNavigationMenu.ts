import * as React from 'react';

export function useNavigationMenu() {
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const [triggerRects, setTriggerRects] = React.useState<Record<string, DOMRect>>({});
  const [contentMap, setContentMap] = React.useState<Record<string, React.ReactNode>>({});
  const [menuRect, setMenuRect] = React.useState<DOMRect | null>(null);
  const menuRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (menuRef.current) {
      setMenuRect(menuRef.current.getBoundingClientRect());
    }
  }, []);

  const handleSetTriggerRect = React.useCallback((val: string, rect: DOMRect) => {
    setTriggerRects(prev => {
      if (prev[val]?.left === rect.left && prev[val]?.width === rect.width) return prev;
      return { ...prev, [val]: rect };
    });
  }, []);

  const handleRegisterContent = React.useCallback((val: string, node: React.ReactNode) => {
    setContentMap(prev => ({ ...prev, [val]: node }));
  }, []);

  const handleValueChange = React.useCallback((val: string | null) => {
    setActiveValue(val);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveValue(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveValue(null);
      }
    };

    if (activeValue) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeValue]);

  return {
    activeValue,
    setActiveValue: handleValueChange,
    triggerRects,
    setTriggerRect: handleSetTriggerRect,
    registerContent: handleRegisterContent,
    contentMap,
    menuRect,
    menuRef,
  };
}
