
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Check } from 'lucide-react';
import { QuizOptionImage } from './QuizOptionImage';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className="relative group h-full transition-colors duration-300 ease-out"
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
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory}
            isSelected={isSelected}
            isHovered={isHovered}
            is3DQuestion={is3DQuestion}
          />
        )}
        
        <p className={cn(
          "transition-colors duration-300",
          type !== 'text' 
            ? "text-[0.65rem] sm:text-xs leading-tight font-medium bg-white/90 py-1 px-1.5 mt-auto text-brand-coffee z-20 relative"
            : "text-xs sm:text-lg leading-relaxed"
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};

export { QuizOption };
