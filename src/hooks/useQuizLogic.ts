
import { useState, useCallback } from 'react';
import { useUtmParams } from './quiz/useUtmParams';
import { QuizQuestion, QuizAnswer } from '@/types/quiz';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const { utmSource, utmMedium, utmCampaign } = useUtmParams();

  const handleAnswer = useCallback((question: QuizQuestion, selectedOptions: string[]) => {
    setAnswers(prev => [...prev, { questionId: question.id, selectedOptions }]);
    setCurrentQuestionIndex(prev => prev + 1);
  }, []);

  return {
    currentQuestionIndex,
    answers,
    handleAnswer,
    utmParams: { utmSource, utmMedium, utmCampaign }
  };
};
