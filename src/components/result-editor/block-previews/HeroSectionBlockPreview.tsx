
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { ArrowRight } from 'lucide-react';

interface HeroSectionBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    heroImage?: string;
    heroImage2?: string;
    style?: any;
  };
  primaryStyle: StyleResult;
}

const HeroSectionBlockPreview: React.FC<HeroSectionBlockPreviewProps> = ({ content, primaryStyle }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff7f3] to-white rounded-2xl" style={content.style}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#aa6b5d]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#aa6b5d]">
            {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
          </h2>
          
          <p className="text-xl text-[#1A1818]/80">
            {content.subtitle || 'Agora é hora de aplicar com clareza — e se vestir de você'}
          </p>
          
          <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
            <div className="flex items-center gap-2 text-[#aa6b5d]">
              <span>Seu estilo predominante é</span>
              <span className="font-semibold">{primaryStyle.category}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="relative animate-scale-in">
          {content.heroImage ? (
            <img
              src={content.heroImage}
              alt="Estilo"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg">
              <p className="text-gray-400">Adicione uma imagem principal</p>
            </div>
          )}
          
          {content.heroImage2 && (
            <img
              src={content.heroImage2}
              alt="Gisele Galvão"
              className="absolute -bottom-4 -right-4 w-2/3 rounded-lg shadow-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionBlockPreview;
