
import React, { useEffect, useState } from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QuizResult as QuizResultType } from '../types/quiz';
import { toast } from '../components/ui/use-toast';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to load results from state or localStorage
    if (quizResult) {
      console.log('Using quizResult from state:', quizResult);
      setLocalResult(quizResult);
      setLoading(false);
    } else {
      console.log('No quizResult in state, checking localStorage...');
      const savedResultStr = localStorage.getItem('quizResult');
      
      if (savedResultStr) {
        try {
          const savedResult = JSON.parse(savedResultStr);
          console.log('Found saved results in localStorage:', savedResult);
          setLocalResult(savedResult);
        } catch (error) {
          console.error('Error parsing saved results:', error);
          toast({
            title: "Erro ao carregar resultados",
            description: "Não foi possível recuperar seus resultados. Por favor, tente o quiz novamente.",
            variant: "destructive",
          });
        }
      } else {
        console.log('No saved results found');
      }
      setLoading(false);
    }
  }, [quizResult]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  // Se ainda estiver carregando, mostra estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-playfair text-[#432818] mb-4">Carregando resultados...</h2>
        </div>
      </div>
    );
  }

  // Se não houver resultados, redireciona para a página inicial
  if (!quizResult && !localResult) {
    console.log('No results found, redirecting to home page');
    return <Navigate to="/" replace />;
  }

  const resultData = quizResult || localResult;

  return (
    <div>
      {resultData ? (
        <>
          <QuizResult 
            primaryStyle={resultData.primaryStyle} 
            secondaryStyles={resultData.secondaryStyles} 
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
            <h2 className="text-2xl font-playfair text-[#432818] mb-4">Nenhum resultado encontrado</h2>
            <p className="text-[#1A1818]/80 mb-6">
              Parece que você ainda não completou o quiz.
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
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
