
import React from 'react';
import { cn } from '@/lib/utils';
import { Image } from 'lucide-react';

interface ImageComponentProps {
  data: {
    imageUrl?: string;
    alt?: string;
    caption?: string;
  };
  style?: {
    textColor?: string;
  };
  isEditing?: boolean;
  isSelected?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false
}) => {
  return (
    <figure className="flex flex-col items-center">
      {data.imageUrl ? (
        <img 
          src={data.imageUrl} 
          alt={data.alt || 'Imagem'} 
          className="max-w-full h-auto rounded-md"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md border border-dashed border-gray-300">
          <div className="flex flex-col items-center text-gray-400">
            <Image className="w-12 h-12 mb-2" />
            <span>Imagem não configurada</span>
          </div>
        </div>
      )}
      
      {(data.caption || isEditing) && (
        <figcaption 
          className={cn(
            "mt-2 text-sm text-center",
            isEditing && !data.caption && "opacity-50"
          )}
          style={{ color: style?.textColor || 'inherit' }}
        >
          {data.caption || 'Legenda da imagem'}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageComponent;
