
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { useIsMobile } from '@/hooks/use-mobile';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-4 md:mt-6 space-y-3">
      <h3 className="text-base md:text-lg font-playfair text-[#432818]">
        Seus Estilos Complementares
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {secondaryStyles.slice(0, 2).map((style) => (
          <div key={style.category} className="flex gap-3 items-start bg-gray-50 p-2 md:p-3 rounded-lg">
            {!isMobile && (
              <img
                src={styleConfig[style.category].image}
                alt={`Estilo ${style.category}`}
                className="w-14 md:w-16 h-14 md:h-16 object-contain scale-90 rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-playfair text-sm md:text-base text-[#432818]">{style.category}</h4>
                <span className="text-xs font-medium">{style.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-[#B89B7A] h-1 rounded-full" 
                  style={{ width: `${style.percentage}%` }}
                />
              </div>
              <p className="text-xs md:text-sm text-[#1A1818]/70 mt-1">
                {styleConfig[style.category].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryStylesSection;
