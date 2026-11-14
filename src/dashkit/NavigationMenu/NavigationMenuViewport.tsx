import { forwardRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';
import { useNavigationMenuViewport } from './useNavigationMenuViewport';

export type NavigationMenuViewportProps = Omit<HTMLMotionProps<'div'>, 'children'>;

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  function NavigationMenuViewport({ className, ...props }, ref) {
    const {
      activeValue,
      activeTrigger,
      contentMap,
      dimensions,
      x,
      setContentRef,
    } = useNavigationMenuViewport();

    return (
      <AnimatePresence>
        {activeValue && activeTrigger && (
          <div
            data-slot="navigation-menu-viewport-wrapper"
            className="absolute left-0 top-full flex justify-center w-full pointer-events-none z-[1000]"
            style={{ perspective: '2000px' }}
          >
            <motion.div
              ref={ref}
              data-slot="navigation-menu-viewport"
              initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                width: dimensions.width,
                height: dimensions.height,
                x
              }}
              exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.2 }
              }}
              className={cn(
                'relative mt-1 ds-rounded border border-popover-border bg-popover text-popover-fg shadow-2xl pointer-events-auto overflow-hidden',
                className
              )}
              {...props}
            >
              <div ref={setContentRef} className="w-max p-2 min-w-[300px]">
                {contentMap[activeValue]}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

NavigationMenuViewport.displayName = 'NavigationMenuViewport';
