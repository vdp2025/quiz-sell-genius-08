
import React from 'react';
import { QuizQuestion } from '../../types/quiz';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { Progress } from '../ui/progress';

interface QuizHeaderProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  question,
  questionIndex,
  totalQuestions
}) => {
  const userName = localStorage.getItem('userName') || 'Visitante';
  
  return (
    <>
      <AnimatedWrapper>
        <Progress 
          value={Math.round(((questionIndex + 1) / totalQuestions) * 100)} 
          className="w-full h-2 bg-[#B89B7A]/20" 
          indicatorClassName="bg-[#B89B7A]" 
        />
      </AnimatedWrapper>
      
      <AnimatedWrapper className="flex justify-between items-center mb-8">
        <h1 className="text-base font-playfair text-[#432818]">
          Olá, {userName}!
        </h1>
        <div className="text-sm text-[#1A1818]/60">
          {questionIndex + 1} de {totalQuestions}
        </div>
      </AnimatedWrapper>
      
      <AnimatedWrapper>
        <h2 className="text-xl md:text-2xl font-playfair text-[#432818] mb-6">
          {question.title}
        </h2>
      </AnimatedWrapper>
    </>
  );
};

export { QuizHeader };

