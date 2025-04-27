
import React from 'react';
import { Card } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

const MentorSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <AnimatedWrapper>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            Conheça sua mentora de estilo
          </h2>
          <p className="text-[#432818]">
            Consultora de Imagem e Especialista em Estilo Pessoal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744931964/retrato-de-uma-linda-designer-de-roupas-femininas-em-seu-atelier-getstyled-image-9-e1680680259116_nsvbdz.webp"
              alt="Consultora de Imagem"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-playfair text-[#aa6b5d]">Mônica Alves</h3>
            
            <div className="space-y-3 text-[#432818]">
              <p>
                Há mais de 7 anos, venho ajudando mulheres a descobrirem seu estilo autêntico e 
                transformarem sua relação com a moda e imagem pessoal.
              </p>
              
              <p>
                Como consultora certificada em Análise de Coloração Pessoal e Tipologia Corporal,
                já atendi mais de 500 mulheres em consultorias individuais e workshops.
              </p>
              
              <p>
                No Guia de Estilo e Imagem, compartilho todo meu conhecimento de forma acessível para
                que você possa aplicar os conceitos no seu dia a dia, economizando tempo e dinheiro.
              </p>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </Card>
  );
};

export default MentorSection;
