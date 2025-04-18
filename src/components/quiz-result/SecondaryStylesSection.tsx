
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  return (
    <div className="mt-2 space-y-2">
      <h3 className="text-sm font-playfair text-[#432818]">
        Seus Estilos Complementares
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {secondaryStyles.slice(0, 2).map((style) => (
          <div key={style.category} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-playfair text-sm text-[#432818]">{style.category}</h4>
                <span className="text-xs font-medium text-[#8F7A6A]">{style.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-[#B89B7A] h-1 rounded-full" 
                  style={{ width: `${style.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryStylesSection;
