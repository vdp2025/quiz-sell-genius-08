
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  primaryStyle: StyleResult;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ primaryStyle }) => {
  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="flex justify-center">
        <Heart className="w-12 h-12 text-[#9b87f5]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-playfair text-[#1A1F2C] leading-tight">
        Descubra a Beleza do Seu Estilo {primaryStyle.category}
      </h1>
      <p className="text-xl text-[#6E59A5] max-w-2xl mx-auto">
        Uma jornada de autodescoberta e transformação através do seu estilo pessoal único
      </p>
    </div>
  );
};
