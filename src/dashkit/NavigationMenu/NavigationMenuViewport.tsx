import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useNavigationMenuViewport } from './useNavigationMenuViewport';

export function NavigationMenuViewport({ className }: { className?: string }) {
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
          className="absolute left-0 top-full flex justify-center w-full pointer-events-none z-[1000]"
          style={{ perspective: '2000px' }}
        >
          <motion.div
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
              'relative mt-1 ds-rounded border border-ds-200 bg-ds-50 text-ds-950 shadow-2xl pointer-events-auto overflow-hidden dark:bg-ds-900 dark:text-ds-50 dark:border-ds-800',
              className
            )}
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
