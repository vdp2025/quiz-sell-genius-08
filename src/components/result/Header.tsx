
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  subtitle?: string;
  cta?: {
    text: string;
    url: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  logo = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt = "Logo Gisele Galvão",
  title = "Descubra seu Estilo",
  subtitle = "Transforme seu guarda-roupa com autoconhecimento",
  cta = {
    text: "Começar Agora",
    url: "#pricing"
  }
}) => {
  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src={logo} alt={logoAlt} className="h-12" />
          </div>
          <Button 
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
            onClick={() => window.location.href = cta.url}
          >
            {cta.text}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
