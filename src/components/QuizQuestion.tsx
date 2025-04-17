
import React from 'react';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { cn } from '@/lib/utils';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption } from './quiz/QuizOption';
import { highlightStrategicWords } from '@/utils/textHighlight';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = true,
}) => {
  const isMobile = useIsMobile();

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions,
    });
  };

  return (
    <AnimatedWrapper>
      <div className="w-full max-w-4xl mx-auto" id={`question-${question.id}`}>
        <h2 className="text-base sm:text-xl font-playfair text-center mb-4 px-2 pt-2 text-[#432818] font-semibold">
          {highlightStrategicWords(question.title)}
        </h2>
        
        <div className={cn(
          "grid",
          question.type === 'text' 
            ? "grid-cols-1 gap-4 px-4" 
            : isMobile ? "grid-cols-2 gap-2 px-2" : "grid-cols-2 gap-6 px-4"
        )}>
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={currentAnswers.includes(option.id)}
              onSelect={handleOptionSelect}
              type={question.type}
            />
          ))}
        </div>
        
        <p className="text-2xs sm:text-sm text-[#1A1818]/60 px-2 pb-2 mt-2 text-center">
          Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}
        </p>
      </div>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };
