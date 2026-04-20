import * as React from "react";
import { cn } from "../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  variant?: "solid" | "dashed" | "dotted";
  contentPosition?: "left" | "center" | "right";
}

import './divider.css';

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    {
      orientation = "horizontal",
      children,
      variant = "solid",
      contentPosition = "center",
      className,
      ...props
    },
    ref
  ) {
    const isHorizontal = orientation === "horizontal";
    const hasContent = isHorizontal && !!children;

    if (hasContent) {
      return (
        <div
          ref={ref}
          className={cn(
            "divider",
            "divider--with-content",
            variant !== "solid" && `divider--${variant}`,
            className
          )}
          {...props}
        >
          <div className={cn("divider__line", contentPosition === "left" && "hidden")} />
          <span className="divider__content">
            {children}
          </span>
          <div className={cn("divider__line", contentPosition === "right" && "hidden")} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "divider",
          `divider--${orientation}`,
          variant !== "solid" && `divider--${variant}`,
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

