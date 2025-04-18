
import React from 'react';
import { ResultPageEditorWithControls } from '@/components/result-editor/ResultPageEditorWithControls';
import { useQuizContext } from '@/context/QuizContext';
import { styleConfig } from '@/config/styleConfig';

const ResultPageEditorPage: React.FC = () => {
  const { quizResult } = useQuizContext();
  
  // Caso não haja resultado, usamos um estilo padrão para edição
  const defaultStyle = {
    category: 'Elegante',
    score: 10,
    percentage: 25
  };
  
  const defaultSecondaryStyles = [
    {
      category: 'Natural',
      score: 5,
      percentage: 15
    },
    {
      category: 'Contemporâneo',
      score: 3,
      percentage: 10
    }
  ];
  
  // Usamos o resultado do quiz se disponível, ou os valores padrão
  const primaryStyle = quizResult?.primaryStyle || defaultStyle;
  const secondaryStyles = quizResult?.secondaryStyles || defaultSecondaryStyles;

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <ResultPageEditorWithControls 
        primaryStyle={primaryStyle}
        secondaryStyles={secondaryStyles.slice(0, 2)}
      />
    </div>
  );
};

export default ResultPageEditorPage;
