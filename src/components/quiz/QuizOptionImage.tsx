
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';

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
      <div className="w-full h-full" style={{
        backgroundColor: getStyleFallbackColor(styleCategory),
        color: styleCategory === 'Dramático' ? '#FFFFFF' : '#432818',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as const,
        fontWeight: 500,
        fontSize: '0.8rem',
        padding: '0.5rem'
      }}>
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

// Helper function for fallback color
const getStyleFallbackColor = (styleCategory: string): string => {
  const colorMap: Record<string, string> = {
    'Natural': '#D2C5B0',
    'Clássico': '#8C9AAF',
    'Contemporâneo': '#B0C5D2',
    'Elegante': '#C5B0D2',
    'Romântico': '#F4D0DC',
    'Sexy': '#D2B0B0',
    'Dramático': '#303030',
    'Criativo': '#D2B0C5',
    'default': '#F5F5F5'
  };
  
  return colorMap[styleCategory] || colorMap.default;
};

export default QuizOptionImage;
