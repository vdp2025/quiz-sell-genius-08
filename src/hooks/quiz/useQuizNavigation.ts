
import { useState, useCallback } from 'react';
import { quizQuestions } from '../../data/quizQuestions';

export const useQuizNavigation = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    quizCompleted,
    setQuizCompleted,
    totalQuestions,
    handleNext,
    handlePrevious,
    resetQuiz
  };
};
