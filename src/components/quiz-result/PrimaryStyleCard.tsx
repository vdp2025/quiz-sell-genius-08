
import React from 'react';
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
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[#432818] font-medium">Estilo Predominante</h3>
          <span className="text-[#B89B7A] font-medium">{primaryStyle.percentage}%</span>
        </div>
        <div className="w-full h-2 bg-[#F3E8E6] rounded">
          <div 
            className="h-full bg-[#B89B7A] rounded transition-all duration-300"
            style={{ width: `${primaryStyle.percentage}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 items-start mt-6">
        <div className="space-y-4">
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
        <div className="flex justify-center">
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
