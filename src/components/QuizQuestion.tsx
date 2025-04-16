import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { cn } from '@/lib/utils';
import type { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';

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
  useEffect(() => {
    if (question.type !== 'text') {
      question.options.forEach(opt => {
        if (opt.imageUrl) {
          const img = new Image();
          img.src = opt.imageUrl;
        }
      });
    }
  }, [question]);

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
      <Card className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md" id={`question-${question.id}`}>
        <h2 className="text-2xl font-playfair text-center mb-8 text-[#432818]">
          {question.title}
        </h2>
        
        <div className={cn(
          "grid gap-6",
          question.type === 'text' 
            ? "grid-cols-1" 
            : "grid-cols-1 md:grid-cols-2"
        )}>
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className="relative group"
              onClick={() => handleOptionSelect(option.id)}
            >
              <div 
                className={cn(
                  "transition-all duration-200 rounded-lg p-4 cursor-pointer flex flex-col items-center",
                  currentAnswers.includes(option.id) 
                    ? "border-[#B89B7A] border-[1px] shadow-lg shadow-[#0000003a] dark:shadow-[#0006] transform scale-[1.01]" 
                    : "border border-gray-200 hover:border-[#B89B7A]/50 hover:shadow-sm",
                )}
              >
                {question.type !== 'text' && option.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg border border-[#B89B7A]/10 w-full aspect-[3/4] max-w-[320px] mx-auto">
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className={cn(
                        "object-cover w-full h-full transition-transform duration-300",
                        currentAnswers.includes(option.id) ? "scale-105" : "group-hover:scale-105"
                      )}
                      onError={(e) => {
                        console.error(`Failed to load image: ${option.imageUrl}`);
                        e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
                <p className="text-sm leading-relaxed cursor-pointer text-[#1A1818]/80 text-center max-w-[280px] mx-auto">
                  {option.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-[#1A1818]/60 mt-6 text-center">
          Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}
        </p>
      </Card>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };
