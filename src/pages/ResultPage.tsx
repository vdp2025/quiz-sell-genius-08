
import React, { useEffect, useState } from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { QuizResult as QuizResultType } from '../types/quiz';
import { toast } from '../components/ui/use-toast';
import { AnimatedWrapper } from '../components/ui/animated-wrapper';
import { Card } from '../components/ui/card';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizResult) {
      setLocalResult(quizResult);
    } else {
      const savedResultStr = localStorage.getItem('quizResult');
      
      if (savedResultStr) {
        try {
          const savedResult = JSON.parse(savedResultStr);
          setLocalResult(savedResult);
        } catch (error) {
          console.error('Error parsing saved results:', error);
          toast({
            title: "Erro ao carregar resultados",
            description: "Não foi possível recuperar seus resultados. Por favor, tente o quiz novamente.",
            variant: "destructive",
          });
        }
      }
    }
  }, [quizResult]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  if (!quizResult && !localResult) {
    return <Navigate to="/" replace />;
  }

  const resultData = quizResult || localResult;

  return (
    <div>
      <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png"
              alt="Logo Gisele Galvão"
              className="h-16 mx-auto mb-6"
            />
          </div>

          <AnimatedWrapper>
            <Card className="p-8 space-y-6 bg-white shadow-md mb-8">
              <h2 className="text-xl font-playfair text-[#432818] text-center mb-6">
                Obrigada por compartilhar.
              </h2>
              
              <p className="text-[#1A1818]/80">
                Chegar até aqui já mostra que você está pronta para se olhar com mais amor, 
                se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade 
                — com leveza, presença e propósito.
              </p>
            </Card>
          </AnimatedWrapper>

          {resultData && (
            <AnimatedWrapper>
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
            </AnimatedWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
