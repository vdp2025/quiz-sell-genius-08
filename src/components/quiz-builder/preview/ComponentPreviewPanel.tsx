
import React from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { ComponentRenderer } from '../ComponentRenderer';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';

interface ComponentPreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
}

export const ComponentPreviewPanel: React.FC<ComponentPreviewPanelProps> = ({
  components,
  selectedComponentId,
  activeStage,
  isPreviewing,
  onSelectComponent,
  onMoveComponent
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      onMoveComponent(active.id.toString(), over.id.toString());
    }
  };

  if (!activeStage) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-400">Selecione uma etapa para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="space-y-4">
          {components.map((component) => (
            <ComponentRenderer
              key={component.id}
              component={component}
              isSelected={component.id === selectedComponentId}
              isPreview={isPreviewing}
              onClick={() => !isPreviewing && onSelectComponent(component.id)}
            />
          ))}
          
          {components.length === 0 && (
            <div className="text-center p-8 border border-dashed border-[#444444] rounded-lg">
              <p className="text-gray-400">
                Adicione componentes usando o botão acima
              </p>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};
