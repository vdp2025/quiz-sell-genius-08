
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { QuizComponentType, QuizStage, QuizBuilderState } from '@/types/quizBuilder';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import QuizPreview from './preview/QuizPreview';
import BuilderToolbar from './components/BuilderToolbar';
import BuilderLayout from './components/BuilderLayout';
import QuizTemplateImporter from './components/QuizTemplateImporter';
import { QuizResult } from '@/types/quiz';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewResult, setPreviewResult] = useState<QuizResult | null>(null);
  const [isTemplateImporterOpen, setIsTemplateImporterOpen] = useState(false);
  
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
    initializeStages,
    initializeComponents,
    loading
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleSave = () => {
    const success = saveCurrentState();
    if (success) {
      toast({
        title: "Quiz salvo",
        description: "Todas as alterações foram salvas com sucesso.",
      });
    }
  };

  const handlePreviewQuizResult = () => {
    // Generate a sample quiz result for preview
    const previewResult: QuizResult = {
      primaryStyle: {
        category: 'Elegante',
        score: 12,
        percentage: 40
      },
      secondaryStyles: [
        {
          category: 'Romântico',
          score: 9,
          percentage: 30
        },
        {
          category: 'Clássico',
          score: 6,
          percentage: 20
        },
        {
          category: 'Contemporâneo',
          score: 3,
          percentage: 10
        }
      ],
      totalSelections: 30
    };
    
    setPreviewResult(previewResult);
  };

  const handleImportTemplate = (template: QuizBuilderState) => {
    initializeStages(template.stages);
    initializeComponents(template.components);
    
    if (template.stages.length > 0) {
      setActiveStage(template.stages[0].id);
    }
    
    toast({
      title: "Template importado",
      description: "O template foi carregado com sucesso. Você pode começar a editar.",
    });
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
        onPreviewResultPage={handlePreviewQuizResult}
        onImportQuizTemplate={() => setIsTemplateImporterOpen(true)}
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
              previewResult={previewResult}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <QuizTemplateImporter 
        isOpen={isTemplateImporterOpen}
        onClose={() => setIsTemplateImporterOpen(false)}
        onImportTemplate={handleImportTemplate}
      />
    </div>
  );
};
