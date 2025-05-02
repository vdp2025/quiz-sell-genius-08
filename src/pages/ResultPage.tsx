
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { QuizResult as QuizResultType } from '../types/quiz';
import { trackResultView } from '@/utils/analytics';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Card } from '@/components/ui/card';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

const ResultPage = () => {
  const quizLogic = useQuizLogic();
  const { quizResult, resetQuiz } = quizLogic;
  const navigate = useNavigate();
  const location = useLocation();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [resultTracked, setResultTracked] = useState(false);
  const { globalStyles } = useGlobalStyles();
  
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

  const { primaryStyle, secondaryStyles } = resultToUse;
  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category] || {};

  // Validação adicional para garantir que temos todos os dados necessários
  if (!image || !guideImage || !description) {
    return <ErrorState />;
  }

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles?.backgroundColor || '#fffaf7',
      }}
    >
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
      
      <AnimatedWrapper>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6 mb-8 shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Seu Estilo Principal: {primaryStyle.category}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`Style ${primaryStyle.category}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img
                    src={guideImage}
                    alt="Guia de Estilo"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-12">
            <SecondaryStylesSection secondaryStyles={secondaryStyles || []} />
            <MotivationSection />
            <MentorSection />
            <GuaranteeSection />
            
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <ProductShowcase />
              <BenefitList />
              <Testimonials />
              
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
                >
                  Comprar Agora
                </Button>
              </div>
            </section>
          </div>
        </main>
      </AnimatedWrapper>
    </div>
  );
};

export default ResultPage;
