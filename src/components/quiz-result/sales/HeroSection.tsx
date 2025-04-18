
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface HeroSectionProps {
  primaryStyle: StyleResult;
}

const HeroSection: React.FC<HeroSectionProps> = ({ primaryStyle }) => {
  return (
    <div className="relative space-y-6 text-center">
      <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-3">
        VOCÊ DESCOBRIU SEU ESTILO
      </h1>
      <p className="text-xl md:text-2xl font-playfair text-[#3a3a3a] mb-6">
        Agora é hora de aplicar com clareza — e se vestir de você
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
          alt="Guia Completo de Estilo"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
          alt="Gisele Galvão"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
