
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { ComponentRenderer } from '../ComponentRenderer';

interface ComponentPreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
}

interface SortableComponentProps {
  component: QuizComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isPreviewing: boolean;
  children: React.ReactNode;
}

const SortableComponent: React.FC<SortableComponentProps> = ({ 
  component, 
  isSelected, 
  onSelect, 
  isPreviewing,
  children 
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: component.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative my-2 rounded-md overflow-hidden",
        !isPreviewing && (
          isSelected 
            ? "border-2 border-[#9b87f5]" 
            : "border-2 border-dashed border-[#444444] hover:border-[#666666]"
        )
      )}
      onClick={() => !isPreviewing && onSelect(component.id)}
    >
      {!isPreviewing && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute top-2 right-2 z-10 cursor-grab w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center shadow-sm"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      )}
      {children}
    </div>
  );
};

export const ComponentPreviewPanel: React.FC<ComponentPreviewPanelProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onMoveComponent,
  activeStage,
  isPreviewing = false
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      onMoveComponent(active.id, over.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1A1F2C]">
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg min-h-[400px] p-6 shadow-sm">
            {activeStage ? (
              components.length > 0 ? (
                <DndContext 
                  sensors={sensors} 
                  collisionDetection={closestCenter} 
                  onDragEnd={handleDragEnd}
                  disabled={isPreviewing}
                >
                  <SortableContext 
                    items={components.map(c => c.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    {components
                      .sort((a, b) => a.order - b.order)
                      .map(component => (
                        <SortableComponent
                          key={component.id}
                          component={component}
                          isSelected={component.id === selectedComponentId}
                          onSelect={onSelectComponent}
                          isPreviewing={isPreviewing}
                        >
                          <ComponentRenderer 
                            component={component}
                            isPreview={isPreviewing}
                            isSelected={component.id === selectedComponentId}
                          />
                        </SortableComponent>
                      ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center h-64">
                  <p className="text-gray-500 mb-4">
                    Esta etapa não tem componentes. Adicione conteúdo usando o botão "Adicionar Componente".
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center h-64">
                <p className="text-gray-500 mb-4">Selecione uma etapa para visualizar e editar</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
