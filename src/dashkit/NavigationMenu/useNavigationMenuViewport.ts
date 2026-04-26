import * as React from 'react';
import { useNavigationMenuContext } from './NavigationMenuContext';

export function useNavigationMenuViewport() {
  const { activeValue, triggerRects, contentMap, menuRect } = useNavigationMenuContext();
  const [contentRef, setContentRef] = React.useState<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (contentRef) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });
      resizeObserver.observe(contentRef);
      return () => resizeObserver.disconnect();
    }
  }, [contentRef]);

  const activeTrigger = activeValue ? triggerRects[activeValue] : null;

  let x = 0;
  if (activeTrigger && menuRect) {
    x = activeTrigger.left - menuRect.left + activeTrigger.width / 2 - menuRect.width / 2;
  }

  return {
    activeValue,
    activeTrigger,
    contentMap,
    dimensions,
    x,
    setContentRef,
  };
}
