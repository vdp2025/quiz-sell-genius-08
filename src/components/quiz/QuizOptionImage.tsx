import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '../ui/aspect-ratio';
import { removeBackground } from '@/hooks/useBackgroundRemoval';
import { getFallbackStyle } from '@/utils/styleUtils';

interface QuizOptionImageProps {
  imageUrl: string;
  altText: string;
  styleCategory: string;
  isSelected: boolean;
  isHovered: boolean;
  is3DQuestion: boolean;
}

export const QuizOptionImage: React.FC<QuizOptionImageProps> = ({
  imageUrl,
  altText,
  styleCategory,
  isSelected,
  isHovered,
  is3DQuestion,
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFailed, setProcessingFailed] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      if (isSelected && !processedImageUrl && !isProcessing && !processingFailed) {
        try {
          setIsProcessing(true);
          console.log('Processing image...');
          
          const img = new Image();
          img.crossOrigin = "anonymous";
          
          img.onload = async () => {
            try {
              const processedBlob = await removeBackground(img);
              const processedUrl = URL.createObjectURL(processedBlob);
              setProcessedImageUrl(processedUrl);
              setIsProcessing(false);
            } catch (error) {
              console.error('Failed to process image:', error);
              setProcessingFailed(true);
              setIsProcessing(false);
            }
          };
          
          img.onerror = () => {
            console.error('Failed to load image for processing');
            setProcessingFailed(true);
            setIsProcessing(false);
          };
          
          img.src = imageUrl;
        } catch (error) {
          console.error('Error in image processing:', error);
          setProcessingFailed(true);
          setIsProcessing(false);
        }
      }
    };

    processImage();
    
    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [isSelected, imageUrl, processedImageUrl, isProcessing, processingFailed]);

  const displayImageUrl = isSelected && processedImageUrl ? processedImageUrl : imageUrl;

  if (imageError) {
    return (
      <div className="w-full h-full" style={getFallbackStyle(styleCategory)}>
        <span>{styleCategory}</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full relative flex-grow overflow-visible",
      is3DQuestion && "transform-gpu"
    )}>
      <AspectRatio 
        ratio={imageUrl.includes('sapatos') ? 1 : 3/4} 
        className="w-full h-full"
      >
        <div className="w-full h-full flex items-center justify-center relative">
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 z-10">
              <div className="w-5 h-5 border-2 border-brand-coffee border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={displayImageUrl}
            alt={altText}
            className={cn(
              "object-contain px-2 pt-2 absolute inset-0",
              "transition-all duration-300 ease-out",
              isSelected && processedImageUrl 
                ? "scale-[1.25] -mt-4 z-50" 
                : "scale-100 z-10",
              (!isMobile && !isSelected && isHovered) 
                ? "scale-105" 
                : "",
              "w-full h-full"
            )}
            onError={() => setImageError(true)}
          />
        </div>
      </AspectRatio>
    </div>
  );
};
