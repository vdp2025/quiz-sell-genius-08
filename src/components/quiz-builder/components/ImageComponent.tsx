
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { Image } from 'lucide-react';

interface ImageComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ data, style, isSelected }) => {
  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      {data.imageUrl ? (
        <div className="flex flex-col items-center">
          <img 
            src={data.imageUrl} 
            alt={data.alt || 'Imagem'} 
            className="max-w-full h-auto rounded-md"
          />
          {data.alt && (
            <p className="mt-2 text-sm text-center text-gray-500">{data.alt}</p>
          )}
        </div>
      ) : (
        <div className="h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400">
          <Image className="w-12 h-12 mb-2" />
          <p>Imagem não definida</p>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
