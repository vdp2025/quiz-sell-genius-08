
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
    <Card className="p-6 bg-white mb-8">
      <div className="grid md:grid-cols-2 gap-8">
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
        <div className="order-first md:order-last">
          <img 
            src={imageUrl} 
            alt={`Estilo ${primaryStyle.category}`} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;
