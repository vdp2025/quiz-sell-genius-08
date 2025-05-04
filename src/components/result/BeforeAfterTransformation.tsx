
import React from 'react';
import { Card } from '@/components/ui/card';

const BeforeAfterTransformation: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-4">
        Transformações Reais
      </h2>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Primeira transformação - Invertida (texto à esquerda, imagem à direita) */}
        <div className="space-y-4 order-2 md:order-1">
          <h3 className="font-medium text-[#aa6b5d] mb-2">Resultados Reais</h3>
          <ul className="text-[#432818] space-y-2">
            <li>• Guarda-roupa funcional com menos peças</li>
            <li>• Looks que valorizam seu tipo físico</li>
            <li>• Mais confiança no dia a dia</li>
            <li>• Economia de tempo e dinheiro</li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp" 
            alt="Antes e depois da transformação de estilo" 
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        </div>
        
        {/* Segunda transformação - Invertida (texto à direita, imagem à esquerda) */}
        <div className="order-3">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp" 
            alt="Antes e depois da transformação de estilo" 
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        </div>
        <div className="space-y-4 order-4">
          <h3 className="font-medium text-[#aa6b5d] mb-2">Mariangela Pontes</h3>
          <ul className="text-[#432818] space-y-2">
            <li>• "Finalmente entendi meu estilo pessoal"</li>
            <li>• "Parei de comprar por impulso"</li>
            <li>• "Recebo elogios todos os dias"</li>
            <li>• "Me sinto mais autêntica e confiante"</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default BeforeAfterTransformation;
