
import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png",
  alt = "Logo Gisele Galvão",
  className = "h-14", 
  style 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export default Logo;
