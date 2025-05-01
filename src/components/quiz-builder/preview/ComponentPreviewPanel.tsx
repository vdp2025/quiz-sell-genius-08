
import React, { useState } from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import ComponentRenderer from './ComponentRenderer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ComponentPreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
}

export const ComponentPreviewPanel: React.FC<ComponentPreviewPanelProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onMoveComponent,
  activeStage,
  isPreviewing
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance before activating drag
      }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      setOverId(over.id as string);
    } else {
      setOverId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setOverId(null);
    
    if (over && active.id !== over.id) {
      onMoveComponent(active.id as string, over.id as string);
    }
  };

  if (!activeStage) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Selecione uma etapa para visualizar seus componentes.</p>
      </div>
    );
  }

  const sortedComponents = [...components].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full bg-[#F9F5F1] flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <h3 className="text-sm font-medium text-gray-600">
          Visualizando: {activeStage.title || `Etapa ${activeStage.order + 1}`}
        </h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div 
          className={cn(
            "min-h-full w-full max-w-4xl mx-auto",
            isPreviewing ? "pointer-events-none select-none" : ""
          )}
        >
          {sortedComponents.length === 0 ? (
            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-2">
                Adicione componentes para esta etapa usando o painel lateral.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {}}
                className="text-gray-500"
              >
                <Plus className="w-4 h-4 mr-1" /> Adicionar Componente
              </Button>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortedComponents.map(component => component.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {sortedComponents.map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      isSelected={component.id === selectedComponentId}
                      onSelect={() => onSelectComponent(component.id)}
                      onMove={onMoveComponent}
                      isPreviewing={isPreviewing}
                      isActive={component.id === activeId}
                      isOver={component.id === overId}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
