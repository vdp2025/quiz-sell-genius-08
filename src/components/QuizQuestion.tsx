
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
  hideTitle?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = false,
  hideTitle = false,
}) => {
  const isMobile = useIsMobile();
  const isStrategicQuestion = question.id.startsWith('strategic');
  const hasImageOptions = question.type !== 'text';

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (autoAdvance) {
        newSelectedOptions = [optionId];
      } else if (currentAnswers.length >= question.multiSelect) {
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

  const getGridColumns = () => {
    if (question.type === 'text') {
      if (isStrategicQuestion) {
        return "grid-cols-1 gap-3 px-2";
      }
      
      return isMobile 
        ? "grid-cols-1 gap-3 px-2"
        : "grid-cols-1 gap-4 px-4";
    }
    
    return isMobile 
      ? "grid-cols-2 gap-1 px-0.5"
      : "grid-cols-2 gap-3 px-2";
  };

  return (
    <AnimatedWrapper>
      <div 
        className={cn(
          "w-full max-w-6xl mx-auto pb-5",
          isMobile && "px-2",
          isStrategicQuestion && "max-w-3xl"
        )} 
        id={`question-${question.id}`}
      >
        {!hideTitle && (
          <h2 className={cn(
            "text-base sm:text-xl font-playfair text-center mb-5 px-3 pt-3 text-brand-coffee font-semibold tracking-normal",
            isStrategicQuestion && "text-[#432818] text-xl sm:text-2xl mb-6 font-medium whitespace-pre-line"
          )}>
            {highlightStrategicWords(question.title)}
          </h2>
        )}
        
        <div className={cn(
          "grid h-full",
          getGridColumns(),
          (question.id === '1' || question.id === '2') && isMobile && "grid-rows-4 auto-rows-fr gap-y-3",
          hasImageOptions && "mb-4 relative",
          isStrategicQuestion && "gap-4"
        )}>
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={currentAnswers.includes(option.id)}
              onSelect={handleOptionSelect}
              type={question.type}
              questionId={question.id}
            />
          ))}
        </div>
        
        {!autoAdvance && (
          <p className="text-xs sm:text-sm text-[#1A1818]/70 px-2 py-2 mt-3 text-center font-medium">
            Selecione 3 Opções para avançar
          </p>
        )}
      </div>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };
