
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';
import { getFallbackStyle } from '@/utils/styleUtils';

interface QuizOptionImageProps {
  imageUrl: string;
  altText: string;
  styleCategory: string;
  isSelected: boolean;
  is3DQuestion: boolean;
  questionId: string;
}

export const QuizOptionImage: React.FC<QuizOptionImageProps> = ({
  imageUrl,
  altText,
  styleCategory,
  isSelected,
  is3DQuestion,
  questionId
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4" style={getFallbackStyle(styleCategory)}>
        <span className="text-sm text-center">{styleCategory}</span>
      </div>
    );
  }

  // Standard aspect ratio for consistent display
  const aspectRatio = imageUrl.includes('sapatos') ? 1 : 3/4;
  
  // Enhanced image scale and transition
  const getImageScale = () => {
    if (is3DQuestion) return "scale-110 hover:scale-115";
    return "scale-105 hover:scale-110";
  };

  return (
    <div className={cn(
      "w-full relative flex-grow overflow-hidden",
      is3DQuestion && "transform-gpu"
    )}>
      <AspectRatio 
        ratio={aspectRatio} 
        className="w-full h-full"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className={cn(
              "object-cover w-full h-full",
              "transition-all duration-300 ease-in-out",
              getImageScale(),
              isSelected && "shadow-lg border-2 border-brand-gold/40 z-10"
            )}
            onError={() => setImageError(true)}
            style={{
              willChange: 'transform',
              transformOrigin: 'center center',
            }}
            loading="eager" // Ensure images load quickly
          />
        </div>
      </AspectRatio>
    </div>
  );
};
