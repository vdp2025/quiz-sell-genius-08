
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { QuizResult as QuizResultType } from '../types/quiz';
import BackupResultPage from '../backup/ResultPage.backup';
import { trackResultView, trackSaleConversion } from '@/utils/analytics';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

const ResultPage = () => {
  const quizLogic = useQuizLogic();
  const { quizResult, resetQuiz } = quizLogic;
  const navigate = useNavigate();
  const location = useLocation();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [resultTracked, setResultTracked] = useState(false);
  
  // Verificar se o parâmetro de acesso está presente na URL
  const searchParams = new URLSearchParams(location.search);
  const isEditorAccessible = searchParams.get('admin') === 'true';

  useEffect(() => {
    // Se não há resultado do contexto, tente carregar do localStorage
    if (!quizResult) {
      try {
        const savedResult = localStorage.getItem('quizResult');
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult);
          setLocalResult(parsedResult);
          
          // Rastrear visualização de resultado se ainda não foi rastreado
          if (!resultTracked && parsedResult?.primaryStyle?.category) {
            // Obter informações do usuário para rastreamento
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            
            trackResultView(parsedResult.primaryStyle.category);
            setResultTracked(true);
          }
        } else {
          // Nenhum resultado encontrado, redirecionar para homepage
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading quiz result:", error);
        navigate('/');
      }
    } else if (!resultTracked && quizResult?.primaryStyle?.category) {
      // Rastrear visualização de resultado do contexto se ainda não foi rastreado
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      
      trackResultView(quizResult.primaryStyle.category);
      setResultTracked(true);
    }
  }, [quizResult, navigate, resultTracked]);

  // Função para rastrear compra quando o usuário clicar em um botão de compra
  const handlePurchaseClick = (productId: string, value: number) => {
    // Rastrear conversão de venda
    trackSaleConversion(value);
    
    // Aqui você redirecionaria para a página de pagamento ou integraria com sua plataforma de pagamentos
    console.log(`Produto ${productId} comprado por ${value}`);
    
    // Exemplo: redirecionar para uma página externa
    // window.location.href = `https://sua-plataforma-de-pagamentos.com/checkout/${productId}`;
  };

  const handleEditClick = () => {
    navigate('/resultado/editar');
  };

  const resultToUse = quizResult || localResult;

  if (!resultToUse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Carregando resultado...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {isEditorAccessible && (
        <div className="fixed top-4 right-4 z-50">
          <Button 
            onClick={handleEditClick} 
            variant="secondary" 
            className="flex items-center gap-2"
          >
            <PencilIcon size={16} />
            Editar Página
          </Button>
        </div>
      )}
      <BackupResultPage />
    </>
  );
};

export default ResultPage;
