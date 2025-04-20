
import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface StagesPanelProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
}

const SortableStage = ({ stage, isActive, onSelect, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: stage.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const getStageIcon = (type: QuizStage['type']) => {
    switch (type) {
      case 'cover':
        return <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">C</div>;
      case 'question':
        return <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">Q</div>;
      case 'result':
        return <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs">R</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-2 mb-2 border rounded-md cursor-pointer",
        isActive ? "border-[#B89B7A] bg-[#B89B7A]/10" : "border-gray-200 hover:bg-gray-50"
      )}
      onClick={() => onSelect(stage.id)}
    >
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        {getStageIcon(stage.type)}
        
        <div className="flex-1 truncate">
          <div className="text-sm font-medium">{stage.title}</div>
          <div className="text-xs text-gray-500">
            {stage.type === 'cover' ? 'Capa' : stage.type === 'question' ? 'Questão' : 'Resultado'}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {
            e.stopPropagation();
            onEdit(stage.id);
          }}>
            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {
            e.stopPropagation();
            onDelete(stage.id);
          }}>
            <Trash2 className="w-3.5 h-3.5 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const StagesPanel: React.FC<StagesPanelProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onStageMove,
  onStageUpdate,
  onStageDelete
}) => {
  const [expandedTypes, setExpandedTypes] = React.useState({
    cover: true,
    question: true,
    result: true
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      onStageMove(active.id, over.id);
    }
  };

  const coverStages = stages.filter(stage => stage.type === 'cover');
  const questionStages = stages.filter(stage => stage.type === 'question');
  const resultStages = stages.filter(stage => stage.type === 'result');

  const toggleSection = (section: 'cover' | 'question' | 'result') => {
    setExpandedTypes(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="h-full flex flex-col border-r overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-[#432818]">Etapas do Quiz</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={stages.map(s => s.id)} strategy={verticalListSortingStrategy}>
              
              {/* Cover Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('cover')}
                >
                  <div className="font-medium text-sm">Capas</div>
                  {expandedTypes.cover ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </div>
                
                {expandedTypes.cover && (
                  <div className="pl-2">
                    {coverStages.length > 0 ? (
                      coverStages.map(stage => (
                        <SortableStage 
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={onStageSelect}
                          onEdit={() => {}}
                          onDelete={onStageDelete}
                        />
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-2">
                        Nenhuma capa adicionada
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Question Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('question')}
                >
                  <div className="font-medium text-sm">Questões</div>
                  {expandedTypes.question ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </div>
                
                {expandedTypes.question && (
                  <div className="pl-2">
                    {questionStages.length > 0 ? (
                      questionStages.map(stage => (
                        <SortableStage 
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={onStageSelect}
                          onEdit={() => {}}
                          onDelete={onStageDelete}
                        />
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-2">
                        Nenhuma questão adicionada
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Result Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('result')}
                >
                  <div className="font-medium text-sm">Resultados</div>
                  {expandedTypes.result ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </div>
                
                {expandedTypes.result && (
                  <div className="pl-2">
                    {resultStages.length > 0 ? (
                      resultStages.map(stage => (
                        <SortableStage 
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={onStageSelect}
                          onEdit={() => {}}
                          onDelete={onStageDelete}
                        />
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic p-2">
                        Nenhuma página de resultado adicionada
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            </SortableContext>
          </DndContext>
        </div>
      </ScrollArea>
    </div>
  );
};
