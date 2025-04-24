
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
<<<<<<< HEAD
    <Card className="bg-white shadow-sm p-4 mb-6">
      <div className="flex flex-col items-center gap-4">
        <Logo 
          src={logo} 
          alt={logoAlt} 
          className={`h-${logoHeight}px`} 
          style={{ height: `${logoHeight}px` }} 
        />
        
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
            {title}
          </h1>
          
          {primaryStyle && (
            <h2 className="text-xl font-bold text-[#B89B7A] mt-2">
              
            
          )}
=======
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
>>>>>>> 1536c934da19267d874eb3db76aa0734c71d7cd9
        </div>
      </div>
    </header>
  );
};
