
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';

interface StyleResultSectionProps {
  primaryStyle: StyleResult;
  description: string;
  image: string;
  secondaryStyles: StyleResult[];
}

export const StyleResultSection: React.FC<StyleResultSectionProps> = ({
  primaryStyle,
  description,
  image,
  secondaryStyles
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium text-[#432818]">{primaryStyle.category}</h3>
          <span className="text-sm font-medium text-[#B89B7A]">{primaryStyle.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full" 
            style={{ width: `${primaryStyle.percentage}%` }}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1">
            <p className="text-[#432818] leading-relaxed">
              {description}
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src={image} 
              alt={`Estilo ${primaryStyle.category}`} 
              className="h-80 object-contain"
            />
          </div>
        </div>
      </div>
      
      {secondaryStyles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-[#432818] mb-3">
            Estilos Complementares
          </h3>
          <div className="space-y-3">
            {secondaryStyles.map((style) => (
              <div key={style.category} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm text-[#432818]">{style.category}</h4>
                  <span className="text-xs font-medium text-[#B89B7A]">{style.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-[#B89B7A] h-1.5 rounded-full" 
                    style={{ width: `${style.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
