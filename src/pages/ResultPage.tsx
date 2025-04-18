import React, { useEffect, useState } from 'react';
import QuizResult from '../components/QuizResult';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { QuizResult as QuizResultType } from '../types/quiz';
import { toast } from '../components/ui/use-toast';
import { AnimatedWrapper } from '../components/ui/animated-wrapper';
import { UnifiedEditorLayout } from '../components/editor/layouts/UnifiedEditorLayout';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadResults = () => {
      try {
        // Primeiro, tente usar o resultado do contexto
        if (quizResult) {
          console.log('Usando resultado do contexto:', quizResult);
          setLocalResult(quizResult);
          setLoading(false);
          return;
        }
        
        // Caso contrário, tente carregar do localStorage
        const savedResultStr = localStorage.getItem('quizResult');
        
        if (savedResultStr) {
          try {
            const savedResult = JSON.parse(savedResultStr);
            console.log('Carregado resultado do localStorage:', savedResult);
            
            if (!savedResult.primaryStyle) {
              throw new Error('Formato de resultado inválido');
            }
            
            setLocalResult(savedResult);
            setLoading(false);
          } catch (error) {
            console.error('Erro ao analisar resultados salvos:', error);
            toast({
              title: "Erro ao carregar resultados",
              description: "Não foi possível recuperar seus resultados. Por favor, tente o quiz novamente.",
              variant: "destructive",
            });
            setLoading(false);
          }
        } else {
          console.error('Nenhum resultado encontrado no contexto ou localStorage');
          toast({
            title: "Resultados não encontrados",
            description: "Não foi possível encontrar seus resultados. Por favor, tente o quiz novamente.",
            variant: "destructive",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        setLoading(false);
      }
    };

    // Pequeno delay para garantir que localStorage foi atualizado
    const timer = setTimeout(loadResults, 800);
    return () => clearTimeout(timer);
  }, [quizResult]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#432818]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (!localResult || !localResult.primaryStyle) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#432818] mb-4">Não foi possível encontrar seu resultado.</p>
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

  if (isEditing && localResult) {
    return (
      <UnifiedEditorLayout primaryStyle={localResult.primaryStyle} />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-2xl mx-auto relative">
        <Button 
          variant="outline" 
          className="absolute top-0 right-0 z-10 flex items-center gap-2"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="w-4 h-4" />
          Editar Página
        </Button>
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
