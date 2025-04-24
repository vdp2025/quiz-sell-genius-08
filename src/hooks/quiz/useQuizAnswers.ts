
import { useState, useCallback } from 'react';
import { QuizResult } from '@/types/quiz';

export const useQuizAnswers = () => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>(() => {
    const savedAnswers = localStorage.getItem('strategicAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    const savedResult = localStorage.getItem('quizResult');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: selectedOptions
      };
      console.log(`Question ${questionId} answered with options:`, selectedOptions);
      return newAnswers;
    });
  }, []);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setStrategicAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: selectedOptions
      };
      localStorage.setItem('strategicAnswers', JSON.stringify({
        ...prev,
        [questionId]: selectedOptions
      }));
      return newAnswers;
    });
  }, []);

  return {
    answers,
    strategicAnswers,
    quizResult,
    setQuizResult,
    handleAnswer,
    handleStrategicAnswer
  };
};
