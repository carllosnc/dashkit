import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export interface DockItemProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  /** @internal */
  position?: "bottom" | "left" | "right";
}

const ITEM_BASE = "group relative flex size-10 items-center justify-center rounded-full bg-white text-ds-800 dark:bg-ds-950 dark:text-ds-200 shadow-sm shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ds-400";
const ITEM_ICON = "flex size-full items-center justify-center [&>svg]:size-5 text-current leading-none";

const TOOLTIP_BASE = "absolute pointer-events-none bg-ds-950 px-2 py-1 text-[10px] font-bold text-ds-0 dark:bg-ds-0 dark:text-ds-950 border border-ds-800 dark:border-ds-200 rounded-md whitespace-nowrap z-[100]";
const TOOLTIP_ARROW = "absolute size-1.5 rotate-45 bg-ds-950 dark:bg-ds-0 border-ds-800 dark:border-ds-200";

const getTooltipVariants = (position: string) => {
  switch (position) {
    case "bottom":
      return {
        initial: { opacity: 0, scale: 0.9, y: 10, x: "-50%" },
        animate: { opacity: 1, scale: 1, y: 0, x: "-50%" },
        exit: { opacity: 0, scale: 0.9, y: 10, x: "-50%" },
      };
    case "left":
      return {
        initial: { opacity: 0, scale: 0.9, x: -10, y: "-50%" },
        animate: { opacity: 1, scale: 1, x: 0, y: "-50%" },
        exit: { opacity: 0, scale: 0.9, x: -10, y: "-50%" },
      };
    case "right":
      return {
        initial: { opacity: 0, scale: 0.9, x: 10, y: "-50%" },
        animate: { opacity: 1, scale: 1, x: 0, y: "-50%" },
        exit: { opacity: 0, scale: 0.9, x: 10, y: "-50%" },
      };
    default:
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
      };
  }
};

export const DockItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, DockItemProps>(
  function DockItem({ icon, label, onClick, href, className, position = "bottom" }, ref) {
    const [isHovered, setIsHovered] = React.useState(false);

    const arrowPosition = cn(
      position === "bottom" && "bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r",
      position === "left" && "left-[-4px] top-1/2 -translate-y-1/2 border-b border-l",
      position === "right" && "right-[-4px] top-1/2 -translate-y-1/2 border-t border-r"
    );

    const tooltipPosition = cn(
      position === "bottom" && "-top-12 left-1/2",
      position === "left" && "left-14 top-1/2",
      position === "right" && "right-14 top-1/2"
    );

    const content = (
      <>
        <div className={ITEM_ICON}>{icon}</div>
        <AnimatePresence>
          {label && isHovered && (
            <motion.span
              variants={getTooltipVariants(position)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(TOOLTIP_BASE, tooltipPosition)}
            >
              {label}
              <div className={cn(TOOLTIP_ARROW, arrowPosition)} />
            </motion.span>
          )}
        </AnimatePresence>
      </>
    );

    const commonProps = {
      className: cn(ITEM_BASE, className),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: () => setIsHovered(true),
      onBlur: () => setIsHovered(false),
      whileHover: {
        scale: 1.15,
        y: position === "bottom" ? -4 : 0,
        x: position === "left" ? 4 : position === "right" ? -4 : 0,
      },
      whileTap: { scale: 0.95 },
    };

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...commonProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </motion.button>
    );
  }
);

DockItem.displayName = "DockItem";
