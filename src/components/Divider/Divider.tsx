import * as React from "react";
import { cn } from "../../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The orientation of the divider. Defaults to 'horizontal'. */
  orientation?: "horizontal" | "vertical";
  /** Optional text or content to display in the middle (horizontal only). */
  children?: React.ReactNode;
  /** The dash style of the line. Defaults to 'solid'. */
  variant?: "solid" | "dashed" | "dotted";
  /** Position of the content (horizontal only). Defaults to 'center'. */
  contentPosition?: "left" | "center" | "right";
}

/**
 * A highly versatile Divider component for separating content.
 * Supports horizontal/vertical orientation and embedded content.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      children,
      variant = "solid",
      contentPosition = "center",
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";
    const hasContent = isHorizontal && !!children;

    const baseStyles = cn(
      "shrink-0 ds-layout-divider",
      variant === "dashed" && "bg-transparent border-dashed ds-layout-divider-border",
      variant === "dotted" && "bg-transparent border-dotted ds-layout-divider-border",
      isHorizontal
        ? cn("w-full", variant === "solid" ? "h-[1px]" : "h-0 border-t")
        : cn("h-auto self-stretch", variant === "solid" ? "w-[1px]" : "w-0 border-l"),
      className
    );

    if (hasContent) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center w-full gap-4", className)}
          {...props}
        >
          <div
            className={cn(
              "flex-1",
              variant === "solid" ? "h-[1px] ds-layout-divider" : "h-0 border-t ds-layout-divider-border",
              variant === "dashed" && "border-dashed",
              variant === "dotted" && "border-dotted",
              contentPosition === "left" && "hidden"
            )}
          />
          <span className="text-[11px] font-bold uppercase tracking-widest text-base-400 select-none whitespace-nowrap">
            {children}
          </span>
          <div
            className={cn(
              "flex-1",
              variant === "solid" ? "h-[1px] ds-layout-divider" : "h-0 border-t ds-layout-divider-border",
              variant === "dashed" && "border-dashed",
              variant === "dotted" && "border-dotted",
              contentPosition === "right" && "hidden"
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={baseStyles}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
