
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Award, Crown } from 'lucide-react';

interface HeroSectionProps {
  primaryStyle: StyleResult;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ primaryStyle }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#1A1F2C] to-[#2C3444] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="flex justify-center gap-4">
          <Crown className="w-8 h-8 text-[#B89B7A]" />
          <Award className="w-8 h-8 text-[#B89B7A]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-playfair leading-tight">
          Libere seu Estilo {primaryStyle.category} Premium
        </h1>
        
        <p className="text-xl text-[#B89B7A] max-w-2xl mx-auto">
          Descubra como elevar seu estilo pessoal ao próximo nível com estratégias exclusivas e personalizadas
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};
