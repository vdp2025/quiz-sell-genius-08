
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
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const {
    saveAll,
    resultPageEditor,
    quizBuilder,
    salesPageEditor
  } = useUnifiedEditor(primaryStyle);

  useEffect(() => {
    // Update URL when tab changes
    navigate(`/admin/editor/unified?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  useEffect(() => {
    // Load resources for the active tab
    const loadTabResources = async () => {
      setIsLoading(true);
      try {
        // Simulate loading resources for the current tab
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if the specific editor is ready
        if (
          (activeTab === 'quiz' && quizBuilder && !quizBuilder.loading) || 
          (activeTab === 'result' && resultPageEditor && !resultPageEditor.loading) || 
          (activeTab === 'sales' && salesPageEditor && salesPageEditor.isInitialized)
        ) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Error loading resources for ${activeTab} tab:`, error);
        toast({
          title: "Erro no carregamento",
          description: `Não foi possível carregar os recursos para a aba ${activeTab}.`,
          variant: "destructive",
          duration: 5000,
        });
        setIsLoading(false);
      }
    };
    
    loadTabResources();
  }, [activeTab, quizBuilder, resultPageEditor, salesPageEditor]);

  const handleTogglePreview = () => {
    setIsPreviewing(prev => !prev);
    
    toast({
      description: isPreviewing 
        ? "Modo de edição ativado" 
        : "Modo de visualização ativado",
      duration: 2000,
    });
  };

  const handleSave = async () => {
    toast({
      title: "Salvando alterações",
      description: "Por favor, aguarde...",
      duration: 2000,
    });
    
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
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as EditorTab);
    toast({
      description: `Editor de ${value === 'quiz' ? 'Quiz' : value === 'result' ? 'Resultado' : 'Vendas'} ativado`,
      duration: 2000,
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorToolbar
        activeTab={activeTab}
        isPreviewing={isPreviewing}
        onPreviewToggle={handleTogglePreview}
        onSave={handleSave}
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
            {isLoading && activeTab === 'quiz' ? (
              <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-[#B89B7A] mx-auto mb-4" />
                  <p className="text-[#8F7A6A]">Carregando editor de Quiz...</p>
                </div>
              </div>
            ) : (
              <QuizEditorPanel isPreviewing={isPreviewing} />
            )}
          </TooltipProvider>
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 h-[calc(100%-40px)] overflow-hidden">
          <TooltipProvider>
            {isLoading && activeTab === 'result' ? (
              <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-[#B89B7A] mx-auto mb-4" />
                  <p className="text-[#8F7A6A]">Carregando editor de Resultados...</p>
                </div>
              </div>
            ) : (
              <ResultEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
            )}
          </TooltipProvider>
        </TabsContent>
        
        <TabsContent value="sales" className="flex-1 h-[calc(100%-40px)] overflow-hidden">
          <TooltipProvider>
            {isLoading && activeTab === 'sales' ? (
              <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-[#B89B7A] mx-auto mb-4" />
                  <p className="text-[#8F7A6A]">Carregando editor de Página de Vendas...</p>
                </div>
              </div>
            ) : (
              <SalesEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
            )}
          </TooltipProvider>
        </TabsContent>
      </Tabs>
    </div>
  );
};
