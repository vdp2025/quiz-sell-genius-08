
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId?: string;
  isDisabled?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const isStrategicQuestion = questionId?.startsWith('strategic');

  return (
    <div 
      className={cn(
        "relative group cursor-pointer transform transition-all duration-300 ease-out",
        !isDisabled && "hover:scale-[1.02]",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isDisabled && onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-full rounded-xl overflow-hidden transition-all duration-300",
          "border backdrop-blur-[8px]",
          isStrategicQuestion ? [
            "p-4 bg-white/80",
            isSelected 
              ? "border-brand-gold shadow-lg ring-1 ring-brand-gold/30" 
              : "border-[#B89B7A]/10 hover:border-brand-gold/40 hover:bg-white/90 hover:shadow-md"
          ] : [
            "border-[#B89B7A]/20",
            isSelected 
              ? "border-brand-gold/60 shadow-md" 
              : "hover:border-brand-gold/40"
          ]
        )}
      >
        <div className={cn(
          "relative z-10 transition-all duration-300",
          isSelected && "transform scale-[1.02]"
        )}>
          <p className={cn(
            "leading-relaxed transition-all duration-300",
            isMobile ? "text-sm" : "text-base",
            isSelected ? "font-medium text-brand-coffee" : "text-[#432818]"
          )}>
            {highlightStrategicWords(option.text)}
          </p>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center shadow-md z-20 animate-scale-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};
