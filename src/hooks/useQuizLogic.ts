
import { useCallback, useEffect } from 'react';
import { useUtmParams } from './quiz/useUtmParams';
import { useQuizAnswers } from './quiz/useQuizAnswers';
import { useQuizNavigation } from './quiz/useQuizNavigation';
import { useQuizResults } from './quiz/useQuizResults';

export const useQuizLogic = () => {
  const { utmParams } = useUtmParams();
  const { 
    answers, 
    strategicAnswers, 
    quizResult, 
    setQuizResult, 
    handleAnswer, 
    handleStrategicAnswer 
  } = useQuizAnswers();
  const {
    currentQuestion,
    currentQuestionIndex,
    isLastQuestion,
    quizCompleted,
    setQuizCompleted,
    totalQuestions,
    handleNext,
    handlePrevious,
    resetQuiz
  } = useQuizNavigation();
  const { calculateResults } = useQuizResults(answers);

  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length === (currentQuestion?.multiSelect || 0);

  const startQuiz = useCallback(async (name: string, quizId: string) => {
    console.log('Quiz started with UTM params:', utmParams);
    return {
      id: '1',
      name,
      utmParams
    };
  }, [utmParams]);

  const submitQuizIfComplete = useCallback(() => {
    const results = calculateResults();
    setQuizCompleted(true);
    setQuizResult(results);
    
    localStorage.setItem('quizResult', JSON.stringify(results));
    localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
    console.log('Results saved to localStorage:', results);
    
    return results;
  }, [calculateResults, strategicAnswers, setQuizCompleted, setQuizResult]);

  useEffect(() => {
    if (quizResult) {
      localStorage.setItem('quizResult', JSON.stringify(quizResult));
      console.log('QuizResult saved to localStorage:', quizResult);
    }
  }, [quizResult]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    quizCompleted,
    quizResult,
    totalQuestions,
    strategicAnswers,
    utmParams,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetQuiz,
    submitQuizIfComplete,
    calculateResults,
    handleStrategicAnswer,
    startQuiz
  };
};
