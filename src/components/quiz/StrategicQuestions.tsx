import React from 'react';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import QuizQuestion from '../QuizQuestion';
import { strategicQuestions } from '../../data/strategicQuestions';
import { UserResponse } from '@/types/quiz';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  currentAnswers: string[];
  onAnswer: (response: UserResponse) => void;
  onComplete: () => void;
}

const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  currentAnswers,
  onAnswer,
  onComplete
}) => {
  const handleStrategicAnswer = (response: UserResponse) => {
    onAnswer(response);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedWrapper>
          <QuizQuestion
            question={strategicQuestions[currentQuestionIndex]}
            onAnswer={handleStrategicAnswer}
            currentAnswers={currentAnswers}
            autoAdvance={true}
            hideTitle={true}
            onNextClick={onComplete}
          />
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default StrategicQuestions;
