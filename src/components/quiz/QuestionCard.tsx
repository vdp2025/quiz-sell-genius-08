
import React from 'react';
import { QuizQuestion } from '../../types/quiz';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptions: string[];
  onSelect: (questionId: string, options: string[]) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptions,
  onSelect
}) => {
  const isMobile = useIsMobile();
  
  const handleOptionClick = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);
    let newSelectedOptions: string[];
    
    if (isSelected) {
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    } else {
      if (selectedOptions.length < question.multiSelect) {
        newSelectedOptions = [...selectedOptions, optionId];
      } else {
        newSelectedOptions = [...selectedOptions.slice(1), optionId];
      }
    }
    
    onSelect(question.id, newSelectedOptions);
  };

  const getGridCols = () => {
    if (question.type === 'text') {
      return 'grid-cols-1 md:grid-cols-2 gap-4';
    }
    return isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-3';
  };

  return (
    <AnimatedWrapper className="w-full max-w-6xl mx-auto">
      <div className={cn(
        "grid",
        getGridCols(),
        "px-2 md:px-4"
      )}>
        {question.options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={cn(
              "cursor-pointer",
              "transition-transform duration-200"
            )}
          >
            <div className={cn(
              "relative h-full rounded-lg overflow-hidden border",
              selectedOptions.includes(option.id)
                ? "border-[#B89B7A] shadow-sm"
                : "border-gray-200"
            )}>
              {option.imageUrl && (
                <div className="relative w-full aspect-[3/4]">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className={cn(
                "p-2 bg-white border-t",
                "text-sm text-[#432818]"
              )}>
                <p className={cn(
                  selectedOptions.includes(option.id) && "font-medium"
                )}>
                  {option.text}
                </p>
              </div>
            </div>

            {selectedOptions.includes(option.id) && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B89B7A] rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-[#8F7A6A] text-center">
        Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}.
      </div>
    </AnimatedWrapper>
  );
};

export default QuestionCard;
