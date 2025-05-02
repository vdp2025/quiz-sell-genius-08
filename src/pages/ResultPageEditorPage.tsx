
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageEditorWithControls } from '@/components/result-editor/ResultPageEditorWithControls';
import { useNavigate } from 'react-router-dom';

const ResultPageEditorPage: React.FC = () => {
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tentativa de carregar os resultados do localStorage
    try {
      const savedResult = localStorage.getItem('quizResult');
      
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
          setSecondaryStyles(parsedResult.secondaryStyles || []);
        } else {
          console.error("Formato de resultado inválido");
          navigate('/resultado');
        }
      } else {
        // Se não houver resultado salvo, usar um resultado padrão para edição
        const defaultStyle: StyleResult = {
          category: 'Natural',
          score: 10,
          percentage: 100
        };
        
        setPrimaryStyle(defaultStyle);
        setSecondaryStyles([]);
      }
    } catch (error) {
      console.error("Erro ao carregar resultados:", error);
      navigate('/resultado');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando editor...</p>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Erro: Nenhum resultado encontrado para editar</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => navigate('/resultado')}
          >
            Voltar para Resultados
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResultPageEditorWithControls 
      primaryStyle={primaryStyle} 
      secondaryStyles={secondaryStyles} 
    />
  );
};

export default ResultPageEditorPage;
