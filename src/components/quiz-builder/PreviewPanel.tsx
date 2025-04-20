
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeaderComponent from './components/HeaderComponent';
import TextComponent from './components/TextComponent';
import ImageComponent from './components/ImageComponent';
import MultipleChoiceComponent from './components/MultipleChoiceComponent';
import QuizResultComponent from './components/QuizResultComponent';

interface PreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  activeStage?: QuizStage | null;
  isPreviewing: boolean;
}

interface SortableComponentProps {
  component: QuizComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

const SortableComponent: React.FC<SortableComponentProps> = ({ component, isSelected, onSelect, children }) => {
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
        "relative my-2 border-2 rounded-md overflow-hidden",
        isSelected ? "border-[#B89B7A]" : "border-dashed border-gray-300"
      )}
      onClick={() => onSelect(component.id)}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 right-2 z-10 cursor-grab w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>
      {children}
    </div>
  );
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
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

  const renderComponent = (component: QuizComponentData) => {
    const props = {
      data: component.data,
      style: component.style,
      isSelected: component.id === selectedComponentId,
    };

    switch (component.type) {
      case 'header':
        return <HeaderComponent {...props} />;
      case 'text':
        return <TextComponent {...props} />;
      case 'headline':
        return <TextComponent {...props} isHeadline />;
      case 'image':
        return <ImageComponent {...props} />;
      case 'multipleChoice':
        return <MultipleChoiceComponent {...props} />;
      case 'quizResult':
        return <QuizResultComponent {...props} />;
      default:
        return <div className="p-4 bg-gray-100 text-center">Componente não reconhecido</div>;
    }
  };

  const getStageTypeLabel = (type: QuizStage['type']) => {
    switch (type) {
      case 'cover':
        return 'Capa do Quiz';
      case 'question':
        return 'Questão';
      case 'result':
        return 'Página de Resultado';
      default:
        return type;
    }
  };

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">
          {activeStage ? (
            <div className="flex items-center gap-2">
              <span>{activeStage.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {getStageTypeLabel(activeStage.type)}
              </span>
            </div>
          ) : (
            "Preview"
          )}
        </h2>
      </div>
      
      <ScrollArea className="flex-1 bg-[#FAF9F7]">
        <div className="p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg min-h-[400px] p-4 shadow-sm">
            {activeStage ? (
              components.length > 0 ? (
                <DndContext 
                  sensors={sensors} 
                  collisionDetection={closestCenter} 
                  onDragEnd={handleDragEnd}
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
                        >
                          {renderComponent(component)}
                        </SortableComponent>
                      ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center h-64">
                  <p className="text-gray-500 mb-4">
                    Esta etapa não tem componentes. Adicione conteúdo usando o painel à esquerda.
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
