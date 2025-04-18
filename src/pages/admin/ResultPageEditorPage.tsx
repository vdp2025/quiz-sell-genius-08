
import React from 'react';
import { useQuizContext } from '@/context/QuizContext';
import { StyleResult } from '@/types/quiz';
import ResultPageEditor from '@/components/result-editor/ResultPageEditor';

const ResultPageEditorPage: React.FC = () => {
  const { quizResult } = useQuizContext();
  
  // Caso não haja resultado, usamos um estilo padrão para edição
  const defaultStyle: StyleResult = {
    category: 'Elegante',
    score: 10,
    percentage: 25
  };
  
  const defaultSecondaryStyles: StyleResult[] = [
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
    <ResultPageEditor 
      primaryStyle={primaryStyle}
      secondaryStyles={secondaryStyles.slice(0, 2)}
    />
  );
};

export default ResultPageEditorPage;
