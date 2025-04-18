
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';

interface StyleResultSectionProps {
  primaryStyle: StyleResult;
  description: string;
  image: string;
}

export const StyleResultSection: React.FC<StyleResultSectionProps> = ({
  primaryStyle,
  description,
  image
}) => {
  return (
    <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-between text-sm text-[#432818] mb-1">
          <span>Compatibilidade</span>
          <span>{primaryStyle.percentage}%</span>
        </div>
        <div className="w-full bg-[#F3E8E6] rounded-full h-2">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${primaryStyle.percentage}%` }} 
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="text-lg text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
        <div>
          <img 
            src={image} 
            alt={`Estilo ${primaryStyle.category}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </Card>
  );
};
