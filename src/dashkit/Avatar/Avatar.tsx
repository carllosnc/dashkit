import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

import './avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

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
          'avatar',
          `avatar--${size}`,
          `avatar--${shape}`,
          bordered && 'avatar--bordered',
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
            className="avatar__image"
          />
        )}

        <AnimatePresence mode="wait">
          {(!isLoaded || hasError || !src) && (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="avatar__fallback"
            >
              {fallback || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2) : '?')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

