import React from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { QuizHeader } from './QuizHeader';
import { StrategicQuestions } from './StrategicQuestions';

interface QuizContentProps {
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

export const QuizContent: React.FC<QuizContentProps> = ({
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
  // Buscar nome do usuário apenas do localStorage
  const userName = localStorage.getItem('userName') || '';

  return (
    <>
      <QuizHeader 
        userName={userName}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={showingStrategicQuestions}
        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
      />

      <div className="container mx-auto px-4 py-8 w-full max-w-5xl">
        {showingStrategicQuestions ? (
          <StrategicQuestions
            currentQuestionIndex={currentStrategicQuestionIndex}
            answers={{}}
            onAnswer={handleAnswerSubmit}
            onNextClick={handleNextClick}
          />
        ) : (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswerSubmit}
            currentAnswers={currentAnswers || []}
            onNextClick={handleNextClick}
            showQuestionImage={true}
            onPreviousClick={handlePrevious}
          />
        )}
      </div>
    </>
  );
};
