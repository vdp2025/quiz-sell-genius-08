
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { getStyleColor } from '@/utils/styleUtils';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({
  secondaryStyles
}) => {
  // Display only the top 3 secondary styles
  const topStyles = secondaryStyles.slice(0, 3);
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[#432818]">Estilos Complementares:</h3>
      
      {topStyles.map((style, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm">{style.category}</span>
            <span className="text-xs text-[#8F7A6A]">{Math.round(style.percentage)}%</span>
          </div>
          <div className="w-full bg-[#F3E8E6] h-2 rounded-full">
            <div 
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${style.percentage}%`,
                backgroundColor: getStyleColor(style.category)
              }} 
            />
          </div>
        </div>
      ))}
      
      <p className="text-xs text-[#8F7A6A] mt-2">
        Combine seu estilo principal com estes complementares para uma expressão pessoal única.
      </p>
    </div>
  );
};

export default SecondaryStylesSection;
