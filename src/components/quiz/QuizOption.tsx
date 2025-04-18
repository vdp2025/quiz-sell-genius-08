
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
        "transition-all duration-500 ease-in-out", 
        isMobile && "active:scale-[0.98]"
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
          "transition-all duration-500 ease-in-out", 
          type === 'text' && "p-4 rounded-lg border border-[#B89B7A]/20",
          type !== 'text' && "border border-[#B89B7A]/30 rounded-lg cursor-pointer overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-[#B89B7A]/80 bg-[#B89B7A]/10 shadow-2xl"
              : "border-[#B89B7A]/80 shadow-2xl"
            : type === 'text' 
              ? "hover:border-[#B89B7A]/40 hover:bg-[#B89B7A]/5" 
              : "hover:border-[#B89B7A]/50",
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
                // Smaller font size for questions 1 and 2
                (questionId === '1' || questionId === '2') 
                  ? "text-[0.5rem] sm:text-[0.6rem]" 
                  : "text-[0.7rem] sm:text-xs",
                isSelected && "font-semibold"
              )
            : cn(
                "text-[0.7rem] sm:text-xs leading-relaxed",
                // Even smaller font size for text options in questions 1 and 2
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

