
import React from 'react';
import { Card } from '@/components/ui/card';

const MentorSection = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6 text-center">
        Sobre sua mentora
      </h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-xl font-medium text-[#432818] mb-2">
            Gisele Galvão
          </h3>
          <p className="text-[#432818] mb-4">
            Consultora de Imagem e Estilo, Personal Branding, Estrategista de  
            Marca pessoal e Especialista em coloração pessoal com Certificação  
            internacional.
          </p>
          <p className="text-[#432818] mb-4">
            Advogada de formação. Mãe da Victória, esposa do Fabrício.
          </p>
          <p className="text-[#432818]">
            Apaixonada pela vida, pelos detalhes, viagens e tudo que me  
            proporcione crescer como ser humano. Colérica, virginiana, paciente,  
            pacificadora e muito empata.
          </p>
        </div>
        <div className="space-y-6">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"
            alt="Gisele Galvão"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </Card>
  );
};

export default MentorSection;
