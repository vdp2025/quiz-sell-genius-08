
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { QuizOptionImage } from './QuizOptionImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId?: string;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-all duration-500 ease-in-out transform", 
        !type.includes('text') && !isSelected && "hover:scale-[1.02]"
      )}
      onClick={() => onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-all duration-300 ease-out", 
          type === 'text' && "p-4 rounded-lg border backdrop-blur-[8px] bg-white/40",
          type !== 'text' && "border border-[#B89B7A]/30 rounded-lg cursor-pointer overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-brand-gold bg-white/50 backdrop-blur-[12px] shadow-lg ring-2 ring-brand-gold/20" 
              : "border-brand-gold shadow-lg ring-2 ring-brand-gold/20"
            : type === 'text' 
              ? "border-[#B89B7A]/10 hover:border-brand-gold/40 hover:bg-white/45 hover:backdrop-blur-[10px] hover:scale-[1.01] hover:shadow-md" 
              : "hover:border-brand-gold/40 hover:shadow-md"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory}
            isSelected={isSelected}
            is3DQuestion={is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        
        <p className={cn(
          "transition-all duration-300",
          type !== 'text' 
            ? cn(
                "leading-tight font-medium bg-transparent py-1.5 px-2 mt-auto text-brand-coffee relative",
                (questionId === '1' || questionId === '2') 
                  ? "text-[0.5rem] sm:text-[0.6rem]" 
                  : "text-[0.7rem] sm:text-xs",
                isSelected && "font-semibold"
              )
            : cn(
                "text-[0.7rem] sm:text-xs leading-relaxed",
                (questionId === '1' || questionId === '2') && "text-[0.5rem] sm:text-[0.6rem]"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};

export { QuizOption };

