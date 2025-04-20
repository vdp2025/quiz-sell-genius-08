
import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

interface GuaranteeProps {
  text?: string;
  image?: string;
}

const Guarantee: React.FC<GuaranteeProps> = ({ 
  text = 'Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.',
  image = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
}) => {
  return (
    <Card className="p-6 bg-white mb-4">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3">
          <img 
            src={image}
            alt="Garantia de 7 dias" 
            className="w-full rounded-lg"
          />
        </div>
        
        <div className="md:w-2/3">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-medium text-[#432818]">
              Garantia de 7 dias
            </h3>
          </div>
          
          <p className="text-[#6b605a]">
            {text}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Guarantee;
