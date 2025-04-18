
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
      <div className="w-full h-full" style={getFallbackStyle(styleCategory)}>
        <span>{styleCategory}</span>
      </div>
    );
  }

  // Define specific scale values based on question number and device type
  const getImageScale = () => {
    if (!isMobile) return "scale-100";
    
    // Enhanced scaling for questions 1 and 2
    if (['1', '2'].includes(questionId.charAt(0))) {
      return "scale-[1.45] -translate-y-4"; // Increased scale and slight upward shift
    }
    
    return "scale-125"; // Default mobile scale
  };

  return (
    <div className={cn(
      "w-full relative flex-grow overflow-hidden",
      is3DQuestion && "transform-gpu"
    )}>
      <AspectRatio 
        ratio={imageUrl.includes('sapatos') ? 1 : 3/4} 
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
              isSelected ? (
                isMobile 
                  ? "scale-110 shadow-lg z-10" 
                  : "shadow-lg border-2 border-brand-coffee/40 z-10"
              ) : "hover:shadow-md",
            )}
            onError={() => setImageError(true)}
            style={{
              willChange: 'transform',
              transformOrigin: 'center center',
            }}
          />
        </div>
      </AspectRatio>
    </div>
  );
};

