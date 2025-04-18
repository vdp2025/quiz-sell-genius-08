
import React, { useEffect, useState } from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QuizResult as QuizResultType } from '../types/quiz';
import { toast } from '../components/ui/use-toast';
import { AnimatedWrapper } from '../components/ui/animated-wrapper';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load the quiz result from the context or localStorage
    if (quizResult) {
      console.log('Using quiz result from context:', quizResult);
      setLocalResult(quizResult);
      setLoading(false);
    } else {
      const savedResultStr = localStorage.getItem('quizResult');
      
      if (savedResultStr) {
        try {
          const savedResult = JSON.parse(savedResultStr);
          console.log('Loaded result from localStorage:', savedResult);
          setLocalResult(savedResult);
          setLoading(false);
        } catch (error) {
          console.error('Error parsing saved results:', error);
          toast({
            title: "Erro ao carregar resultados",
            description: "Não foi possível recuperar seus resultados. Por favor, tente o quiz novamente.",
            variant: "destructive",
          });
          setLoading(false);
        }
      } else {
        console.error('No results found in context or localStorage');
        toast({
          title: "Resultados não encontrados",
          description: "Não foi possível encontrar seus resultados. Por favor, tente o quiz novamente.",
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  }, [quizResult]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  // Show loading state while waiting for results
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#432818]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  // If no results are found after loading completes, show error and button to return
  if (!localResult) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#432818]">Não foi possível encontrar seu resultado.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <AnimatedWrapper>
          <QuizResult 
            primaryStyle={localResult.primaryStyle} 
            secondaryStyles={localResult.secondaryStyles} 
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
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default ResultPage;
