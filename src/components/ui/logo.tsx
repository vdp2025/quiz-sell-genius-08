
import React, { useState } from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  alt = "Logo Gisele Galvão",
  className = "h-14", 
  style,
  priority
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={style}
      >
        <span className="text-gray-500 font-playfair">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      width={style?.height ? Number(style.height) * 2.5 : 175} // Assuming aspect ratio of 2.5:1
      height={style?.height ? Number(style.height) : 70}
      onError={() => setHasError(true)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
};

export default Logo;
