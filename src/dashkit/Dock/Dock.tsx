import * as React from "react";
import { cn } from "../utils/cn";

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** @default "bottom" */
  position?: "bottom" | "left" | "right";
}

/**
 * Compound floating macOS-style icon dock (`children` with `DockItem`).
 *
 * @example
 * ```tsx
 * <Dock>
 *   <DockItem label="Home" icon={<HomeIcon />} onClick={goHome} />
 * </Dock>
 * ```
 */
export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  function Dock({ children, className, position = "bottom", ...props }, ref) {
    const isVertical = position === "left" || position === "right";

    return (
      <div
        ref={ref}
        data-slot="dock"
        className={cn(
          "mx-auto flex gap-3 rounded-full ds-pill bg-ds-950/15 dark:bg-ds-0/10 backdrop-blur-lg p-2 border border-ds-950/5 dark:border-ds-0/10",
          isVertical ? "flex-col items-center" : "flex-row items-center",
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
