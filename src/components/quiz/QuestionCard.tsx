
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
    return isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-3';
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
              "group relative cursor-pointer transition-all duration-300",
              "hover:scale-[1.02]"
            )}
          >
            <div className={cn(
              "relative h-full flex flex-col",
              "border rounded-lg overflow-hidden transition-all duration-300",
              selectedOptions.includes(option.id)
                ? "border-[#B89B7A] ring-1 ring-[#B89B7A]/30 shadow-sm"
                : "border-[#B89B7A]/20 hover:border-[#B89B7A]/40",
              question.type !== 'text' && "aspect-[3/4]"
            )}>
              {option.imageUrl && (
                <div className="relative w-full h-full">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-300",
                      "group-hover:scale-105"
                    )}
                    loading="lazy"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-black/40 transition-opacity duration-300",
                    selectedOptions.includes(option.id) ? "opacity-0" : "opacity-0 group-hover:opacity-40"
                  )} />
                </div>
              )}
              
              <div className={cn(
                "p-3",
                option.imageUrl ? "absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm" : "flex-1",
                selectedOptions.includes(option.id) && "bg-[#B89B7A]/10"
              )}>
                <p className={cn(
                  "text-sm text-[#432818]",
                  selectedOptions.includes(option.id) && "font-medium"
                )}>
                  {option.text}
                </p>
              </div>
            </div>

            {selectedOptions.includes(option.id) && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B89B7A] rounded-full flex items-center justify-center shadow-sm z-10 animate-scale-in">
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
