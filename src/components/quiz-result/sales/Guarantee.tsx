
import React from 'react';
import { Card } from '@/components/ui/card';

const Guarantee = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-[#ffefec] border-2 border-dashed border-[#aa6b5d] text-center">
        <p className="text-[#3a3a3a] font-semibold">
          ✨ Oferta exclusiva por tempo limitado. Depois desta página, o valor pode voltar ao original!
        </p>
      </Card>
      
      <img
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
        alt="Selo 7 dias de garantia"
        className="w-full rounded-lg"
      />
    </div>
  );
};

export default Guarantee;
