
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
    <div className="mt-8">
      <h3 className="text-[#432818] font-medium mb-4">
        Estilos Complementares
      </h3>
      <div className="space-y-4">
        {secondaryStyles.slice(0, 2).map((style) => (
          <div key={style.category} className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-[#432818]">{style.category}</h4>
              <span className="text-[#B89B7A] font-medium">{style.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F3E8E6] rounded">
              <div 
                className="h-full bg-[#B89B7A] rounded transition-all duration-300"
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
