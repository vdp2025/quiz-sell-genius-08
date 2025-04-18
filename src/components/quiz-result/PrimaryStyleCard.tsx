
import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { useIsMobile } from '@/hooks/use-mobile';

interface PrimaryStyleCardProps {
  primaryStyle: StyleResult;
  customDescription?: string;
  customImage?: string;
}

const PrimaryStyleCard: React.FC<PrimaryStyleCardProps> = ({
  primaryStyle,
  customDescription,
  customImage
}) => {
  const isMobile = useIsMobile();
  
  // Usa a imagem personalizada ou a padrão do styleConfig
  const imageUrl = customImage || styleConfig[primaryStyle.category].image;
  
  // Usa a descrição personalizada ou a padrão do styleConfig
  const description = customDescription || styleConfig[primaryStyle.category].description;
  
  return (
    <div className={isMobile ? "flex flex-col gap-4" : "flex flex-col md:flex-row gap-4 md:gap-6"}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-playfair text-[#B89B7A]">
            {primaryStyle.category}
          </h2>
          <span className="text-sm font-medium">{primaryStyle.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-[#B89B7A] h-1.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${primaryStyle.percentage}%` }} 
          />
        </div>
        <p className="text-[#1A1818]/80 text-sm mt-2">
          {description}
        </p>
      </div>
      <div className="">
        <img 
          src={imageUrl} 
          alt={`Estilo ${primaryStyle.category}`} 
          className={isMobile ? 
            "w-full h-40 object-contain scale-90 rounded-lg shadow-sm" : 
            "w-full h-[200px] md:h-[250px] object-contain scale-90 rounded-lg shadow-sm mx-auto"
          } 
        />
      </div>
    </div>
  );
};

export default PrimaryStyleCard;
