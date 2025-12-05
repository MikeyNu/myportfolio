import { useState, type ImgHTMLAttributes } from 'react';
import { cn } from '../ui/utils';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

/**
 * Shared image element that gracefully degrades when remote assets fail to load.
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc,
  ...rest
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setHasError(true);
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground text-xs uppercase tracking-wide',
          className
        )}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
