
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
  is3DQuestion
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

  const getImageScale = () => {
    // zoom leve em mobile, ajuste em desktop
    return isMobile ? 'scale-110' : 'scale-90';
  };

  return (
    <div
      className={cn(
        "w-full relative flex-grow overflow-hidden",
        is3DQuestion && "transform-gpu"
      )}
    >
      <AspectRatio
        ratio={imageUrl.includes('sapatos') ? 1 : 3 / 4}
        className="w-full h-full"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            loading="lazy"
            className={cn(
              "object-cover w-full h-full transition-all duration-300 ease-in-out",
              getImageScale(),
              isSelected && "shadow-lg border-2 border-brand-gold/40 z-10"
            )}
            onError={() => setImageError(true)}
            style={{
              willChange: 'transform',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </AspectRatio>
    </div>
  );
};

// Export as default too
export default QuizOptionImage;
