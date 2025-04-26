
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/quiz-builder/ComponentsSidebar';
import QuizBuilder from '@/components/quiz-builder/QuizBuilder';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';

interface QuizEditorPanelProps {
  isPreviewing: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  const {
    components,
    stages,
    activeStageId,
    addComponent,
  } = useQuizBuilder();

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  const handleComponentSelect = (type) => {
    addComponent(type, activeStageId);
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Painel esquerdo - Biblioteca de componentes */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ComponentsSidebar
          onComponentSelect={handleComponentSelect}
          activeStage={activeStage}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel central - QuizBuilder modificado para se ajustar ao layout */}
      <ResizablePanel defaultSize={55}>
        <QuizBuilder />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel direito - Propriedades */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l border-[#B89B7A]/20 bg-white overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#432818]">Propriedades</h3>
          </div>
          <div className="p-4">
            {activeStageId ? (
              <p>Selecione um componente para editar suas propriedades</p>
            ) : (
              <p>Selecione uma etapa para começar</p>
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuizEditorPanel;
