
import React from 'react';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  type: 'text' | 'image' | 'text-image';
  questionId: string;
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
  const hasImage = type === 'image' || type === 'text-image';
  
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg transition-all duration-300 flex flex-col",
        isSelected ? "ring-2 ring-[#B89B7A] bg-[#B89B7A]/5" : "hover:bg-[#F9F6F2] border border-[#B89B7A]/10",
        isDisabled && !isSelected && "opacity-50 cursor-not-allowed",
        hasImage ? "overflow-hidden h-full" : "p-3"
      )}
      onClick={handleClick}
    >
      {hasImage && option.imageUrl && (
        <div className="relative flex-1 bg-[#F9F6F2] overflow-hidden">
          <img
            src={option.imageUrl}
            alt={option.text}
            className={cn(
              "object-cover transition-transform duration-500 w-full h-full",
              isSelected ? "scale-105" : "group-hover:scale-105"
            )}
            loading="lazy"
          />
          {isSelected && (
            <div className="absolute top-2 right-2 bg-[#B89B7A] text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "flex-shrink-0",
        hasImage ? "p-3 bg-white/95" : "",
        isSelected && hasImage && "bg-[#B89B7A]/10"
      )}>
        <p className={cn(
          "text-sm",
          isSelected ? "text-[#432818] font-medium" : "text-[#432818]/90",
        )}>
          {option.text}
        </p>
      </div>
      
      {isSelected && !hasImage && (
        <div className="absolute top-2 right-2 text-[#B89B7A]">
          <Check className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};
