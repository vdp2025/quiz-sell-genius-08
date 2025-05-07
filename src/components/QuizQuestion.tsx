import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';
import { QuizOption } from './quiz/QuizOption';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { Button } from './ui/button';
import { ArrowRight, ImageIcon } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollToQuestion } = useQuestionScroll();
  
  // Verifica se temos exatamente 3 opções selecionadas
  const hasThreeOptionsSelected = currentAnswers.length === 3;
  
  useEffect(() => {
    scrollToQuestion(question.id);
  }, [question.id, scrollToQuestion]);
  
  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (isStrategicQuestion) {
        newSelectedOptions = [optionId];
      } else if (question.multiSelect && currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions
    });

    // Auto advance if:
    // 1. It's a strategic question and we have a selection
    // 2. Auto advance is enabled and we've reached the required number of selections
    // 3. onNextClick function is provided
    const shouldAutoAdvance = 
      (isStrategicQuestion && newSelectedOptions.length > 0) || 
      (autoAdvance && newSelectedOptions.length === question.multiSelect);
    
    if (shouldAutoAdvance && onNextClick) {
      // Remover o atraso para evitar efeitos de flash
      onNextClick();
    }
  };
  
  const getGridColumns = () => {
    if (question.type === 'text') {
      if (isStrategicQuestion) {
        return "grid-cols-1 gap-4 px-2"; // Increased gap for strategic questions
      }
      return isMobile ? "grid-cols-1 gap-3 px-2" : "grid-cols-1 gap-4 px-4";
    }
    return isMobile ? "grid-cols-2 gap-1 px-0.5" : "grid-cols-2 gap-3 px-2";
  };
  
  return (
    <div className={cn("w-full max-w-6xl mx-auto pb-5 relative", 
      isMobile && "px-2", 
      isStrategicQuestion && "max-w-3xl"
    )} id={`question-${question.id}`}>
      {!hideTitle && (
        <>
          <h2 className={cn(
            "font-playfair text-center mb-5 px-3 pt-3 text-brand-coffee font-semibold tracking-normal",
            isMobile ? "text-base" : "text-base sm:text-xl",
            isStrategicQuestion && "text-[#432818] mb-6 font-medium whitespace-pre-line"
          )}>
            {highlightStrategicWords(question.title)}
          </h2>
          
          {/* Removida a barra de progresso duplicada para questões estratégicas */}
          {isStrategicQuestion && !hideTitle && (
            <p className="text-xs sm:text-sm text-[#1A1818]/70 px-2 py-2 mb-4 text-center font-medium">
              Selecione 1 opção para avançar
            </p>
          )}
          
          {isStrategicQuestion && question.imageUrl && showQuestionImage && (
            <div className="w-full mb-8 transition-all duration-300">
              {!imageLoaded && !imageError && (
                <div className="w-full max-w-md h-44 mx-auto rounded-lg bg-[#F5F2EE] animate-pulse flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-[#B89B7A]/40" />
                </div>
              )}
              <img 
                src={question.imageUrl} 
                alt="Ilustração da questão" 
                className={cn(
                  "w-full max-w-md mx-auto rounded-lg shadow-md transition-all duration-300",
                  "hover:scale-[1.01] hover:shadow-lg", // Add subtle hover effect
                  imageLoaded ? "opacity-100" : "opacity-0 absolute",
                  imageError && "hidden"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`Failed to load image: ${question.imageUrl}`);
                  setImageError(true);
                }}
              />
            </div>
          )}
          
          {!isStrategicQuestion && (
            <p className="text-xs sm:text-sm text-[#1A1818]/70 px-2 py-2 mb-4 text-center font-medium">
              {`Selecione ${question.multiSelect} opções para avançar`}
            </p>
          )}
        </>
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
      
      {!autoAdvance && !isStrategicQuestion && (
        <div className={cn(
          "flex justify-between items-center gap-3 mt-6",
          isMobile ? "flex-col" : "flex-row" // Corrigir alinhamento no mobile
        )}>
          <p className={cn(
            "text-xs sm:text-sm text-[#1A1818]/70 px-2 py-2 font-medium",
            isMobile ? "text-center w-full" : ""
          )}>
            Selecione {question.multiSelect} {question.multiSelect === 1 ? 'Opção' : 'Opções'} para avançar
          </p>
          
          {/* Botão "próxima" - será mostrado apenas quando houver 3 opções selecionadas */}
          {hasThreeOptionsSelected && onNextClick && (
            <div className={cn(
              "transition-all duration-300 ease-in-out",
              isMobile ? "w-full flex justify-center mt-2" : "ml-auto"
            )}>
              <Button 
                onClick={onNextClick}
                className={cn(
                  "bg-[#b29670] hover:bg-[#a38661] text-white rounded-full",
                  "flex items-center gap-2 px-5 py-2.5 shadow-md",
                  "transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]",
                  isMobile ? "w-full max-w-xs" : ""
                )}
              >
                <span>Próxima</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { QuizQuestion };

