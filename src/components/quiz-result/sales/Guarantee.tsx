
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Guarantee = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#ffefec] border-2 border-dashed border-[#aa6b5d]">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#aa6b5d]" />
          </div>
          <h3 className="text-xl font-playfair text-[#aa6b5d]">
            Garantia de 7 Dias
          </h3>
          <p className="text-[#3a3a3a] max-w-xl mx-auto">
            Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, 
            devolvemos seu dinheiro integralmente, sem burocracia.
          </p>
        </div>
      </Card>
      
      <Card className="p-4 bg-[#ffefec] border-2 border-dashed border-[#aa6b5d] text-center">
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
