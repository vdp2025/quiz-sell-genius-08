
import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig, getStyleConfig } from '@/config/styleConfig';

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
  const styleData = getStyleConfig(primaryStyle.category);
  const imageUrl = customImage || styleData.image;
  const description = customDescription || styleData.description;
  
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair text-[#432818] font-semibold">
            Seu estilo predominante é {primaryStyle.category}
          </h2>
          <p className="text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="order-first md:order-last flex justify-center">
          {imageUrl ? (
            <div className="w-full max-w-md">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg shadow-md">
                <img 
                  src={imageUrl} 
                  alt={`Estilo ${primaryStyle.category}`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x533?text=Imagem+não+disponível";
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
              <p className="text-gray-400">Imagem não disponível</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;
