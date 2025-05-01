
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import QuizResult from '../components/QuizResult';

const ResultPage = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const navigate = useNavigate();

  useEffect(() => {
    // If there's no result, redirect to the homepage
    if (!quizResult && !localStorage.getItem('quizResult')) {
      navigate('/');
    }
  }, [quizResult, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <QuizResult result={quizResult} onReset={resetQuiz} />
    </div>
  );
};

export default ResultPage;
