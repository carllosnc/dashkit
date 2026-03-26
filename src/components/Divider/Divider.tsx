import * as React from "react";
import { cn } from "../../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  variant?: "solid" | "dashed" | "dotted";
  contentPosition?: "left" | "center" | "right";
}

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
      "shrink-0 bg-border",
      variant === "dashed" && "bg-transparent border-dashed border-border",
      variant === "dotted" && "bg-transparent border-dotted border-border",
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
              variant === "solid" ? "h-[1px] bg-border" : "h-0 border-t border-border",
              variant === "dashed" && "border-dashed",
              variant === "dotted" && "border-dotted",
              contentPosition === "left" && "hidden"
            )}
          />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ds-400 select-none whitespace-nowrap">
            {children}
          </span>
          <div
            className={cn(
              "flex-1",
              variant === "solid" ? "h-[1px] bg-border" : "h-0 border-t border-border",
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
