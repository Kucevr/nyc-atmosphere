import React, { useState, useCallback, useMemo } from 'react';

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  priority?: boolean;
}

export const SmoothImage: React.FC<SmoothImageProps> = React.memo(({
  className = '', 
  containerClassName = '',
  alt,
  src,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    props.onLoad?.(e);
  }, [props]);

  // Generate paths for AVIF, WebP and Thumbnail
  const { avifSrc, webpSrc, thumbSrc } = useMemo(() => {
    if (!src || src.startsWith('http')) return { avifSrc: null, webpSrc: null, thumbSrc: null };
    
    const base = src.substring(0, src.lastIndexOf('.'));
    return {
      avifSrc: `${base}.avif`,
      webpSrc: `${base}.webp`,
      thumbSrc: `${base}-thumb.webp`
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-zinc-900/50 ${containerClassName || 'w-full h-full'}`}>
      {/* Blur-up Thumbnail */}
      {thumbSrc && !isLoaded && (
        <img 
          src={thumbSrc} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-50"
        />
      )}

      <picture className="w-full h-full block">
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          {...props}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          {...(priority ? { fetchPriority: "high" } : {})}
          onLoad={handleLoad}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-2xl scale-110'
          }`}
          style={{ 
            contentVisibility: 'auto',
          }}
        />
      </picture>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-zinc-900/20 animate-pulse pointer-events-none" />
      )}
    </div>
  );
});
