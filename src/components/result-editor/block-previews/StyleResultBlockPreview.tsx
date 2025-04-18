
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface StyleResultBlockPreviewProps {
  content: {
    title?: string;
    description?: string;
    customImage?: string;
    style?: any;
  };
  primaryStyle: StyleResult;
}

const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({ 
  content,
  primaryStyle
}) => {
  // Find the image for the style
  const imageUrl = content.customImage || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp';
  
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6" style={content.style}>
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
          {content.description || `Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável.`}
        </p>
      </div>
      <div className="">
        <img 
          src={imageUrl} 
          alt={`Estilo ${primaryStyle.category}`} 
          className="w-full h-40 md:h-[200px] object-contain scale-90 rounded-lg shadow-sm" 
        />
      </div>
    </div>
  );
};

export default StyleResultBlockPreview;
