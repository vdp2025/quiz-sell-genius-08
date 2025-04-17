import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Check } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { removeBackground, loadImage } from '@/hooks/useBackgroundRemoval';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
}

const getFallbackStyle = (styleCategory: string) => {
  const colorMap: Record<string, string> = {
    'Natural': '#D2C1A5',
    'Clássico': '#1F456E',
    'Contemporâneo': '#7F7F7F',
    'Elegante': '#AF9F7F',
    'Romântico': '#F5D0E3',
    'Sexy': '#A82743',
    'Dramático': '#222222',
    'Criativo': '#F79862'
  };
  
  return {
    backgroundColor: colorMap[styleCategory] || '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ['Natural', 'Elegante', 'Romântico', 'Contemporâneo'].includes(styleCategory) ? '#333' : '#fff',
    fontSize: '1rem',
    textAlign: 'center' as const,
    padding: '1rem'
  };
};

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFailed, setProcessingFailed] = useState(false);

  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  useEffect(() => {
    const processImage = async () => {
      if (isSelected && option.imageUrl && !processedImageUrl && !isProcessing && !processingFailed) {
        try {
          setIsProcessing(true);
          console.log('Processing image for option:', option.id);
          
          const img = new Image();
          img.crossOrigin = "anonymous";
          
          img.onload = async () => {
            try {
              const processedBlob = await removeBackground(img);
              const processedUrl = URL.createObjectURL(processedBlob);
              setProcessedImageUrl(processedUrl);
              setIsProcessing(false);
              console.log('Background removed successfully for option:', option.id);
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
          
          img.src = option.imageUrl;
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
  }, [isSelected, option.imageUrl, processedImageUrl, isProcessing, processingFailed, option.id]);

  const displayImageUrl = isSelected && processedImageUrl ? processedImageUrl : option.imageUrl;

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-colors duration-300 ease-out"
      )}
      onClick={() => onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full transition-all duration-300",
        "flex items-center justify-center",
        isSelected 
          ? "bg-[#B89B7A]/70 scale-100 opacity-100" 
          : "bg-transparent scale-50 opacity-0"
      )}>
        <Check className="w-2.5 h-2.5 text-white/90" />
      </div>

      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-colors duration-300 ease-out",
          type === 'text' && "p-4 rounded-lg border border-[#B89B7A]/20",
          type !== 'text' && "border border-[#B89B7A]/30 rounded-lg cursor-pointer",
          isSelected 
            ? type === 'text' 
              ? "border-[#B89B7A]/70 bg-[#B89B7A]/5" 
              : "border-[#B89B7A]/70"
            : type === 'text' 
              ? "hover:border-[#B89B7A]/40 hover:bg-[#B89B7A]/5" 
              : "hover:border-[#B89B7A]/50"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <div className={cn(
            "w-full relative flex-grow overflow-visible",
            is3DQuestion && "transform-gpu"
          )}>
            <AspectRatio 
              ratio={option.imageUrl.includes('sapatos') ? 1 : 3/4} 
              className="w-full h-full"
            >
              {imageError ? (
                <div 
                  className="w-full h-full" 
                  style={getFallbackStyle(option.styleCategory)}
                >
                  <span>{option.styleCategory}</span>
                </div>
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center",
                  "relative"
                )}>
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 z-10">
                      <div className="w-5 h-5 border-2 border-brand-coffee border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={displayImageUrl}
                    alt={option.text}
                    className={cn(
                      "object-contain px-2 pt-2",
                      "transition-all duration-300 ease-out",
                      isSelected && processedImageUrl 
                        ? "scale-[1.15] -mt-3 z-10" 
                        : "scale-100",
                      !isMobile && !isSelected && isHovered && "scale-105"
                    )}
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </AspectRatio>
          </div>
        )}
        
        <p className={cn(
          "transition-colors duration-300",
          type !== 'text' 
            ? cn(
                "text-[0.65rem] sm:text-xs leading-tight font-medium",
                "bg-white/90 py-1 px-1.5 mt-auto",
                "text-brand-coffee z-20 relative"
              )
            : isMobile 
              ? "text-xs leading-relaxed" 
              : "text-lg leading-relaxed"
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};

export { QuizOption };
