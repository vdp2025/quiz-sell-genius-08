
import React from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { Check } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId: string;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId
}) => {
  const isTextOnly = type === 'text';
  const isImageOnly = type === 'image';
  const isBoth = type === 'both';
  const hasImage = isImageOnly || isBoth;
  
  const handleClick = () => {
    onSelect(option.id);
  };
  
  return (
    <div
      className={cn(
        "relative transition-all duration-200 hover:shadow-sm cursor-pointer select-none",
        isSelected 
          ? "ring-2 ring-[#B89B7A] bg-[#FAF9F7]" 
          : "hover:ring-1 hover:ring-[#B89B7A]/50",
        hasImage 
          ? "rounded-lg overflow-hidden flex flex-col" 
          : "rounded-md p-3"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
    >
      {hasImage && option.imageUrl && (
        <div className="w-full">
          <AspectRatio ratio={4/3} className="w-full">
            <img
              src={option.imageUrl}
              alt={option.text}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      )}
      
      {(isTextOnly || isBoth) && (
        <div 
          className={cn(
            "flex items-start gap-2 text-[#432818]",
            hasImage ? "p-3 border-t border-[#B89B7A]/10" : "",
            isSelected && "font-medium"
          )}
        >
          {/* Selection indicator */}
          <div className={cn(
            "h-5 w-5 rounded-full border-2 border-[#B89B7A] flex-shrink-0 mr-2 mt-0.5",
            isSelected ? "bg-[#B89B7A] flex items-center justify-center" : "bg-white"
          )}>
            {isSelected && <Check className="h-3 w-3 text-white" />}
          </div>
          
          {/* Option text */}
          <span className={cn(
            "text-sm sm:text-base",
            isSelected && "font-medium"
          )}>
            {option.text}
          </span>
        </div>
      )}
      
      {/* Style category label - only visible for admin or debug */}
      {option.styleCategory && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-1 right-1 bg-[#B89B7A]/80 text-white text-xs px-1 py-0.5 rounded">
          {option.styleCategory}
        </div>
      )}
    </div>
  );
};
