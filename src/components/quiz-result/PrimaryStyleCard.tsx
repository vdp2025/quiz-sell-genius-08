
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
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="order-first md:order-last">
          <img 
            src={imageUrl} 
            alt={`Estilo ${primaryStyle.category}`} 
            className="w-full h-auto rounded-lg" // Changed from object-cover to h-auto to prevent cropping
          />
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;
