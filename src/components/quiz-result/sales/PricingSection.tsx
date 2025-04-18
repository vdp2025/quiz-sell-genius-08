
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock } from 'lucide-react';

const PricingSection = () => {
  return (
    <Card className="p-8 border-[#aa6b5d] border-2 bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2 text-[#aa6b5d]">
          <Clock className="w-5 h-5" />
          <p className="text-sm font-medium">Oferta por tempo limitado</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div>
            <p className="text-sm text-[#3a3a3a]/60 mb-1">De</p>
            <p className="text-2xl line-through text-[#3a3a3a]/60">R$ 175,00</p>
          </div>
          <div>
            <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
            <p className="text-4xl font-bold text-[#aa6b5d]">R$ 39,00</p>
          </div>
        </div>

        <Button 
          className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-8 rounded-md text-xl transition-colors duration-300"
          onClick={() => window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
        >
          <ShoppingCart className="w-6 h-6 mr-2" />
          Quero Transformar Meu Estilo Agora
        </Button>
      </div>
    </Card>
  );
};

export default PricingSection;
