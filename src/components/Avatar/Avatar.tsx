import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

const sizeMap: Record<AvatarSize, string> = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-16 text-xl'
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  bordered?: boolean;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', shape = 'circle', bordered = false, className, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(!src);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useLayoutEffect(() => {
      if (imgRef.current?.complete) {
        setIsLoaded(true);
      }
    }, [src]);

    React.useEffect(() => {
      setIsLoaded(false);
      setHasError(!src);
    }, [src]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-800",
          sizeMap[size],
          shape === 'circle' ? "rounded-full" : "rounded-lg",
          bordered && "ring-2 ring-white dark:ring-neutral-900 border border-neutral-200 dark:border-neutral-700",
          className
        )}
        {...props}
      >
        {src && !hasError && (
          <motion.img
            ref={imgRef}
            key={src}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            className="absolute inset-0 aspect-square h-full w-full object-cover"
          />
        )}

        <AnimatePresence>
          {(!isLoaded || hasError || !src) && (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full items-center justify-center font-bold text-neutral-500 uppercase select-none tracking-tighter"
            >
              {fallback || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2) : '?')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: '-space-x-1.5',
  md: '-space-x-3',
  lg: '-space-x-4'
};

export const AvatarGroup = ({ children, max, size = 'md', spacing = 'md', className, ...props }: AvatarGroupProps) => {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div className={cn("flex items-center", spacingMap[spacing], className)} {...props}>
      {visibleAvatars.map((child, i) => (
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
          size,
          bordered: true,
          style: { zIndex: childrenArray.length - i }
        }) : child
      ))}
      {remainingCount > 0 && (
        <Avatar
          fallback={`+${remainingCount}`}
          size={size}
          bordered
          className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 z-0 text-[10px]"
        />
      )}
    </div>
  );
};
AvatarGroup.displayName = 'AvatarGroup';
