
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuizEditorPanel from './panels/QuizEditorPanel';
import ResultEditorPanel from './panels/ResultEditorPanel';
import SalesEditorPanel from './panels/SalesEditorPanel';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import { EditorToolbar } from '../editor/toolbar/EditorToolbar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface UnifiedVisualEditorProps {
  primaryStyle: StyleResult;
}

export const UnifiedVisualEditor: React.FC<UnifiedVisualEditorProps> = ({ primaryStyle }) => {
  const {
    activeMode,
    isPreviewing,
    setActiveMode,
    togglePreview,
    saveAll
  } = useUnifiedEditor(primaryStyle);

  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorToolbar
        isPreviewing={isPreviewing}
        viewportSize={viewportSize}
        onViewportSizeChange={setViewportSize}
        onTogglePreview={togglePreview}
        onSave={saveAll}
      />
      
      <Tabs
        value={activeMode}
        onValueChange={(value) => setActiveMode(value as 'quiz' | 'result' | 'sales')}
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
