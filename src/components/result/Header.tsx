
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '../ui/logo';
import { StyleResult } from '@/types/quiz';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  primaryStyle?: StyleResult;
  logoHeight?: number;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá",
  primaryStyle,
  logoHeight = 80,
  userName
}) => {
  // Display user's name if available, otherwise default greeting
  const displayTitle = userName ? `${title}, ${userName}! Seu Estilo Predominante é:` : `${title} Seu Estilo Predominante é:`;

  return (
    <Card className="bg-white shadow-sm p-6 mb-6">
      <div className="flex flex-col items-center gap-5">
        <Logo 
          src={logo} 
          alt={logoAlt} 
          className="h-auto w-auto" 
          style={{
            height: `${logoHeight}px`,
            maxWidth: '100%'
          }}
          priority={true}
        />
        
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
            {displayTitle}
          </h1>
          
          {primaryStyle && (
            <h2 className="font-bold text-[#B89B7A] mt-2 text-2xl">
              {primaryStyle.category}
            </h2>
          )}
        </div>
      </div>
    </Card>
  );
};
