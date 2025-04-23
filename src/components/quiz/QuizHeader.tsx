
import React from 'react';
import { QuizQuestion } from '../../types/quiz';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { Progress } from '../ui/progress';

interface QuizHeaderProps {
  question?: QuizQuestion;
  questionIndex?: number;
  totalQuestions: number;
  // Adding new props to match what's being passed in QuizContent.tsx
  userName?: string;
  currentQuestionIndex?: number;
  showingStrategicQuestions?: boolean;
  currentStrategicQuestionIndex?: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  question,
  questionIndex,
  totalQuestions,
  userName: userNameProp,
  currentQuestionIndex,
  showingStrategicQuestions,
  currentStrategicQuestionIndex
}) => {
  // Use either provided userName prop or get from localStorage
  const userName = userNameProp || localStorage.getItem('userName') || 'Visitante';
  
  // Use appropriate question index depending on what's provided
  const displayIndex = questionIndex !== undefined 
    ? questionIndex 
    : currentQuestionIndex !== undefined 
      ? currentQuestionIndex 
      : 0;
  
  // Calculate progress percentage
  const progressPercentage = Math.round(((displayIndex + 1) / totalQuestions) * 100);
  
  return (
    <>
      <AnimatedWrapper>
        <Progress 
          value={progressPercentage} 
          className="w-full h-2 bg-[#B89B7A]/20" 
          indicatorClassName="bg-[#B89B7A]" 
        />
      </AnimatedWrapper>
      
      <AnimatedWrapper className="flex justify-between items-center mb-8">
        <h1 className="text-base font-playfair text-[#432818]">
          Olá, {userName}!
        </h1>
        <div className="text-sm text-[#1A1818]/60">
          {displayIndex + 1} de {totalQuestions}
        </div>
      </AnimatedWrapper>
      
      {question && (
        <AnimatedWrapper>
          <h2 className="text-xl md:text-2xl font-playfair text-[#432818] mb-6">
            {question.title}
          </h2>
        </AnimatedWrapper>
      )}
    </>
  );
};

export { QuizHeader };
