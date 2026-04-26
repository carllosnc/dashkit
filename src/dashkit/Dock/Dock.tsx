import * as React from "react";
import { cn } from "../utils/cn";
import "./dock.css";

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: "bottom" | "left" | "right";
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  function Dock({ children, className, position = "bottom", ...props }, ref) {
    const isVertical = position === "left" || position === "right";

    return (
      <div
        ref={ref}
        className={cn(
          "dock",
          isVertical ? "dock--vertical" : "dock--horizontal",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<{ position?: DockProps["position"] }>(child)) {
            return React.cloneElement(child, {
              position,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

Dock.displayName = "Dock";

export { DockItem } from "./DockItem";
export type { DockItemProps } from "./DockItem";
