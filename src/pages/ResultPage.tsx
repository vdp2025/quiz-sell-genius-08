
import React from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();

  if (!quizResult) {
    return <Navigate to="/" replace />;
  }

  const handleRetakeQuiz = () => {
    resetQuiz();
    window.location.href = '/';
  };

  return (
    <div>
      <QuizResult 
        primaryStyle={quizResult.primaryStyle} 
        secondaryStyles={quizResult.secondaryStyles} 
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleRetakeQuiz}
        >
          <ArrowLeft className="w-4 h-4" />
          Refazer o Quiz
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
