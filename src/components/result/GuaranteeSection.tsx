
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/4 flex justify-center">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
            alt="Garantia de 7 dias"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="md:w-3/4">
          <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">
            Garantia de 7 dias
          </h3>
          <p className="text-[#432818] mb-4">
            Você tem uma semana para acessar o conteúdo completo, testar e  
            aplicar. Se não fizer sentido pra você, devolvemos 100% do seu  
            investimento. Sem burocracia.
          </p>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-[#aa6b5d] mr-2" />
            <span className="text-[#432818] font-medium">
              Satisfação garantida ou seu dinheiro de volta
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GuaranteeSection;
