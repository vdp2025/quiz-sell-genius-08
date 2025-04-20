
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import { AnimatedWrapper } from '../ui/animated-wrapper';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer,
}) => {
  const [mountKey, setMountKey] = useState(Date.now());
  
  // Remount component when question changes to ensure clean state
  useEffect(() => {
    setMountKey(Date.now());
  }, [currentQuestionIndex]);

  if (currentQuestionIndex >= strategicQuestions.length) return null;

  const handleNextClick = () => {
    // This is just a placeholder since the actual navigation is handled in the parent component
    console.log('Next clicked in strategic questions');
  };

  return (
    <AnimatedWrapper key={mountKey}>
      <QuizQuestion
        question={strategicQuestions[currentQuestionIndex]}
        onAnswer={onAnswer}
        currentAnswers={answers[strategicQuestions[currentQuestionIndex].id] || []}
        onNextClick={handleNextClick}
      />
    </AnimatedWrapper>
  );
};
