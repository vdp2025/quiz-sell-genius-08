
import { useState, useCallback, useEffect } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { QuizResult, StyleResult } from '../types/quiz';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    // Check if we have results in localStorage
    const savedResult = localStorage.getItem('quizResult');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length === currentQuestion?.multiSelect;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  // Efeito para salvar resultados no localStorage quando disponíveis
  useEffect(() => {
    if (quizResult) {
      localStorage.setItem('quizResult', JSON.stringify(quizResult));
      console.log('QuizResult saved to localStorage:', quizResult);
    }
  }, [quizResult]);

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
    
    console.log(`Question ${questionId} answered with options:`, selectedOptions);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      console.log('Last question reached, calculating results...');
      calculateResults();
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const calculateResults = useCallback(() => {
    // Create a counter for each style category
    const styleCounter: Record<string, number> = {
      'Natural': 0,
      'Clássico': 0,
      'Contemporâneo': 0,
      'Elegante': 0,
      'Romântico': 0,
      'Sexy': 0,
      'Dramático': 0,
      'Criativo': 0
    };

    // Count total number of selections
    let totalSelections = 0;

    // Loop through all the answers and count each style
    Object.entries(answers).forEach(([questionId, optionIds]) => {
      // Find the corresponding question
      const question = quizQuestions.find(q => q.id === questionId);
      if (!question) return;

      // For each selected option, increment the counter for its style
      optionIds.forEach(optionId => {
        const option = question.options.find(o => o.id === optionId);
        if (option) {
          styleCounter[option.styleCategory]++;
          totalSelections++;
        }
      });
    });

    // Convert to array and sort by count (descending)
    const styleResults: StyleResult[] = Object.entries(styleCounter)
      .map(([category, score]) => ({
        category: category as StyleResult['category'],
        score,
        percentage: Math.round((score / totalSelections) * 100)
      }))
      .sort((a, b) => b.score - a.score);

    // Get primary style and secondary styles
    const primaryStyle = styleResults[0];
    const secondaryStyles = styleResults.slice(1);

    const result = {
      primaryStyle,
      secondaryStyles,
      totalSelections
    };

    setQuizResult(result);
    console.log('Results calculated:', result);

    return result;
  }, [answers]);

  // This is improved to work better even when not all questions are answered
  const submitQuizIfComplete = useCallback(() => {
    // Calculate with whatever answers we have
    const results = calculateResults();
    setQuizCompleted(true);
    
    // Store results in localStorage for persistence
    localStorage.setItem('quizResult', JSON.stringify(results));
    console.log('Results saved to localStorage before redirect');
    
    return results;
  }, [calculateResults]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    localStorage.removeItem('quizResult');
    setQuizResult(null);
    console.log('Quiz reset');
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    quizCompleted,
    quizResult,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetQuiz,
    submitQuizIfComplete,
    calculateResults,
    totalQuestions: quizQuestions.length
  };
};
