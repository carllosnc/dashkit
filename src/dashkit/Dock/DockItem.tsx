import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import "./dock.css";

export interface DockItemProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  /** @internal */
  position?: "bottom" | "left" | "right";
}

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

    const arrowPositionClass = cn(
      "dock-item__arrow",
      position === "bottom" && "dock-item__arrow--bottom",
      position === "left" && "dock-item__arrow--left",
      position === "right" && "dock-item__arrow--right"
    );

    const tooltipPositionClass = cn(
      "dock-item__tooltip",
      position === "bottom" && "dock-item__tooltip--top",
      position === "left" && "dock-item__tooltip--left",
      position === "right" && "dock-item__tooltip--right"
    );

    const content = (
      <>
        <div className="dock-item__icon">{icon}</div>
        <AnimatePresence>
          {label && isHovered && (
            <motion.span
              key="tooltip"
              variants={getTooltipVariants(position)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={tooltipPositionClass}
            >
              {label}
              <div className={arrowPositionClass} />
            </motion.span>
          )}
        </AnimatePresence>
      </>
    );

    const commonProps = {
      className: cn("dock-item", className),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: () => setIsHovered(true),
      onBlur: () => setIsHovered(false),
      whileHover: {
        scale: 1.15,
        y: position === "bottom" ? -4 : 0,
        x: position === "left" ? 4 : position === "right" ? -4 : 0,
      },
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
