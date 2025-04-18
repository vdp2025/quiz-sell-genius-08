
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface StyleResultSectionProps {
  primaryStyle: StyleResult;
  description: string;
  image?: string;
}

export const StyleResultSection: React.FC<StyleResultSectionProps> = ({
  primaryStyle,
  description,
  image
}) => {
  return (
    <section className="py-12 px-4 bg-[#FAF9F7]">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair text-[#432818] mb-4">
            Seu estilo predominante é:
          </h1>
          <h2 className="text-3xl font-bold text-[#B89B7A]">
            {primaryStyle.category}
          </h2>
          {primaryStyle.percentage && (
            <div className="mt-2">
              <div className="w-full bg-[#E5E5E5] rounded-full h-2">
                <div 
                  className="bg-[#B89B7A] h-2 rounded-full" 
                  style={{ width: `${primaryStyle.percentage}%` }}
                />
              </div>
              <p className="text-[#8F7A6A] mt-1">
                {primaryStyle.percentage}% de compatibilidade
              </p>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {image && (
            <img 
              src={image} 
              alt={`Estilo ${primaryStyle.category}`}
              className="rounded-lg shadow-lg"
            />
          )}
          <div>
            <p className="text-lg text-[#432818] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
