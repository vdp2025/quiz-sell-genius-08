
import React, { useState, useEffect } from 'react';
import { UnifiedVisualEditor } from '@/components/unified-editor/UnifiedVisualEditor';
import { LoadingState } from '@/components/ui/loading-state';
import { StyleResult } from '@/types/quiz';

const UnifiedEditorPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);

  // Carregar o estilo primário para os editores
  useEffect(() => {
    // Simulando o carregamento de um estilo para desenvolvimento
    // Em produção, isso viria de uma API ou localStorage
    const defaultPrimaryStyle: StyleResult = {
      category: 'Elegante',
      score: 12,
      percentage: 40
    };

    // Tentar carregar do localStorage primeiro
    const savedResult = localStorage.getItem('quiz_result');
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
        } else {
          setPrimaryStyle(defaultPrimaryStyle);
        }
      } catch (error) {
        console.error('Error parsing saved quiz result:', error);
        setPrimaryStyle(defaultPrimaryStyle);
      }
    } else {
      setPrimaryStyle(defaultPrimaryStyle);
    }
    
    setLoading(false);
  }, []);

  if (loading || !primaryStyle) {
    return <LoadingState />;
  }

  return <UnifiedVisualEditor primaryStyle={primaryStyle} />;
};

export default UnifiedEditorPage;
