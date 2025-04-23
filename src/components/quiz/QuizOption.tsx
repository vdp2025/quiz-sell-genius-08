
import React from 'react';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: {
    id: string;
    text: string;
    imageUrl?: string;
    styleCategory: string;
  };
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
  const handleClick = () => {
    onSelect(option.id);
  };

  return (
    <div 
      className={cn(
        "flex items-center p-3 cursor-pointer rounded-md transition-all duration-300",
        isSelected 
          ? "bg-brand-gold/10 border border-brand-gold/50" 
          : "hover:bg-gray-100"
      )}
      onClick={handleClick}
    >
      {type !== 'text' && option.imageUrl && (
        <div className="w-full h-full">
          <img 
            src={option.imageUrl} 
            alt={option.text} 
            className={cn(
              "w-full h-full object-cover rounded-md",
              isSelected && "border-2 border-brand-gold/50"
            )}
          />
        </div>
      )}
      {(type === 'text' || type === 'both') && (
        <span className={cn(
          "text-sm text-brand-coffee",
          isSelected && "font-semibold"
        )}>
          {option.text}
        </span>
      )}
    </div>
  );
};

export default QuizOption;
