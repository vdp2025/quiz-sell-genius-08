
import React from 'react';
import QuizTransition from '../QuizTransition';
import MainTransition from './MainTransition';
import QuizFinalTransition from '../QuizFinalTransition';
import StrategicQuestions from './StrategicQuestions';
import { UserResponse } from '@/types/quiz';

interface QuizTransitionManagerProps {
  showingTransition: boolean;
  showingFinalTransition: boolean;
  handleStrategicAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
  handleShowResult: () => void;
}

export const QuizTransitionManager: React.FC<QuizTransitionManagerProps> = ({
  showingTransition,
  showingFinalTransition,
  handleStrategicAnswer,
  strategicAnswers,
  handleShowResult,
}) => {
  if (showingFinalTransition) {
    return <QuizFinalTransition onContinue={handleShowResult} />;
  }

  if (showingTransition) {
    return <MainTransition onContinue={handleShowResult} />;
  }

  return null;
};
