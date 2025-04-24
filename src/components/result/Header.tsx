
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Link } from 'react-router-dom';

interface HeaderProps {
  primaryStyle: StyleResult;
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
}

export const Header: React.FC<HeaderProps> = ({
  primaryStyle,
  logoHeight = 60,
  logo = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
  logoAlt = 'Logo do Quiz de Estilo'
}) => {
  return (
    <header className="bg-white py-4 px-6 border-b border-[#B89B7A]/20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt={logoAlt}
            className="h-auto"
            style={{ maxHeight: `${logoHeight}px` }}
          />
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[#432818] font-medium">Seu estilo é:</span>
          <span className="px-3 py-1 bg-[#B89B7A]/10 rounded-full text-[#B89B7A] font-medium">
            {primaryStyle.category}
          </span>
        </div>
      </div>
    </header>
  );
};
