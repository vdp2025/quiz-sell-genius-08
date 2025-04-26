
import React from 'react';
import { Card } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

const MotivationSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <AnimatedWrapper>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            Você está a um passo de dominar seu estilo pessoal...
          </h2>
          <p className="text-[#432818]">
            Imagine nunca mais ter dúvidas sobre o que vestir e como combinar suas roupas
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-[#F9F6F2] rounded-lg">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-medium text-[#432818] mb-2">Economize tempo</h3>
            <p className="text-sm text-[#432818]/80">
              Chega de ficar horas na frente do guarda-roupa sem saber o que vestir
            </p>
          </div>
          
          <div className="p-4 bg-[#F9F6F2] rounded-lg">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-medium text-[#432818] mb-2">Economize dinheiro</h3>
            <p className="text-sm text-[#432818]/80">
              Pare de comprar roupas que nunca usa e não combinam com seu estilo
            </p>
          </div>
          
          <div className="p-4 bg-[#F9F6F2] rounded-lg">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-medium text-[#432818] mb-2">Aumente sua confiança</h3>
            <p className="text-sm text-[#432818]/80">
              Sinta-se segura e alinhada com sua imagem pessoal em qualquer ocasião
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </Card>
  );
};

export default MotivationSection;
