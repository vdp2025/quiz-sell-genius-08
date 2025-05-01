
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuizEditorPanel from './panels/QuizEditorPanel';
import ResultEditorPanel from './panels/ResultEditorPanel';
import SalesEditorPanel from './panels/SalesEditorPanel';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type EditorTab = 'quiz' | 'result' | 'sales';

interface UnifiedVisualEditorProps {
  primaryStyle: StyleResult;
  initialActiveTab?: EditorTab;
}

export const UnifiedVisualEditor: React.FC<UnifiedVisualEditorProps> = ({ 
  primaryStyle, 
  initialActiveTab = 'quiz' 
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>(initialActiveTab);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    isPreviewing,
    togglePreview,
    saveAll,
    openTemplateModal,
    isTemplateModalOpen,
    closeTemplateModal,
    loadTemplateForCurrentEditor,
    setActiveMode
  } = useUnifiedEditor(primaryStyle);

  useEffect(() => {
    // Update the active mode in the unified editor hook
    setActiveMode(activeTab);
    // Update URL when tab changes
    navigate(`/admin/editor/unified?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate, setActiveMode]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as EditorTab);
    toast({
      description: `Editor de ${value === 'quiz' ? 'Quiz' : value === 'result' ? 'Resultado' : 'Vendas'} ativado`,
      duration: 2000,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    toast({
      title: "Salvando alterações",
      description: "Por favor, aguarde...",
      duration: 2000,
    });
    
    try {
      const success = await saveAll();
      
      if (success) {
        toast({
          title: "Alterações salvas",
          description: "Todas as alterações foram salvas com sucesso.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao salvar as alterações. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorToolbar
        activeTab={activeTab}
        isPreviewing={isPreviewing}
        onPreviewToggle={togglePreview}
        onSave={handleSave}
        onOpenTemplateModal={openTemplateModal}
      />
      
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex-1 overflow-hidden"
      >
        <TabsList className="w-full border-b bg-white px-4 pt-2">
          <TabsTrigger value="quiz" className="data-[state=active]:bg-muted">Quiz</TabsTrigger>
          <TabsTrigger value="result" className="data-[state=active]:bg-muted">Resultado</TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-muted">Página de Vendas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quiz" className="flex-1 h-[calc(100%-40px)] overflow-hidden">
          <TooltipProvider>
            <QuizEditorPanel isPreviewing={isPreviewing} />
          </TooltipProvider>
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 h-[calc(100%-40px)] overflow-hidden">
          <TooltipProvider>
            <ResultEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
          </TooltipProvider>
        </TabsContent>
        
        <TabsContent value="sales" className="flex-1 h-[calc(100%-40px)] overflow-hidden">
          <TooltipProvider>
            <SalesEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
          </TooltipProvider>
        </TabsContent>
      </Tabs>

      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-medium mb-4">Templates para {activeTab === 'quiz' ? 'Quiz' : activeTab === 'result' ? 'Página de Resultado' : 'Página de Vendas'}</h2>
            <div className="mb-4">
              <p className="mb-2">Escolha um template para aplicar:</p>
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    loadTemplateForCurrentEditor({
                      title: "Template Padrão",
                      blocks: activeTab === 'sales' ? [
                        {
                          id: "headline-1",
                          type: "headline",
                          content: { 
                            title: "Descubra seu Estilo Único",
                            subtitle: "Transforme sua imagem pessoal",
                            style: { backgroundColor: "#ffffff", color: "#432818", paddingY: 24, paddingX: 16 }
                          },
                          order: 0
                        },
                        {
                          id: "text-1",
                          type: "text",
                          content: { 
                            text: "Nossa consultoria especializada irá ajudar você a encontrar o estilo que combina com sua personalidade e destaca seus pontos fortes.",
                            style: { backgroundColor: "#F9F5F1", color: "#8F7A6A", paddingY: 16, paddingX: 16 }
                          },
                          order: 1
                        }
                      ] : {}
                    });
                    closeTemplateModal();
                    toast({
                      title: "Template aplicado",
                      description: "O template foi aplicado com sucesso.",
                      duration: 3000,
                    });
                  }}
                  className="w-full text-left p-3 border rounded hover:bg-gray-50 transition-colors"
                >
                  Template Padrão - {activeTab === 'quiz' ? 'Quiz' : activeTab === 'result' ? 'Página de Resultado' : 'Página de Vendas'}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={closeTemplateModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span>Salvando alterações...</span>
          </div>
        </div>
      )}
    </div>
  );
};
