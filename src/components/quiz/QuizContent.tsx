
import React from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { QuizHeader } from './QuizHeader';
import { QuizNavigation } from '../navigation/QuizNavigation';
import { UserResponse } from '@/types/quiz';

interface QuizContentProps {
  user: { userName?: string } | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
  currentQuestion: any;
  currentAnswers: string[];
  handleAnswerSubmit: (response: UserResponse) => void;
  handleNextClick: () => void;
  handlePrevious: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  user,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex,
  currentQuestion,
  currentAnswers,
  handleAnswerSubmit,
  handleNextClick,
  handlePrevious,
}) => {
  return (
    <>
      <QuizHeader
        userName={user?.userName}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={showingStrategicQuestions}
        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
      />

      {currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          currentAnswers={currentAnswers}
          onNextClick={handleNextClick}
        />
      )}

      <QuizNavigation
        showPrevious={!showingStrategicQuestions && currentQuestion && currentQuestionIndex > 0}
        onPrevious={handlePrevious}
      />
    </>
  );
};

export { QuizContent };
