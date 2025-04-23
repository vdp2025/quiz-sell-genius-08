
import React from 'react';
import { UserSession } from '@/types/auth';
import QuizQuestion from '../QuizQuestion';
import QuizHeader from './QuizHeader';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { QuizQuestion as QuizQuestionType, UserResponse } from '@/types/quiz';

export interface QuizContentProps {
  user?: UserSession;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: QuizQuestionType;
  currentAnswers: string[];
  handleAnswerSubmit: (response: UserResponse) => void;
  handleNextClick: () => void;
  handlePrevious: () => void;
  showingStrategicQuestions?: boolean;
  currentStrategicQuestionIndex?: number;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  user,
  currentQuestionIndex,
  totalQuestions,
  currentQuestion,
  currentAnswers,
  handleAnswerSubmit,
  handleNextClick,
  handlePrevious,
  showingStrategicQuestions = false,
  currentStrategicQuestionIndex = 0
}) => {
  return (
    <AnimatedWrapper>
      <div className="pt-2 pb-4 px-3 mx-auto max-w-6xl">
        <QuizHeader 
          progress={(currentQuestionIndex + 1) / totalQuestions * 100}
          userName={user?.userName || ''}
        />
        
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          currentAnswers={currentAnswers}
          onNextClick={handleNextClick}
        />
      </div>
    </AnimatedWrapper>
  );
};

export default QuizContent;
