
import React from 'react';

interface QuizTransitionManagerProps {
  showingTransition: boolean;
  showingFinalTransition: boolean;
  handleStrategicAnswer: any;
  strategicAnswers: Record<string, string[]>;
  handleShowResult: () => void;
}

export const QuizTransitionManager: React.FC<QuizTransitionManagerProps> = ({
  showingTransition,
  showingFinalTransition,
  handleStrategicAnswer,
  strategicAnswers,
  handleShowResult
}) => {
  if (!showingTransition && !showingFinalTransition) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <h2 className="text-2xl font-playfair text-[#432818] mb-4">
        {showingFinalTransition ? "Preparando seu resultado..." : "Próxima etapa..."}
      </h2>
      
      <p className="text-[#8F7A6A] mb-6">
        {showingFinalTransition 
          ? "Estamos analisando suas respostas para revelar seu estilo predominante" 
          : "Vamos para algumas perguntas estratégicas para entender melhor suas preferências"}
      </p>
      
      <button 
        onClick={showingFinalTransition ? handleShowResult : () => {}}
        className="px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A38A69] transition-colors"
      >
        {showingFinalTransition ? "Ver meu resultado" : "Continuar"}
      </button>
    </div>
  );
};
