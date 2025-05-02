
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import BenefitList from './sales/BenefitList';
import Testimonials from './sales/Testimonials';
import Guarantee from './sales/Guarantee';
import Logo from '../ui/logo';
import { OfferContent } from '@/types/resultPageConfig';
import PricingSection from './sales/PricingSection';

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
  
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({
    hero: false,
    products: false,
    bonus: false,
    mentor: false,
    logo: false
  });
  
  const handleImageError = (key: string) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
    console.error(`Failed to load ${key} image`);
  };
  
  return (
    <div className="space-y-6 bg-[#fffaf7] px-4 py-8 rounded-lg">
      <div className="text-center">
        <Logo 
          className="h-20 mx-auto mb-8" 
          priority={true} 
          fallbackText="Gisele Galvão"
        />
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
        fetchPriority="high"
        onError={() => handleImageError('hero')}
      />

      <Card className="p-6 border-[#aa6b5d]/20 bg-white">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4 text-center">
          {config?.productTitle || "Guia de Estilo e Imagem + Bônus Exclusivos"}
        </h2>

        <img
          src={productsImage}
          alt="Todos os produtos e bônus mockup"
          className="w-full rounded-lg mb-6 shadow-md"
          loading="eager"
          onError={() => handleImageError('products')}
        />

        {/* Preço estratégico usando PricingSection */}
        <PricingSection 
          price={salePrice}
          regularPrice={regularPrice}
          ctaText={ctaText}
          ctaUrl={ctaUrl}
        />
      </Card>

      <BenefitList />

      {/* Mostrar apenas 1 imagem por linha para aumentar o tamanho */}
      <div className="space-y-6">
        <Card className="overflow-hidden rounded-lg shadow-md p-4 bg-white">
          <h3 className="text-xl font-playfair text-[#aa6b5d] mb-3 text-center">
            Bônus Exclusivo: Guia de Peças-Chave
          </h3>
          <img
            src={bonusImage}
            alt="Guia de Peças-Chave por Estilo"
            className="w-full rounded-lg shadow-sm object-cover max-h-[400px]"
            loading="lazy"
            onError={() => handleImageError('bonus')}
          />
        </Card>
        
        <Card className="overflow-hidden rounded-lg shadow-md p-4 bg-white">
          <h3 className="text-xl font-playfair text-[#aa6b5d] mb-3 text-center">
            Sua Mentora de Estilo
          </h3>
          <img
            src={mentorImage}
            alt="Foto Gisele Galvão"
            className="w-full rounded-lg shadow-sm object-cover max-h-[400px]"
            loading="lazy"
            onError={() => handleImageError('mentor')}
          />
        </Card>
      </div>

      <Testimonials />
      <Guarantee />
    </div>
  );
};

export default OfferCard;
