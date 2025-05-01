
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

export type EditorTab = 'quiz' | 'result' | 'sales';

interface UnifiedVisualEditorProps {
  primaryStyle: StyleResult;
}

export const UnifiedVisualEditor: React.FC<UnifiedVisualEditorProps> = ({ primaryStyle }) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    saveAll,
    resultPageEditor,
    quizBuilder
  } = useUnifiedEditor(primaryStyle);

  useEffect(() => {
    // Simulate initial loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Editor inicializado",
        description: `Editor unificado carregado com estilo primário: ${primaryStyle.category}`,
        duration: 3000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [primaryStyle]);

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

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#B89B7A] mx-auto mb-4" />
          <h2 className="text-xl font-medium text-[#432818] mb-2">Carregando Editor</h2>
          <p className="text-[#8F7A6A]">Preparando o ambiente para edição...</p>
        </div>
      </div>
    );
  }

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
    </div>
  );
};
