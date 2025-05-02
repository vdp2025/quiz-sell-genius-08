
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageEditorPanel } from '@/components/editor/result/ResultPageEditorPanel';
import { ResultPagePreview } from '@/components/editor/result/ResultPagePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';

const EnhancedResultEditorPage: React.FC = () => {
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Try to load results from localStorage
    try {
      const savedResult = localStorage.getItem('quizResult');
      
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
        } else {
          console.error("Invalid result format");
          // Use a default style for editing
          setPrimaryStyle({
            category: 'Natural',
            score: 10,
            percentage: 100
          });
        }
      } else {
        // If no saved result, use a default style for editing
        setPrimaryStyle({
          category: 'Natural',
          score: 10,
          percentage: 100
        });
      }
    } catch (error) {
      console.error("Error loading results:", error);
      // Use a default style for editing
      setPrimaryStyle({
        category: 'Natural',
        score: 10,
        percentage: 100
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando editor avançado...</p>
      </div>
    );
  }

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Erro ao carregar o editor</p>
      </div>
    );
  }

  return (
    <EnhancedResultEditor primaryStyle={primaryStyle} />
  );
};

interface EnhancedResultEditorProps {
  primaryStyle: StyleResult;
}

const EnhancedResultEditor: React.FC<EnhancedResultEditorProps> = ({ primaryStyle }) => {
  const {
    isPreviewing,
    isGlobalStylesOpen,
    resultPageConfig,
    actions
  } = useResultPageEditor(primaryStyle.category);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Editor Toolbar */}
      <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/resultado">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-playfair text-[#432818]">Editor Avançado da Página de Resultados</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={actions.toggleGlobalStyles}
          >
            Estilos Globais
          </Button>
          
          <Button
            variant="outline"
            onClick={actions.togglePreview}
          >
            {isPreviewing ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69]" 
            onClick={actions.handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {!isPreviewing && (
          <>
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
              <ResultPageEditorPanel 
                primaryStyle={primaryStyle}
                isPreviewing={isPreviewing}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}
        
        <ResizablePanel defaultSize={isPreviewing ? 100 : 70}>
          <ResultPagePreview 
            primaryStyle={primaryStyle}
            isPreviewing={isPreviewing}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {isGlobalStylesOpen && (
        <GlobalStylesEditor
          globalStyles={resultPageConfig.globalStyles || {}}
          onSave={(styles) => {
            actions.updateSection('globalStyles', styles);
            actions.toggleGlobalStyles();
          }}
          onCancel={actions.toggleGlobalStyles}
        />
      )}
    </div>
  );
};

export default EnhancedResultEditorPage;
