
import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { ShoppingCart } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import BenefitList from './BenefitList';
import Testimonials from './Testimonials';
import Guarantee from './Guarantee';

interface OfferCardProps {
  primaryStyle: StyleResult;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle }) => (
  <div className="space-y-6 bg-[#fffaf7] px-4 py-8 rounded-lg">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
        Seu estilo foi revelado. Agora é hora da transformação.
      </h2>
      <p className="text-[#3a3a3a]">
        Você descobriu seu estilo {primaryStyle.category}. Mas o verdadeiro poder dessa descoberta está no que você faz com ela. 🌟
      </p>
    </div>

    <div className="space-y-6">
      <img
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
        alt="Resultado do Quiz Visagismo"
        className="w-full rounded-lg shadow-md"
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
              <p className="text-lg line-through text-[#3a3a3a]/60">R$ 175,00</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
              <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
            </div>
          </div>

          <Button 
            className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-md text-lg transition-colors duration-300"
            onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Quero meu Guia + Bônus por R$39,00
          </Button>
        </div>
      </Card>

      <BenefitList />
      
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
          alt="Mockup celular peças-chave por dentro"
          className="w-full rounded-lg shadow-md"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
          alt="Foto Gisele Galvão"
          className="w-full rounded-lg shadow-md object-cover"
        />
      </div>
      
      <Testimonials />
      <Guarantee />
    </div>
  </div>
);

export default OfferCard;
