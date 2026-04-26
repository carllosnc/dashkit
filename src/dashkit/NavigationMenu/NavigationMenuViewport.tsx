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
          className="navigation-menu__viewport-wrapper"
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
            className={cn('navigation-menu__viewport', className)}
          >
            <div ref={setContentRef} className="navigation-menu__viewport-content">
              {contentMap[activeValue]}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
