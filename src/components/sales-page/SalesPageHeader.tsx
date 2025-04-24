
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '@/components/ui/logo';

interface SalesPageHeaderProps {
  title?: string;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
  logoHeight?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export const SalesPageHeader: React.FC<SalesPageHeaderProps> = ({
  title = "Descubra seu Estilo Único",
  subtitle = "E transforme sua imagem com consciência e propósito",
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  logoHeight = 56,
  backgroundColor = "white",
  textColor = "#432818",
  accentColor = "#B89B7A"
}) => {
  return (
    <Card className="bg-white shadow-sm p-4 mb-6" style={{ backgroundColor }}>
      <div className="flex flex-col items-center gap-4">
        <Logo 
          src={logo} 
          alt={logoAlt} 
          className={`h-${logoHeight}px`} 
          style={{ height: `${logoHeight}px` }} 
        />
        
        <div className="text-center">
          <h1 
            className="text-xl md:text-2xl font-playfair"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <h2 
              className="text-xl mt-2"
              style={{ color: accentColor }}
            >
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SalesPageHeader;
