
import { useState, useCallback } from 'react';
import { useUtmParams } from './quiz/useUtmParams';
import { useQuizNavigation } from './quiz/useQuizNavigation';
import { useQuizAnswers } from './quiz/useQuizAnswers'; 
import { useQuizResults } from './quiz/useQuizResults';
import { QuizQuestion, QuizAnswer, QuizResult, UserResponse } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';

export const useQuizLogic = () => {
  const { 
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    totalQuestions,
    handleNext,
    handlePrevious,
    resetQuiz
  } = useQuizNavigation();
  
  const {
    answers,
    strategicAnswers,
    quizResult,
    setQuizResult,
    handleAnswer: saveAnswer,
    handleStrategicAnswer
  } = useQuizAnswers();
  
  const { calculateResults } = useQuizResults(answers);
  const { utmSource, utmMedium, utmCampaign } = useUtmParams();

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    saveAnswer(questionId, selectedOptions);
  }, [saveAnswer]);

  const currentAnswers = answers[currentQuestion?.id] || [];

  const submitQuizIfComplete = useCallback(() => {
    const results = calculateResults();
    setQuizResult(results);
    localStorage.setItem('quizResult', JSON.stringify(results));
    return results;
  }, [calculateResults, setQuizResult]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    answers,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults,
    handleStrategicAnswer,
    submitQuizIfComplete,
    quizResult,
    resetQuiz,
    utmParams: { utmSource, utmMedium, utmCampaign }
  };
};
