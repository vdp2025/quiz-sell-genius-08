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
  isDisabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-all duration-300 ease-in-out transform", 
        !type.includes('text') && !isSelected && "hover:scale-[1.02]",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isDisabled && onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-all duration-300 ease-out cursor-pointer", 
          type === 'text' && "p-4 rounded-lg border backdrop-blur-[8px] bg-white/40",
          type !== 'text' && "border border-[#B89B7A]/20 rounded-lg overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-brand-gold/30 bg-white/50 backdrop-blur-[12px] shadow-sm ring-1 ring-brand-gold/20" 
              : "border-brand-gold/30 shadow-sm ring-1 ring-brand-gold/20"
            : type === 'text' 
              ? "border-[#B89B7A]/10 hover:border-brand-gold/30 hover:bg-white/45 hover:backdrop-blur-[10px] hover:shadow-sm" 
              : "hover:border-brand-gold/30 hover:shadow-sm"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory || ''}
            isSelected={isSelected}
            is3DQuestion={is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        
        <p className={cn(
          "transition-all duration-300",
          type !== 'text' 
            ? cn(
                "leading-tight font-medium bg-transparent py-0 px-2 mt-auto text-brand-text relative", 
                isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm",
                isSelected && "font-semibold"
              )
            : cn(
                "leading-relaxed",
                isMobile ? "text-[0.75rem]" : "text-sm sm:text-base",
                isSelected && "text-brand-text font-semibold"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>

        {isSelected && (
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-brand-gold/60 rounded-full flex items-center justify-center shadow-sm z-10 animate-scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-1.5 w-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export { QuizOption };