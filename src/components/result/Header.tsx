
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '../ui/logo';
import { StyleResult } from '@/types/quiz';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  primaryStyle?: StyleResult;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá, seu Estilo Predominante é:",
  primaryStyle
}) => {
  return (
    <Card className="bg-white shadow-sm p-6 mb-8">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-14 md:h-16" />
        
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-playfair text-[#432818]">
            {title}
          </h1>
          
          {primaryStyle && (
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#B89B7A]">
                {primaryStyle.category}
              </h2>
              <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between text-sm text-[#432818] mb-1">
                  <span>Compatibilidade</span>
                  <span>{primaryStyle.percentage}%</span>
                </div>
                <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                  <div 
                    className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${primaryStyle.percentage}%` }} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
