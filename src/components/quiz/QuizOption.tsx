import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Check } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';

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
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className={cn(
        "relative group transition-all duration-300 ease-out transform perspective-1000",
        (isHovered || isSelected) && "scale-[1.03]"
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
          "transition-all duration-300 ease-out cursor-pointer overflow-hidden",
          type === 'text' && "p-4 rounded-lg border border-[#B89B7A]/20",
          type !== 'text' && "border border-[#9F9EA1]/30 rounded-lg",
          isSelected 
            ? type === 'text' 
              ? "border-[#B89B7A]/70 bg-[#B89B7A]/5" 
              : "border-[#B89B7A]/70"
            : type === 'text' 
              ? "hover:border-[#B89B7A]/40 hover:bg-[#B89B7A]/5" 
              : "border-[#9F9EA1]/30 hover:border-[#B89B7A]/40",
          (isHovered || isSelected) && "shadow-lg"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <div className={cn(
            "w-full overflow-hidden relative",
            is3DQuestion && "transform-gpu transition-transform duration-300",
            is3DQuestion && (isHovered || isSelected) && "rotate-y-12 rotate-x-12"
          )}>
            <AspectRatio 
              ratio={option.imageUrl.includes('sapatos') ? 1 : 3/4} 
              className="w-full"
            >
              {imageError ? (
                <div 
                  className="w-full h-full" 
                  style={getFallbackStyle(option.styleCategory)}
                >
                  <span>{option.styleCategory}</span>
                </div>
              ) : (
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className={cn(
                    "object-cover w-full h-full transition-all duration-300 ease-out",
                    (isSelected || isHovered) ? "scale-150" : "scale-125"
                  )}
                  style={{ 
                    transformOrigin: 'center center',
                    objectFit: option.imageUrl.includes('sapatos') ? 'contain' : 'cover',
                    margin: '-5%',
                    width: '110%',
                    height: '110%'
                  }}
                  onError={() => setImageError(true)}
                />
              )}
            </AspectRatio>
          </div>
        )}
        
        <p className={cn(
          "cursor-pointer transition-all duration-300",
          type !== 'text' 
            ? cn(
                "text-[0.75rem] sm:text-sm leading-tight font-medium",
                "relative bottom-0 left-0 right-0 z-10",
                "bg-white/90 p-1.5",
                "text-brand-coffee"
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
