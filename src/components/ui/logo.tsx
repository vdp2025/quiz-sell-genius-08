
import React, { useState, useEffect } from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  fallbackText?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  alt = "Logo Gisele Galvão",
  className = "h-14", 
  style,
  priority = false,
  fallbackText
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Forcefully retry loading the image if it failed the first time
  useEffect(() => {
    if (hasError && src) {
      const retryTimeout = setTimeout(() => {
        // Reset error state to try loading again
        setHasError(false);
        // Create a new image with cache-busting query param
        const retryImg = new Image();
        retryImg.src = `${src}?retry=${new Date().getTime()}`;
        retryImg.onload = () => {
          setIsLoaded(true);
          setHasError(false);
        };
        retryImg.onerror = () => {
          console.error("Retry failed to load logo image");
          setHasError(true);
        };
      }, 1000); // Retry after 1 second
      
      return () => clearTimeout(retryTimeout);
    }
  }, [hasError, src]);

  // Pre-load image if priority is set
  useEffect(() => {
    if (priority && src && !isLoaded && !hasError) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        console.error("Failed to load logo image");
        setHasError(true);
      };
    }
  }, [src, priority, isLoaded, hasError]);

  // Fallback in case of error
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={style}
      >
        <span className="text-[#aa6b5d] font-playfair font-medium text-xl">
          {fallbackText || "Gisele Galvão"}
        </span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && priority && (
        <div className={`${className} bg-gray-100 animate-pulse rounded-md flex items-center justify-center`}>
          <span className="text-gray-400 text-sm">Carregando...</span>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} ${!isLoaded && priority ? 'hidden' : 'block'}`}
        style={style}
        width={style?.width ? Number(style.width) : undefined} 
        height={style?.height ? Number(style.height) : undefined}
        onError={() => {
          console.error("Failed to load logo image");
          setHasError(true);
        }}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </>
  );
};

export default Logo;
