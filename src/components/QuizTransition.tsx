import React, { useState } from 'react';
import { Card } from './ui/card';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { QuizQuestion } from './QuizQuestion';
import { strategicQuestions } from '../data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { Button } from './ui/button';

interface QuizTransitionProps {
  onContinue: () => void;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
}

const QuizTransition: React.FC<QuizTransitionProps> = ({ 
  onContinue, 
  onAnswer, 
  currentAnswers 
}) => {
  // Estado para controlar as seleções
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentAnswers || []);
  const [canAdvance, setCanAdvance] = useState(false);

  // Constantes para controle de seleções
  const STRATEGIC_MIN_SELECTIONS = 1;
  const NORMAL_REQUIRED_SELECTIONS = 3;

  // Função para verificar se pode avançar baseado no tipo de pergunta
  const checkCanAdvance = (options: string[], isStrategic: boolean) => {
    if (isStrategic) {
      return options.length >= STRATEGIC_MIN_SELECTIONS;
    } else {
      return options.length === NORMAL_REQUIRED_SELECTIONS;
    }
  };

  // Manipulador de seleção atualizado
  const handleOptionSelect = (response: UserResponse) => {
    setSelectedOptions(response.selectedOptions);
    setCanAdvance(checkCanAdvance(response.selectedOptions, true));
  };

  // Manipulador de resposta atualizado
  const handleFirstStrategicAnswer = () => {
    if (canAdvance) {
      onAnswer({
        questionId: strategicQuestions[0].id,
        selectedOptions: selectedOptions
      });
      
      // Efeito de transição suave
      const button = document.activeElement as HTMLElement;
      if (button) button.blur();
      
      setTimeout(() => {
        onContinue();
      }, 500);
    }
  };

  // Função para renderizar o texto do botão
  const getButtonText = () => {
    if (canAdvance) {
      return 'Avançar';
    }
    if (selectedOptions.length === 0) {
      return 'Selecione uma opção para continuar';
    }
    return `Selecione ${STRATEGIC_MIN_SELECTIONS - selectedOptions.length} opção restante`;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedWrapper>
          <Card className="p-6 sm:p-8 space-y-6 sm:space-y-8 bg-white shadow-md mb-8 sm:mb-10 border-[#B89B7A]/20">
            <h2 className="text-[20px] sm:text-[24px] font-playfair text-[#432818] text-center tracking-normal font-semibold">
              Enquanto calculamos o seu resultado...
            </h2>
            
            <p className="text-[#1A1818]/80 text-[16px]">
              Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.
            </p>
            
            <p className="text-[#1A1818]/80 text-[16px]">
              A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.
            </p>
            
            <div className="bg-[#B89B7A]/10 p-4 sm:p-6 rounded-lg">
              <p className="text-[#432818] italic text-center font-medium text-[16px]">
                Responda com sinceridade. Isso é só entre você e a sua nova versão.
              </p>
            </div>
          </Card>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <QuizQuestion
            question={strategicQuestions[0]}
            onAnswer={handleOptionSelect}
            currentAnswers={selectedOptions}
            autoAdvance={false}
            isStrategic={true}
          />
          
          <Button
            onClick={handleFirstStrategicAnswer}
            disabled={!canAdvance}
            className="
              w-full 
              mt-4 
              bg-[#B89B7A] 
              text-white 
              py-3 sm:py-4
              text-[14px] sm:text-[16px]
              font-semibold
              rounded-md 
              shadow-md
              transition-all 
              duration-300
              hover:animate-subtle-pulse
              active:scale-[0.98]
              disabled:opacity-50 
              disabled:cursor-not-allowed
              disabled:hover:animate-none
              border-0
              [background:linear-gradient(45deg,#B89B7A,#b29670)]
            "
            style={{
              background: 'linear-gradient(45deg, #B89B7A, #b29670)'
            }}
          >
            {getButtonText()}
          </Button>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default QuizTransition;