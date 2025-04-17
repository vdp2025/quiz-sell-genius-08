
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Check } from 'lucide-react';

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

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type
}) => {
  const isMobile = useIsMobile();
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={cn(
        "relative group transition-all duration-300 ease-out transform",
        (isHovered || isSelected) && "scale-[1.02]"
      )}
      onClick={() => onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection indicator - Making the checkmark more subtle */}
      <div className={cn(
        "absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full transition-all duration-300",
        "flex items-center justify-center",
        isSelected 
          ? "bg-[#B89B7A]/80 scale-100 opacity-100" 
          : "bg-transparent scale-50 opacity-0"
      )}>
        <Check className="w-3 h-3 text-white/90" />
      </div>

      <div 
        className={cn(
          "transition-all duration-300 ease-out cursor-pointer",
          "border",
          type === 'text' && "p-3 rounded-lg",
          isSelected 
            ? "border-[#B89B7A]/70" 
            : "border-transparent hover:border-[#B89B7A]/30",
          (isHovered || isSelected) && "shadow-lg"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <div className={cn(
            "overflow-hidden w-full",
            option.imageUrl.includes('sapatos') || option.imageUrl.includes('roupa') 
              ? "aspect-square" 
              : "aspect-[3/4]"
          )}>
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
                  (isSelected || isHovered) ? "scale-110" : "scale-100"
                )}
                style={{ 
                  transformOrigin: 'center center',
                  objectFit: option.imageUrl.includes('sapatos') ? 'contain' : 'cover'
                }}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
        <p className={cn(
          "cursor-pointer transition-colors duration-300",
          type !== 'text' 
            ? isMobile 
              ? "text-2xs leading-[0.7rem] bg-white/90 px-1 py-1"
              : "text-base leading-tight p-2"
            : isMobile 
              ? "text-xs leading-relaxed"
              : "text-lg leading-relaxed",
          isSelected ? "text-[#432818]" : "text-[#1A1818]/80"
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};
