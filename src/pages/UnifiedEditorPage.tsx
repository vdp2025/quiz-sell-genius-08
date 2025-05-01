
import React, { useState, useEffect } from 'react';
import { UnifiedVisualEditor } from '@/components/unified-editor/UnifiedVisualEditor';
import { LoadingState } from '@/components/ui/loading-state';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const UnifiedEditorPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Carregar o estilo primário para os editores
  useEffect(() => {
    const loadStyles = async () => {
      try {
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
              console.info('Estilo primário carregado do localStorage:', parsedResult.primaryStyle);
              setPrimaryStyle(parsedResult.primaryStyle);
            } else {
              console.info('Estilo primário não encontrado no localStorage, usando padrão');
              setPrimaryStyle(defaultPrimaryStyle);
            }
          } catch (error) {
            console.error('Erro ao analisar resultado do quiz salvo:', error);
            setPrimaryStyle(defaultPrimaryStyle);
            toast({
              title: 'Aviso',
              description: 'Não foi possível carregar os resultados salvos. Usando configuração padrão.',
              variant: 'default',
              duration: 5000,
            });
          }
        } else {
          console.info('Resultado do quiz não encontrado no localStorage, usando padrão');
          setPrimaryStyle(defaultPrimaryStyle);
          toast({
            title: 'Modo Demo',
            description: 'Nenhum resultado de quiz encontrado. Usando estilo "Elegante" para demonstração.',
            duration: 5000,
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar estilos:', error);
        setLoadError('Não foi possível carregar os dados necessários para o editor.');
        setLoading(false);
      }
    };
    
    loadStyles();
  }, []);

  if (loading) {
    return <LoadingState message="Inicializando o editor unificado..." />;
  }

  if (loadError) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#FAF9F7] p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <h2 className="text-2xl font-medium text-[#432818] mb-4">Erro ao carregar o editor</h2>
          <p className="text-[#8F7A6A] mb-6">{loadError}</p>
          <button 
            className="bg-[#B89B7A] text-white px-4 py-2 rounded hover:bg-[#8F7A6A]"
            onClick={() => navigate('/admin')}
          >
            Voltar ao Painel
          </button>
        </div>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#FAF9F7] p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <h2 className="text-2xl font-medium text-[#432818] mb-4">Estilo não encontrado</h2>
          <p className="text-[#8F7A6A] mb-6">
            É necessário que um estilo primário esteja definido para utilizar o editor.
            Execute o quiz primeiro para definir seu estilo.
          </p>
          <button 
            className="bg-[#B89B7A] text-white px-4 py-2 rounded hover:bg-[#8F7A6A]"
            onClick={() => navigate('/quiz')}
          >
            Ir para o Quiz
          </button>
        </div>
      </div>
    );
  }

  return <UnifiedVisualEditor primaryStyle={primaryStyle} />;
};

export default UnifiedEditorPage;
