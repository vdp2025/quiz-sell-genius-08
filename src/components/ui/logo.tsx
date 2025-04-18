
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-14" }) => {
  return (
    <img
      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png"
      alt="Logo Gisele Galvão"
      className={className}
    />
  );
};

export default Logo;
