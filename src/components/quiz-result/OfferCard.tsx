
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, Clock } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import BenefitList from './sales/BenefitList';
import Testimonials from './sales/Testimonials';
import Guarantee from './sales/Guarantee';

interface OfferCardProps {
  primaryStyle: StyleResult;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle }) => (
  <div className="space-y-6">
    <Card className="p-6 border border-[#B89B7A] bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-3">
          Guia Completo do Estilo {primaryStyle.category}
        </h2>
        <p className="text-[#1A1818]/80 max-w-2xl mx-auto">
          Descubra como expressar sua verdadeira essência através do seu estilo pessoal
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
        <div className="text-center md:text-right">
          <p className="text-sm text-[#1A1818]/60 mb-1">Preço normal</p>
          <p className="text-lg line-through text-[#1A1818]/60">R$ 97,00</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#B89B7A] mb-1">Oferta especial</p>
          <p className="text-3xl font-bold text-[#432818]">R$ 47,00</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6 text-[#B89B7A]">
        <Clock className="w-5 h-5" />
        <span className="text-sm">Oferta por tempo limitado</span>
      </div>

      <Button 
        className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 py-6 rounded-full text-lg"
        onClick={() => window.location.href = "https://pay.hotmart.com/"}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Quero Garantir Minha Vaga
      </Button>
    </Card>

    <BenefitList />
    <Testimonials />
    <Guarantee />
  </div>
);

export default OfferCard;
