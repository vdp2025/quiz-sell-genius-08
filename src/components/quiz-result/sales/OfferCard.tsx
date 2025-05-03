
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import BenefitList from './BenefitList';
import Testimonials from './Testimonials';
import Guarantee from './Guarantee';
import Logo from '../../ui/logo';
import { OfferContent } from '@/types/resultPageConfig';

interface OfferCardProps {
  primaryStyle: StyleResult;
  config?: OfferContent;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle, config = {} }) => {
  const defaultConfig = {
    title: "VOCÊ DESCOBRIU SEU ESTILO",
    subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
    price: "39,00",
    regularPrice: "175,00",
    ctaText: "Quero meu Guia + Bônus por R$39,00",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
    heroImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
    heroImage2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
  };

  const finalConfig = {
    ...defaultConfig,
    ...config
  };

  return (
 <div className="space-y-6 bg-[#fffaf7] px-4 py-8 rounded-lg">
      <div className="text-center">
        <Logo className="h-20 mx-auto mb-8" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
          {finalConfig.title}
        </h2>
        <p className="text-[#3a3a3a]">
          {finalConfig.subtitle}
        </p>
      </div>

      <img
        src={finalConfig.heroImage}
        alt="Resultado do Quiz Visagismo"
        className="w-full rounded-lg mb-8"
      />

      <Card className="p-6 border-[#aa6b5d]/20 bg-white">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          Guia de Estilo e Imagem + Bônus Exclusivos
        </h2>

        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
          alt="Todos os produtos e bônus mockup"
          className="w-full rounded-lg mb-6"
        />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#3a3a3a]/60 mb-1">Valor Total</p>
              <p className="text-lg line-through text-[#3a3a3a]/60">
                R$ {finalConfig.regularPrice}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">
                R$ {finalConfig.price}
              </p>
            </div>
          </div>

          <Button 
            className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-md text-lg transition-colors duration-300"
            onClick={() => window.location.href = finalConfig.ctaUrl}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {finalConfig.ctaText}
          </Button>
        </div>
      </Card>

      <BenefitList />

      <div className="grid md:grid-cols-2 gap-6">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
          alt="Mockup celular peças-chave por dentro"
          className="w-full rounded-lg"
        />
        <img
          src={finalConfig.heroImage2}
          alt="Foto Gisele Galvão"
          className="w-full rounded-lg"
        />
      </div>

      <img
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
        alt="Imagem adicional bônus"
        className="w-full rounded-lg"
      />

      <Testimonials />
      <Guarantee />
    </div>
  );
};

export default OfferCard;
