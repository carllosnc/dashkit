import * as React from "react";
import { cn } from "../utils/cn";

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: "bottom" | "left" | "right";
}

const DOCK_CONTAINER = "mx-auto flex gap-3 rounded-full bg-ds-950/15 dark:bg-ds-0/10 backdrop-blur-lg p-2 border border-ds-950/5 dark:border-ds-0/10";
const DOCK_HORIZONTAL = "flex-row items-center";
const DOCK_VERTICAL = "flex-col items-center";

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  function Dock({ children, className, position = "bottom", ...props }, ref) {
    const isVertical = position === "left" || position === "right";

    return (
      <div
        ref={ref}
        className={cn(
          DOCK_CONTAINER,
          isVertical ? DOCK_VERTICAL : DOCK_HORIZONTAL,
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
