
import React from 'react';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { Progress } from '../ui/progress';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentStep,
  totalSteps
}) => {
  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);
  
  return (
    <AnimatedWrapper className="mt-6 mb-8">
      <div className="flex justify-between items-center text-xs text-[#8F7A6A] mb-2">
        <span>Progresso</span>
        <span>{progressPercentage}%</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="w-full h-1.5 bg-[#F3E8E6]" 
        indicatorClassName="bg-[#B89B7A]"
      />
    </AnimatedWrapper>
  );
};

export default QuizProgress;
