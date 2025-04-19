
import React from 'react';
import { StyleResult } from '@/types/quiz';
import Logo from '../ui/logo';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  primaryStyle?: StyleResult;
  logoHeight?: number;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá, seu Estilo Predominante é:",
  primaryStyle,
  logoHeight = 56
}) => {
  return (
    <div className="bg-white border-b shadow-sm p-4 mb-4 text-center">
      <Logo className={`h-${logoHeight}px mx-auto mb-4`} style={{ height: `${logoHeight}px` }} />
      
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-playfair text-[#432818] mb-1">
          {title}
        </h1>
        
        {primaryStyle && (
          <h2 className="text-2xl font-bold text-[#B89B7A] mb-2">
            {primaryStyle.category}
          </h2>
        )}
      </div>
    </div>
  );
};
