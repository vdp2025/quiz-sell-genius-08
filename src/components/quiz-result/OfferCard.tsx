
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, GiftIcon, ArrowRight } from 'lucide-react';
import { StyleResult } from '@/types/quiz';

interface OfferCardProps {
  primaryStyle: StyleResult;
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle }) => (
  <>
    <Card className="p-3 md:p-6 border border-[#B89B7A] bg-white">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <div className="w-full md:w-1/3">
          <div className="bg-[#B89B7A]/10 rounded-lg p-4 md:p-6 flex justify-center">
            <GiftIcon className="w-16 h-16 md:w-24 md:h-24 text-[#B89B7A]" />
          </div>
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <h3 className="text-xl md:text-2xl font-playfair text-[#432818]">
            Guia Completo do Estilo {primaryStyle.category}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-[#B89B7A] font-bold">✓</span>
              <span>Melhores cores para seu subtom de pele</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B89B7A] font-bold">✓</span>
              <span>Peças essenciais para seu estilo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B89B7A] font-bold">✓</span>
              <span>Combinações perfeitas para diversas ocasiões</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B89B7A] font-bold">✓</span>
              <span>Dicas de acessórios e acabamentos</span>
            </li>
          </ul>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="line-through text-gray-500">R$ 97,00</div>
              <div className="text-2xl font-bold text-[#432818]">R$ 47,00</div>
            </div>
            <Button className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 py-6 rounded-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero Comprar Agora
            </Button>
          </div>
        </div>
      </div>
    </Card>

    <div className="text-center mt-6">
      <p className="text-[#1A1818]/80 mb-4">
        Aproveite esta oferta especial por tempo limitado!
      </p>
      <Button variant="outline" className="border-[#B89B7A] text-[#B89B7A]">
        Ver Mais Produtos
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </>
);

export default OfferCard;
