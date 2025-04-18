
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuiz } from '@/hooks/useQuiz';
import { Card } from '@/components/ui/card';

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
  const { primaryStyle } = useQuiz();

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full">
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
          
          {primaryStyle && (
            <Card className="w-full max-w-xl p-4 bg-[#ffefec] border-[#aa6b5d]/20">
              <div className="text-center">
                <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
                  Seu Estilo Predominante é {primaryStyle.category}
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-[#aa6b5d] h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${primaryStyle.percentage}%` }} 
                  />
                </div>
                <p className="text-sm text-[#432818] mt-2">
                  {primaryStyle.percentage}% de compatibilidade
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </header>
  );
};
