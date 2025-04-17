
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Check } from 'lucide-react';
import { QuizOptionImage } from './QuizOptionImage';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-all duration-500 ease-in-out", // Longer duration for smoother transitions
        isMobile && "active:scale-[0.98]" // Subtle feedback on tap for mobile
      )}
      onClick={() => onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={cn(
        "absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full transition-all duration-500", // Increased size and duration
        "flex items-center justify-center",
        isSelected 
          ? "bg-[#B89B7A]/80 scale-100 opacity-100" // Increased opacity for better visibility
          : "bg-transparent scale-50 opacity-0"
      )}>
        <Check className="w-3 h-3 text-white" /> {/* Increased icon size */}
      </div>

      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-all duration-500 ease-in-out", // Increased duration for smoother transitions
          type === 'text' && "p-4 rounded-lg border border-[#B89B7A]/20",
          type !== 'text' && "border border-[#B89B7A]/30 rounded-lg cursor-pointer overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-[#B89B7A]/80 bg-[#B89B7A]/10 shadow-md" // Enhanced selected state
              : "border-[#B89B7A]/80 shadow-lg" // Increased shadow effect
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
          />
        )}
        
        <p className={cn(
          "transition-all duration-300",
          type !== 'text' 
            ? cn(
                "text-[0.7rem] sm:text-xs leading-tight font-medium bg-white/95 py-2 px-2.5 mt-auto text-brand-coffee z-20 relative", // Increased text size and padding
                isSelected && "font-semibold" // Bold text when selected
              )
            : "text-xs sm:text-lg leading-relaxed"
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
    </div>
  );
};

export { QuizOption };
