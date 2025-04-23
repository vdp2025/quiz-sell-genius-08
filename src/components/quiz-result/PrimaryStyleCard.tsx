import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';

interface PrimaryStyleCardProps {
  primaryStyle: StyleResult;
  customDescription?: string;
  customImage?: string;
  customGuideImage?: string;
}

const PrimaryStyleCard: React.FC<PrimaryStyleCardProps> = ({
  primaryStyle,
  customDescription,
  customImage,
  customGuideImage
}) => {
  const style = styleConfig[primaryStyle.category] || styleConfig['Natural'];

  const imageUrl = customImage || style.image;
  const guideImageUrl = customGuideImage || style.guideImage;
  const description = customDescription || style.description;

  return (
    <Card className="p-6 bg-white mb-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-[#432818] leading-relaxed">{description}</p>
        </div>
        <div className="order-first md:order-last space-y-4">
          <img 
            src={imageUrl} 
            alt={`Visual do Estilo ${primaryStyle.category}`} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <img 
            src={guideImageUrl} 
            alt={`Guia do Estilo ${primaryStyle.category}`} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;
