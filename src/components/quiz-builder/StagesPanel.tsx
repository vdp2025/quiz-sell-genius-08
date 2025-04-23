
import React, { useState } from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Edit2, Trash2, GripVertical, ChevronDown, ChevronUp, 
  Plus, BookOpen, FileQuestion, Award, PlusCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface StagesPanelProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onStageAdd: (type: QuizStage['type']) => void;
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
        return <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">C</div>;
      case 'question':
        return <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">Q</div>;
      case 'result':
        return <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs">R</div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-500 text-xs">?</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-2 mb-2 border rounded-md cursor-pointer",
        isActive 
          ? "border-[#9b87f5] bg-[#9b87f5]/10" 
          : "border-[#444444] hover:bg-[#333333]"
      )}
      onClick={() => onSelect(stage.id)}
    >
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        {getStageIcon(stage.type)}
        
        <div className="flex-1 truncate">
          <div className="text-sm font-medium text-white">{stage.title}</div>
          <div className="text-xs text-gray-400">
            {stage.type === 'cover' ? 'Capa' : stage.type === 'question' ? 'Questão' : 'Resultado'}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white hover:bg-[#444444]" onClick={(e) => {
            e.stopPropagation();
            onEdit(stage.id);
          }}>
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-[#444444]" onClick={(e) => {
            e.stopPropagation();
            onDelete(stage.id);
          }}>
            <Trash2 className="w-3.5 h-3.5" />
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
  onStageAdd,
  onStageMove,
  onStageUpdate,
  onStageDelete
}) => {
  const [expandedTypes, setExpandedTypes] = useState({
    cover: true,
    question: true,
    result: true
  });
  
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  const handleAddStage = (type: QuizStage['type']) => {
    onStageAdd(type);
    setPopoverOpen(false);
  };

  const stageTypes = [
    { type: 'cover' as const, label: 'Capa', icon: BookOpen },
    { type: 'question' as const, label: 'Questão', icon: FileQuestion },
    { type: 'result' as const, label: 'Resultado', icon: Award },
  ];

  return (
    <div className="h-full flex flex-col border-r border-[#333333] text-white">
      <div className="p-4 border-b border-[#333333] flex items-center justify-between">
        <h2 className="font-semibold text-white">Etapas do Quiz</h2>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#333333]">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 bg-[#333333] border-[#444444]" align="end">
            <div className="grid gap-1">
              {stageTypes.map((stageType) => (
                <Button
                  key={stageType.type}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-[#444444]"
                  onClick={() => handleAddStage(stageType.type)}
                >
                  <stageType.icon className="w-4 h-4 mr-2" />
                  <span>Nova {stageType.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={stages.map(s => s.id)} strategy={verticalListSortingStrategy}>
              
              {/* Cover Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-[#333333] rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('cover')}
                >
                  <div className="font-medium text-sm text-gray-200">Capas</div>
                  {expandedTypes.cover ? 
                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                      <div className="text-sm text-gray-400 italic p-2">
                        Nenhuma capa adicionada
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Question Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-[#333333] rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('question')}
                >
                  <div className="font-medium text-sm text-gray-200">Questões</div>
                  {expandedTypes.question ? 
                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                      <div className="text-sm text-gray-400 italic p-2">
                        Nenhuma questão adicionada
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Result Stages */}
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between p-2 bg-[#333333] rounded-md cursor-pointer mb-2"
                  onClick={() => toggleSection('result')}
                >
                  <div className="font-medium text-sm text-gray-200">Resultados</div>
                  {expandedTypes.result ? 
                    <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                      <div className="text-sm text-gray-400 italic p-2">
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
