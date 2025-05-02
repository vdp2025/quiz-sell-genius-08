
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import BenefitList from './sales/BenefitList';
import Testimonials from './sales/Testimonials';
import Guarantee from './sales/Guarantee';
import Logo from '../ui/logo';
import { OfferContent } from '@/types/resultPageConfig';

interface OfferCardProps {
  primaryStyle: StyleResult;
  config: OfferContent;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle, config }) => {
  // Defaults com fallbacks para valores ausentes na configuração
  const title = config?.title || "Seu estilo foi revelado. Agora é hora da transformação.";
  const subtitle = config?.subtitle || `Você descobriu seu estilo ${primaryStyle.category}. Mas o verdadeiro poder dessa descoberta está no que você faz com ela. 🌟`;
  const regularPrice = config?.regularPrice || "175,00";
  const salePrice = config?.price || "39,00";
  const ctaText = config?.ctaText || `Quero meu Guia + Bônus por R$${salePrice}`;
  const ctaUrl = config?.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
  
  // Imagens com fallbacks
  const heroImage = config?.heroImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp";
  const productsImage = config?.allProductsImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp";
  const mentorImage = config?.mentorImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp";
  const bonusImage = config?.bonusImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp";
  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="space-y-6 bg-[#fffaf7] px-4 py-8 rounded-lg">
      <div className="text-center">
        <Logo className="h-20 mx-auto mb-8" priority={true} />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
          {title}
        </h2>
        <p className="text-[#3a3a3a]">
          {subtitle}
        </p>
      </div>

      <img
        src={heroImage}
        alt="Resultado do Quiz Visagismo"
        className="w-full rounded-lg mb-8 shadow-md"
        loading="eager"
        fetchpriority="high"
      />

      <Card className="p-6 border-[#aa6b5d]/20 bg-white">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          {config?.productTitle || "Guia de Estilo e Imagem + Bônus Exclusivos"}
        </h2>

        <img
          src={productsImage}
          alt="Todos os produtos e bônus mockup"
          className="w-full rounded-lg mb-6 shadow-md"
          loading="eager"
        />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#3a3a3a]/60 mb-1">Valor Total</p>
              <p className="text-lg line-through text-[#3a3a3a]/60">
                R$ {regularPrice}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">
                R$ {salePrice}
              </p>
              <p className="text-xs text-[#3a3a3a]/70">ou 4x de R$ 10,86</p>
            </div>
          </div>

          <Button 
            className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-md text-lg transition-colors duration-300"
            onClick={() => window.location.href = ctaUrl}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {ctaText}
          </Button>
        </div>
      </Card>

      <BenefitList />

      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={bonusImage}
          alt="Mockup celular peças-chave por dentro"
          className="w-full rounded-lg shadow-md"
          loading="lazy"
        />
        <img
          src={mentorImage}
          alt="Foto Gisele Galvão"
          className="w-full rounded-lg shadow-md"
          loading="lazy"
        />
      </div>

      <Testimonials />
      <Guarantee />
    </div>
  );
};

export default OfferCard;
