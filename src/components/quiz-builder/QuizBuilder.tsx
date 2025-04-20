
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { QuizComponentType, QuizStage } from '@/types/quizBuilder';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import QuizPreview from './preview/QuizPreview';
import BuilderToolbar from './components/BuilderToolbar';
import BuilderLayout from './components/BuilderLayout';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  const { 
    components, 
    stages,
    activeStageId,
    addComponent, 
    updateComponent, 
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    saveCurrentState,
    loading
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleSave = () => {
    saveCurrentState();
  };

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FAF9F7]">
        <Loader2 className="h-12 w-12 text-[#B89B7A] animate-spin mb-4" />
        <p className="text-[#432818] text-lg">Carregando construtor de quiz...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <BuilderToolbar
        activeView={activeView}
        isPreviewing={isPreviewing}
        onViewChange={setActiveView}
        onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
        onSave={handleSave}
      />
      
      <div className="flex-1">
        <Tabs defaultValue={activeView} value={activeView}>
          <TabsContent value="editor" className="h-full">
            <BuilderLayout
              components={components}
              stages={stages}
              activeStageId={activeStageId}
              selectedComponentId={selectedComponentId}
              activeStage={activeStage}
              isPreviewing={isPreviewing}
              onComponentSelect={handleComponentSelect}
              onStageAdd={addStage}
              onStageSelect={setActiveStage}
              onComponentMove={moveComponent}
              onStageMove={moveStage}
              onStageUpdate={updateStage}
              onStageDelete={deleteStage}
              onComponentUpdate={updateComponent}
              onComponentDelete={deleteComponent}
            />
          </TabsContent>
          
          <TabsContent value="preview" className="h-full">
            <QuizPreview 
              stages={stages}
              components={components}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
