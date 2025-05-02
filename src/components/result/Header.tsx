
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
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá, seu Estilo Predominante é:",
  primaryStyle,
  logoHeight = 80 // Aumentei o tamanho do logo para maior destaque
}) => {
  return (
    <Card className="bg-white shadow-sm p-6 mb-6"> {/* Aumentei o padding para p-6 */}
      <div className="flex flex-col items-center gap-5"> {/* Aumentei o gap para 5 */}
        <Logo 
          src={logo} 
          alt={logoAlt} 
          className="h-auto w-auto" 
          style={{
            height: `${logoHeight}px`,
            maxWidth: '100%'
          }} 
          priority={true} // Adicionado para priorizar o carregamento do logo
        />
        
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-playfair text-[#432818]">
            {title}
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
