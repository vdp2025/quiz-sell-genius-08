
import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';

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
  const imageUrl = customImage || styleConfig[primaryStyle.category].image;
  const description = customDescription || styleConfig[primaryStyle.category].description;
  
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-playfair text-[#B89B7A]">
                {primaryStyle.category}
              </h2>
              <span className="text-lg font-medium text-[#432818]">
                {primaryStyle.percentage}%
              </span>
            </div>
            <div className="w-full bg-[#F3E8E6] rounded-full h-2">
              <div 
                className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${primaryStyle.percentage}%` }} 
              />
            </div>
          </div>
          <p className="text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <img 
            src={imageUrl} 
            alt={`Estilo ${primaryStyle.category}`} 
            className="w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;

