
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
 <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
  <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>

  {/* Mockup do produto */}
  <div className="w-full mb-4">
    <img
      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
      alt="Mockup dos produtos digitais"
      className="w-full h-auto rounded-lg shadow-md mx-auto"
      loading="lazy"
    />
  </div>

  {/* Lista de valores dos itens */}
  <div className="space-y-3 mb-6">
    <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
      <span>Guia Principal</span>
      <span className="font-medium">R$ 67,00</span>
    </div>
    <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
      <span>Bônus - Peças-chave</span>
      <span className="font-medium">R$ 79,00</span>
    </div>
    <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
      <span>Bônus - Visagismo Facial</span>
      <span className="font-medium">R$ 29,00</span>
    </div>
    <div className="flex justify-between items-center p-2 pt-3 font-bold">
      <span>Valor Total</span>
      <div className="relative">
        <span>R$ 175,00</span>
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
      </div>
    </div>
  </div>

  {/* Preço com destaque final */}
  <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
    <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
    <p className="text-4xl font-bold gold-text">R$ 39,00</p>
    <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único ou 4x de R$ 10,86</p>
  </div>
</div>
  );
};

export default OfferCard;
