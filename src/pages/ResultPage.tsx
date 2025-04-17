
import React, { useEffect } from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();

  useEffect(() => {
    // Log para depuração
    console.log('ResultPage - quizResult:', quizResult);
  }, [quizResult]);

  // Se não houver resultado, tente buscar do localStorage
  if (!quizResult) {
    console.log('No quizResult in state, checking localStorage...');
    const savedResult = localStorage.getItem('quizResult');
    
    if (!savedResult) {
      console.log('No saved results found, redirecting to home page');
      return <Navigate to="/" replace />;
    }
    
    // Se encontrar no localStorage, continue com a renderização
    console.log('Found saved results in localStorage');
  }

  const handleRetakeQuiz = () => {
    resetQuiz();
    window.location.href = '/';
  };

  return (
    <div>
      {quizResult ? (
        <>
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
        </>
      ) : (
        <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-playfair text-[#432818] mb-4">Carregando resultados...</h2>
            <p className="text-[#1A1818]/80 mb-6">
              Se os resultados não aparecerem, pode ser que o quiz não tenha sido concluído.
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
