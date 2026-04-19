import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

const SIZE_XS = 'size-6 text-[10px]';
const SIZE_SM = 'size-8 text-xs';
const SIZE_MD = 'size-10 text-sm';
const SIZE_LG = 'size-12 text-base';
const SIZE_XL = 'size-16 text-xl';

const sizeMap: Record<AvatarSize, string> = {
  xs: SIZE_XS,
  sm: SIZE_SM,
  md: SIZE_MD,
  lg: SIZE_LG,
  xl: SIZE_XL
};

const AVATAR_ROOT = "relative flex shrink-0 items-center justify-center overflow-hidden bg-ds-100 dark:bg-ds-800";
const IMAGE_STYLE = "absolute inset-0 aspect-square h-full w-full object-cover";
const FALLBACK_STYLE = "flex h-full w-full items-center justify-center font-bold text-ds-500 uppercase select-none tracking-tighter";
const BORDER_STYLE = "ring-2 ring-background border border-ds-border dark:border-ds-dark-border";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  bordered?: boolean;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, alt, fallback, size = 'md', shape = 'circle', bordered = false, className, ...props }, ref) {
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
          AVATAR_ROOT,
          sizeMap[size],
          shape === 'circle' ? "rounded-full" : "rounded-lg",
          bordered && BORDER_STYLE,
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
            className={IMAGE_STYLE}
          />
        )}

        <AnimatePresence mode="wait">
          {(!isLoaded || hasError || !src) && (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={FALLBACK_STYLE}
            >
              {fallback || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2) : '?')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

