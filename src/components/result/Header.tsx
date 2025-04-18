
import React from 'react';
import { Card } from '@/components/ui/card';
import Logo from '../ui/logo';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Olá, seu Estilo Predominante é:"
}) => {
  return (
    <Card className="bg-white shadow-sm p-6 mb-8">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-14 md:h-16" />
        <h1 className="text-2xl md:text-3xl font-playfair text-[#432818] text-center">
          {title}
        </h1>
      </div>
    </Card>
  );
};

