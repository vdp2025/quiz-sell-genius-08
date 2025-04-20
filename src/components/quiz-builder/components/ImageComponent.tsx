
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
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
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        {data.imageUrl ? (
          <AspectRatio ratio={16 / 9}>
            <img 
              src={data.imageUrl} 
              alt={data.alt || 'Imagem do quiz'} 
              className="w-full h-full object-cover rounded-md"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </AspectRatio>
        )}
        
        {data.alt && (
          <p className="text-center text-sm text-[#8F7A6A] mt-2">
            {data.alt}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
