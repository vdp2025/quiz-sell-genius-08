import React, { useState, useEffect } from 'react';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { cn } from '@/lib/utils';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption } from './quiz/QuizOption';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useQuestionScroll } from '@/hooks/useQuestionScroll';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
  hideTitle?: boolean;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  showQuestionImage?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = false,
  hideTitle = false,
  onNextClick,
  onPreviousClick,
  showQuestionImage = false
}) => {
  const isMobile = useIsMobile();
  const isStrategicQuestion = question.id.startsWith('strategic');
  const hasImageOptions = question.type !== 'text';
  const [imageError, setImageError] = useState(false);
  const { scrollToQuestion } = useQuestionScroll();
  
  useEffect(() => {
    scrollToQuestion(question.id);
  }, [question.id, scrollToQuestion]);
  
  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (isStrategicQuestion || autoAdvance) {
        newSelectedOptions = [optionId];
      } else if (currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions
    });

    if ((isStrategicQuestion || autoAdvance) && newSelectedOptions.length > 0 && onNextClick) {
      onNextClick();
    }
  };
  
  const getGridColumns = () => {
    if (question.type === 'text') {
      if (isStrategicQuestion) {
        return "grid-cols-1 gap-3 px-2";
      }
      return isMobile ? "grid-cols-1 gap-3 px-2" : "grid-cols-1 gap-4 px-4";
    }
    return isMobile ? "grid-cols-2 gap-1 px-0.5" : "grid-cols-2 gap-3 px-2";
  };

  return (
    <AnimatedWrapper>
      <div className="space-y-6">
        {!hideTitle && (
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-playfair text-[#432818]">
              {question.title || question.text}
            </h3>
            {!isStrategicQuestion && (
              <p className="text-xs sm:text-sm text-[#1A1818]/50">
                {currentAnswers.length}/{question.multiSelect} selecionadas
              </p>
            )}
          </div>
        )}

        <div className={cn(
          "grid h-full",
          getGridColumns(),
          hasImageOptions && "mb-4 relative",
          isStrategicQuestion && "gap-4"
        )}>
          {question.options.map(option => (
            <QuizOption 
              key={option.id} 
              option={option} 
              isSelected={currentAnswers.includes(option.id)} 
              onSelect={handleOptionSelect}
              type={question.type}
              questionId={question.id}
              isDisabled={!currentAnswers.includes(option.id) && 
                !isStrategicQuestion && 
                currentAnswers.length >= question.multiSelect}
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center gap-3 mt-6">
          {!autoAdvance && (
            <p className="text-xs sm:text-sm text-[#1A1818]/50 px-2 py-2 text-center font-medium">
              {currentAnswers.length}/{question.multiSelect} selecionadas
            </p>
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };