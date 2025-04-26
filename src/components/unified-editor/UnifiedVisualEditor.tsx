
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup } from '@/components/ui/resizable';
import QuizEditorPanel from './panels/QuizEditorPanel';
import ResultEditorPanel from './panels/ResultEditorPanel';
import SalesEditorPanel from './panels/SalesEditorPanel';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { StyleResult } from '@/types/quiz';
import { useToast } from '@/components/ui/use-toast';
import { EditorNotifications } from './notifications/EditorNotifications';

export type EditorTab = 'quiz' | 'result' | 'sales';

interface UnifiedVisualEditorProps {
  primaryStyle: StyleResult;
}

export const UnifiedVisualEditor: React.FC<UnifiedVisualEditorProps> = ({ primaryStyle }) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value as EditorTab);
  };

  const handleSave = () => {
    // Implementar salvamento com base no tab ativo
    toast({
      title: "Alterações salvas",
      description: `As alterações no editor de ${getTabName(activeTab)} foram salvas com sucesso.`,
    });
  };

  const handlePreviewToggle = () => {
    setIsPreviewing(!isPreviewing);
  };

  const getTabName = (tab: EditorTab): string => {
    switch (tab) {
      case 'quiz': return 'Quiz';
      case 'result': return 'Resultado';
      case 'sales': return 'Vendas';
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#FAF9F7]">
      <EditorToolbar 
        activeTab={activeTab}
        isPreviewing={isPreviewing}
        onPreviewToggle={handlePreviewToggle}
        onSave={handleSave}
      />

      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="bg-white border-b border-[#B89B7A]/20 px-6 py-1">
          <TabsList>
            <TabsTrigger value="quiz" className="text-[#432818]">
              Editor de Quiz
            </TabsTrigger>
            <TabsTrigger value="result" className="text-[#432818]">
              Página de Resultado
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-[#432818]">
              Página de Vendas
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="quiz" className="h-full m-0">
            <QuizEditorPanel isPreviewing={isPreviewing} />
          </TabsContent>
          <TabsContent value="result" className="h-full m-0">
            <ResultEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
          </TabsContent>
          <TabsContent value="sales" className="h-full m-0">
            <SalesEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
          </TabsContent>
        </div>
      </Tabs>
      
      <EditorNotifications />
    </div>
  );
};

export default UnifiedVisualEditor;
