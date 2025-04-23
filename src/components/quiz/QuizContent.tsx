
import React, { useState } from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import { Progress } from '@/components/ui/progress';
import { UserSession } from '@/types/auth';
import { QuizQuestion, UserResponse } from '@/types/quiz';

interface QuizContentProps {
  question?: string;
  options?: any[];
  stage?: number;
  totalStages?: number;
  multiSelect?: number;
  displayType?: 'text' | 'image' | 'both';
  onOptionSelect?: (selectedOptions: number[]) => void;
  onNext?: () => void;
  
  // Additional props needed for QuizPage integration
  user?: UserSession;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  showingStrategicQuestions?: boolean;
  currentStrategicQuestionIndex?: number;
  currentQuestion?: QuizQuestion;
  currentAnswers?: string[];
  handleAnswerSubmit?: (response: UserResponse) => void;
  handleNextClick?: () => void;
  handlePrevious?: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  question,
  options = [],
  stage,
  totalStages,
  multiSelect = 3,
  displayType = 'both',
  onOptionSelect,
  onNext,
  
  // Using the new props if provided (for QuizPage integration)
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  currentAnswers = [],
  handleAnswerSubmit
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  // Determine which data to use (from direct props or from currentQuestion)
  const activeQuestion = question || (currentQuestion?.title || '');
  const activeOptions = options.length > 0 ? options : (currentQuestion?.options || []);
  const activeStage = stage !== undefined ? stage : (currentQuestionIndex !== undefined ? currentQuestionIndex + 1 : 1);
  const activeTotalStages = totalStages || totalQuestions || 1;
  const activeMultiSelect = multiSelect || (currentQuestion?.multiSelect || 3);
  const activeDisplayType = displayType || (currentQuestion?.type || 'both');
  
  const handleOptionClick = (index: number) => {
    if (currentQuestion && handleAnswerSubmit) {
      // For full quiz mode with currentQuestion
      const optionId = currentQuestion.options[index].id;
      
      let newSelectedOptions: string[];
      if (currentAnswers.includes(optionId)) {
        newSelectedOptions = currentAnswers.filter(id => id !== optionId);
      } else {
        if (currentAnswers.length >= currentQuestion.multiSelect) {
          newSelectedOptions = [...currentAnswers.slice(1), optionId];
        } else {
          newSelectedOptions = [...currentAnswers, optionId];
        }
      }
      
      handleAnswerSubmit({
        questionId: currentQuestion.id,
        selectedOptions: newSelectedOptions
      });
    } else {
      // For standalone/preview mode
      if (selectedOptions.includes(index)) {
        setSelectedOptions(prev => prev.filter(i => i !== index));
      } else {
        if (selectedOptions.length < activeMultiSelect) {
          setSelectedOptions(prev => [...prev, index]);
        } else {
          setSelectedOptions(prev => [...prev.slice(1), index]);
        }
      }
      
      if (onOptionSelect) {
        if (selectedOptions.includes(index)) {
          onOptionSelect(selectedOptions.filter(i => i !== index));
        } else {
          const newSelected = selectedOptions.length < activeMultiSelect 
            ? [...selectedOptions, index] 
            : [...selectedOptions.slice(1), index];
          onOptionSelect(newSelected);
        }
      }
    }
  };
  
  const handleNext = () => {
    if (onOptionSelect && selectedOptions.length > 0) {
      onOptionSelect(selectedOptions);
    }
    if (onNext) {
      onNext();
    }
  };
  
  const progressPercent = activeTotalStages > 1 ? (activeStage / activeTotalStages) * 100 : 0;
  const showImages = activeDisplayType === 'image' || activeDisplayType === 'both';
  const showText = activeDisplayType === 'text' || activeDisplayType === 'both';
  
  // Determine if selection is complete based on mode
  const isSelectionComplete = currentQuestion && currentAnswers 
    ? currentAnswers.length === currentQuestion.multiSelect
    : selectedOptions.length === activeMultiSelect;
  
  return (
    <div className="bg-[#FAF9F7] min-h-screen py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Logo className="h-14" />
        </div>
        
        <div className="w-full mb-6">
          <div className="flex justify-between text-sm text-[#8F7A6A] mb-2">
            <span>Questão {activeStage} de {activeTotalStages}</span>
            <span>{Math.round(progressPercent)}% completo</span>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-2 bg-[#E5E1DA]"
            indicatorClassName="bg-[#B89B7A]"
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-playfair text-[#432818] text-center mb-8">
            {activeQuestion}
          </h2>
          
          <p className="text-center text-[#8F7A6A] mb-6">
            Selecione {activeMultiSelect} {activeMultiSelect === 1 ? 'opção' : 'opções'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {activeOptions.map((option, index) => {
              const isSelected = currentQuestion && currentAnswers 
                ? currentAnswers.includes(option.id) 
                : selectedOptions.includes(index);
                
              return (
                <div
                  key={option.id || index}
                  onClick={() => handleOptionClick(index)}
                  className={cn(
                    "border-2 rounded-lg overflow-hidden cursor-pointer transition-all",
                    isSelected 
                      ? "border-[#B89B7A] shadow-md" 
                      : "border-[#E5E1DA] hover:border-[#B89B7A]/50"
                  )}
                >
                  {showImages && option.imageUrl && (
                    <div className="relative">
                      <img 
                        src={option.imageUrl} 
                        alt={option.text} 
                        className="w-full aspect-[4/3] object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#B89B7A] flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showText && (
                    <div className={cn(
                      "p-3",
                      isSelected ? "bg-[#FAF9F7]" : "bg-white"
                    )}>
                      <div className="flex items-center">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex-shrink-0 mr-3",
                          isSelected ? "border-[#B89B7A] bg-[#B89B7A]" : "border-[#B89B7A]"
                        )}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span className="text-[#432818]">{option.text}</span>
                      </div>
                      
                      {option.styleCategory && (
                        <div className="ml-8 mt-1 text-xs text-[#8F7A6A]">
                          Estilo: {option.styleCategory}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isSelectionComplete}
            className={cn(
              "px-6 py-3 rounded-md text-white font-medium transition-all",
              isSelectionComplete 
                ? "bg-[#B89B7A] hover:bg-[#A38A69]" 
                : "bg-[#B89B7A]/40 cursor-not-allowed"
            )}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
