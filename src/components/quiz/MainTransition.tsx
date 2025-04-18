
import React, { useState } from 'react';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { Card } from '../ui/card';
import { QuizQuestion } from '../QuizQuestion';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { toast } from '../ui/use-toast';

interface MainTransitionProps {
  onAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
}

export const MainTransition: React.FC<MainTransitionProps> = ({
  onAnswer,
  strategicAnswers,
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestionAnswer = (response: UserResponse) => {
    try {
      console.log('Strategic Question Answered:', response);
      onAnswer(response);
      
      setTimeout(() => {
        if (currentQuestionIndex < strategicQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }, 500);
    } catch (error) {
      console.error('Error handling strategic question:', error);
      toast({
        title: "Erro na transição do quiz",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const currentQuestion = strategicQuestions[currentQuestionIndex] || null;
  const currentAnswersForQuestion = currentQuestion 
    ? (strategicAnswers[currentQuestion.id] || []) 
    : [];

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-10 flex items-start justify-center">
      <div className="max-w-3xl w-full mx-auto">
        <AnimatedWrapper>
          <Card className="p-8 space-y-8 bg-white shadow-lg border-[#B89B7A]/20 mb-10">
            <h2 className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-bold mt-4 bg-gradient-to-r from-[#B89B7A] to-[#432818] bg-clip-text text-transparent">
              Enquanto calculamos o seu resultado...
            </h2>
            
            <p className="text-[#1A1818]/90 text-lg">
              Queremos te fazer algumas perguntas que vão tornar sua <strong className="text-[#432818]">experiência</strong> ainda mais <strong className="text-[#432818]">completa</strong>.
            </p>
            
            <p className="text-[#1A1818]/90 text-lg">
              A ideia é simples: te ajudar a enxergar com mais <strong className="text-[#432818]">clareza</strong> onde você está agora — e para onde pode ir com mais <strong className="text-[#432818]">intenção</strong>, <strong className="text-[#432818]">leveza</strong> e <strong className="text-[#432818]">autenticidade</strong>.
            </p>
            
            <div className="bg-gradient-to-r from-[#B89B7A]/10 to-[#432818]/10 p-6 rounded-lg border border-[#B89B7A]/20">
              <p className="text-[#432818] italic text-center font-medium text-lg">
                Responda com <strong className="text-[#432818] not-italic">sinceridade</strong>. Isso é só entre você e a sua <strong className="text-[#432818] not-italic">nova versão</strong>.
              </p>
            </div>
          </Card>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <Card className="p-8 space-y-6 bg-white shadow-lg border-[#B89B7A]/20 mb-10">
            <div className="relative">
              <div className="absolute -top-3 -right-3">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold leading-none text-[#432818] bg-[#B89B7A]/20 rounded-full">
                  Fase 2
                </span>
              </div>
              <QuizQuestion
                key={strategicQuestions[0].id}
                question={strategicQuestions[0]}
                onAnswer={handleQuestionAnswer}
                currentAnswers={currentAnswersForQuestion}
                autoAdvance={true}
              />
            </div>
          </Card>
        </AnimatedWrapper>
      </div>
    </div>
  );
};
