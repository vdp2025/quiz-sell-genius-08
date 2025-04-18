
import React from 'react';
import { StyleResult } from '@/types/quiz';

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

const HeroSectionBlockPreview: React.FC<HeroSectionBlockPreviewProps> = ({ 
  content,
  primaryStyle
}) => {
  return (
    <div className="relative space-y-6" style={content.style}>
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-3">
          {content.title || "VOCÊ DESCOBRIU SEU ESTILO"}
        </h1>
        <p className="text-xl md:text-2xl font-playfair text-[#3a3a3a] mb-6">
          {content.subtitle || "Agora é hora de aplicar com clareza — e se vestir de você"}
        </p>
        
        <div className="p-4 bg-[#ffefec] border-[#aa6b5d]/20 inline-block mx-auto rounded-lg">
          <div className="flex items-center gap-2 text-[#aa6b5d]">
            <span>Seu estilo predominante é</span>
            <span className="font-semibold">{primaryStyle.category}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {content.heroImage && (
          <img
            src={content.heroImage}
            alt="Guia Completo de Estilo"
            className="w-full rounded-lg shadow-lg"
          />
        )}
        {content.heroImage2 && (
          <img
            src={content.heroImage2}
            alt="Gisele Galvão"
            className="w-full rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default HeroSectionBlockPreview;
