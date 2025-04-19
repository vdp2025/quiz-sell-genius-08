
import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';

interface PrimaryStyleCardProps {
  primaryStyle: StyleResult;
  customDescription?: string;
  customImage?: string;
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

const PrimaryStyleCard: React.FC<PrimaryStyleCardProps> = ({
  primaryStyle,
  customDescription,
  customImage,
  isEditing = false,
  onUpdate
}) => {
  const imageUrl = customImage || styleConfig[primaryStyle.category].image;
  const description = customDescription || styleConfig[primaryStyle.category].description;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium text-[#432818]">Estilo Predominante</h3>
        <span className="text-sm font-medium text-[#B89B7A]">{primaryStyle.percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-[#B89B7A] h-2 rounded-full" 
          style={{ width: `${primaryStyle.percentage}%` }}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          {isEditing ? (
            <div className="relative">
              <Textarea
                value={description}
                onChange={(e) => onUpdate?.(e.target.value)}
                rows={6}
                className="w-full border-dashed border-[#B89B7A] focus:border-[#8F7A6A]"
              />
              <Button variant="ghost" size="sm" className="absolute right-2 top-2">
                <Edit className="w-4 h-4 text-[#B89B7A]" />
              </Button>
            </div>
          ) : (
            <p className="text-[#432818] leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <img 
            src={imageUrl} 
            alt={`Estilo ${primaryStyle.category}`} 
            className="h-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryStyleCard;
