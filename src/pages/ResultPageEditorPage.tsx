
import React from 'react';
import { ResultPageEditorWithControls } from '@/components/result-editor/ResultPageEditorWithControls';
import { StyleResult } from '@/types/quiz';

const ResultPageEditorPage: React.FC = () => {
  // Hardcoded style for now, can be made dynamic later
  const primaryStyle: StyleResult = {
    category: 'Elegante', // This is now properly typed as a valid StyleCategory
    score: 12,
    percentage: 40
  };

  const secondaryStyles: StyleResult[] = [
    {
      category: 'Romântico',
      score: 9,
      percentage: 30
    },
    {
      category: 'Clássico',
      score: 6,
      percentage: 20
    },
    {
      category: 'Contemporâneo',
      score: 3,
      percentage: 10
    }
  ];

  return (
    <ResultPageEditorWithControls 
      primaryStyle={primaryStyle}
      secondaryStyles={secondaryStyles}
    />
  );
};

export default ResultPageEditorPage;
