import * as React from 'react';
import { cn } from '../../utils/cn';
import { Badge, type BadgeProps } from './Badge';

export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

const FLOAT_ROOT = "relative inline-flex align-middle shrink-0";
const FLOAT_CONTAINER = "absolute z-10";

const POSITION_TOP_RIGHT = 'top-0 right-0 -translate-y-1/2 translate-x-1/2';
const POSITION_TOP_LEFT = 'top-0 left-0 -translate-y-1/2 -translate-x-1/2';
const POSITION_BOTTOM_RIGHT = 'bottom-0 right-0 translate-y-1/2 translate-x-1/2';
const POSITION_BOTTOM_LEFT = 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2';

const positionClasses: Record<BadgePosition, string> = {
  'top-right': POSITION_TOP_RIGHT,
  'top-left': POSITION_TOP_LEFT,
  'bottom-right': POSITION_BOTTOM_RIGHT,
  'bottom-left': POSITION_BOTTOM_LEFT
};

export interface FloatBadgeProps extends BadgeProps {
  children: React.ReactNode;
  position?: BadgePosition;
  offset?: [number, number];
}

export function FloatBadge({
  children,
  position = 'top-right',
  offset,
  className,
  ...props
}: FloatBadgeProps) {
  return (
    <div className={FLOAT_ROOT}>
      {children}
      <div
        className={cn(
          FLOAT_CONTAINER,
          positionClasses[position],
          props.dot && (
            position === 'top-right' ? "-translate-y-[50%] translate-x-[20%]" :
            position === 'top-left' ? "-translate-y-[50%] -translate-x-[20%]" :
            position === 'bottom-right' ? "translate-y-[10%] translate-x-[10%]" :
            "translate-y-[10%] -translate-x-[10%]"
          ),
          className
        )}
        style={{
          marginTop: offset ? offset[1] : undefined,
          marginRight: offset && (position === 'top-right' || position === 'bottom-right') ? -offset[0] : undefined,
          marginLeft: offset && (position === 'top-left' || position === 'bottom-left') ? offset[0] : undefined,
        }}
      >
        <Badge {...props} />
      </div>
    </div>
  );
}
