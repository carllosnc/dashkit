import * as React from "react";
import { cn } from "../../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  variant?: "solid" | "dashed" | "dotted";
  contentPosition?: "left" | "center" | "right";
}

const LINE_BASE = "shrink-0 bg-border";
const LINE_VARIANT_DASHED = "bg-transparent border-dashed";
const LINE_VARIANT_DOTTED = "bg-transparent border-dotted";

const HORIZONTAL_LINE = "w-full";
const HORIZONTAL_SOLID = "h-[1px]";
const HORIZONTAL_NON_SOLID = "h-0 border-t";

const VERTICAL_LINE = "h-auto self-stretch";
const VERTICAL_SOLID = "w-[1px]";
const VERTICAL_NON_SOLID = "w-0 border-l";

const CONTENT_CONTAINER = "flex items-center w-full gap-4";
const CONTENT_TEXT = "text-[11px] font-bold uppercase tracking-widest text-ds-400 select-none whitespace-nowrap";
const FLEX_LINE = "flex-1";

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
      const lineStyles = cn(
        FLEX_LINE,
        variant === "solid" ? "h-[1px] bg-border" : "h-0 border-t",
        variant === "dashed" && "border-dashed",
        variant === "dotted" && "border-dotted"
      );

      return (
        <div
          ref={ref}
          className={cn(CONTENT_CONTAINER, className)}
          {...props}
        >
          <div className={cn(lineStyles, contentPosition === "left" && "hidden")} />
          <span className={CONTENT_TEXT}>
            {children}
          </span>
          <div className={cn(lineStyles, contentPosition === "right" && "hidden")} />
        </div>
      );
    }

    const baseStyles = cn(
      LINE_BASE,
      variant === "dashed" && LINE_VARIANT_DASHED,
      variant === "dotted" && LINE_VARIANT_DOTTED,
      isHorizontal
        ? cn(HORIZONTAL_LINE, variant === "solid" ? HORIZONTAL_SOLID : HORIZONTAL_NON_SOLID)
        : cn(VERTICAL_LINE, variant === "solid" ? VERTICAL_SOLID : VERTICAL_NON_SOLID),
      className
    );

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

