
import React from 'react';
import { Card } from '@/components/ui/card';

const MentorSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#B89B7A]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#aa6b5d]/5 rounded-full blur-3xl"></div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div>
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
            Conheça sua Mentora
          </h2>
          <p className="text-[#432818] mb-4">
            <strong>Gisele Galvão</strong> é uma consultora de imagem especializada em 
            estilo pessoal e inteligência estética, ajudando mulheres a expressarem 
            sua autenticidade através da imagem.
          </p>
          <p className="text-[#432818]">
            Com mais de 7 anos de experiência, já transformou o guarda-roupa e a confiança 
            de centenas de mulheres, utilizando técnicas baseadas em psicologia da moda 
            e harmonização visual.
          </p>
        </div>
        
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp" 
            alt="Gisele Galvão - Mentora de Estilo" 
            className="rounded-lg shadow-md w-full max-w-md mx-auto hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Elegant decorative corner */}
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
        </div>
      </div>
    </Card>
  );
};

export default MentorSection;
