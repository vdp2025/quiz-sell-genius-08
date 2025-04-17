
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';

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

  return (
    <div 
      className="relative group"
      onClick={() => onSelect(option.id)}
    >
      <div 
        className={cn(
          "transition-all duration-200 cursor-pointer flex flex-col items-center",
          "shadow-sm hover:shadow-md",
          type === 'text' && "p-3 hover:bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200",
          isSelected && type === 'text' && "bg-gray-50 border-gray-200",
          isSelected && type !== 'text'
            ? "border-[#B89B7A] border-[0.5px] shadow-md" 
            : type !== 'text' && "border-transparent border-[0.5px]",
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
                  "object-cover w-full h-full transition-transform duration-300",
                  isSelected ? "scale-110" : "group-hover:scale-105"
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
          "cursor-pointer text-[#1A1818]/80 text-center w-full",
          type !== 'text' 
            ? isMobile 
              ? "text-[0.6rem] leading-[0.7rem] bg-white/90 px-1 py-1"
              : "text-sm leading-tight p-2"
            : isMobile 
              ? "text-sm leading-relaxed"
              : "text-base leading-relaxed"
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};
