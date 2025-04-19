
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ 
  secondaryStyles,
  isEditing = false,
  onUpdate
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-md font-medium text-[#432818] mb-3">
        Estilos Complementares
      </h3>
      <div className="space-y-3">
        {secondaryStyles.slice(0, 2).map((style) => (
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
  );
};

export default SecondaryStylesSection;
