
import React, { useState } from 'react';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { cn } from '@/lib/utils';
import { UserResponse, QuizQuestion } from '@/types/quiz';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { strategicQuestions } from '@/data/strategicQuestions';
import { QuizOption } from './QuizOption';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
  onNextClick: () => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer,
  onNextClick,
}) => {
  const currentQuestion = strategicQuestions[currentQuestionIndex] as QuizQuestion;
  const currentAnswers = answers[currentQuestion?.id] || [];
  const [imageError, setImageError] = useState(false);
  
  if (!currentQuestion) return null;
  
  const handleOptionSelect = (optionId: string) => {
    onAnswer({
      questionId: currentQuestion.id,
      selectedOptions: [optionId],
    });
    
    setTimeout(onNextClick, 500);
  };
  
  return (
    <AnimatedWrapper>
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="font-playfair text-center mb-6 px-3 text-xl md:text-2xl text-[#432818] font-medium">
          {currentQuestion.title}
        </h2>
        
        {currentQuestion.imageUrl && !imageError && (
          <div className="mb-8">
            <img 
              src={currentQuestion.imageUrl}
              alt="Question visual"
              className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              onError={() => {
                console.error(`Failed to load image: ${currentQuestion.imageUrl}`);
                setImageError(true);
              }}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4 px-4">
          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={currentAnswers.includes(option.id)}
              onSelect={handleOptionSelect}
              type={currentQuestion.type}
              questionId={currentQuestion.id}
            />
          ))}
        </div>
        
        {currentAnswers.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={onNextClick}
              className="bg-[#B89B7A] hover:bg-[#B89B7A]/90"
            >
              Próxima <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
};
