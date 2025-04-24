
import React from 'react';
import { StyleResult } from '@/types/quiz';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface SalesHeroProps {
  primaryStyle: StyleResult;
}

const SalesHero: React.FC<SalesHeroProps> = ({ primaryStyle }) => {
  return (
    <div className="text-center space-y-8">
      <Logo className="h-20 mx-auto" />

      <div>
        <h2 className="text-3xl md:text-4xl font-playfair text-[#aa6b5d] mb-3">
          VOCÊ DESCOBRIU SEU ESTILO
        </h2>
        <p className="text-xl text-[#432818]">
          Agora é hora de aplicar com clareza — e se vestir de você
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
          alt="Guia Completo de Estilo"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
          alt="Gisele Galvão"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="max-w-xl mx-auto">
        <Button 
          className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 text-lg rounded-md"
          onClick={() => window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Quero meu Guia + Bônus por R$39,00
        </Button>
      </div>
    </div>
  );
};

export default SalesHero;
