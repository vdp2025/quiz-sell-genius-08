
import React, { useState } from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BookOpen, FileQuestion, Award, PlusCircle, ChevronDown, ChevronRight, Settings, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableStage } from './SortableStage';

interface StagesPanelProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onStageAdd: (type: QuizStage['type']) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
}

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
    result: true,
    strategic: true
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

  const handleAddStage = (type: QuizStage['type']) => {
    onStageAdd(type);
    setPopoverOpen(false);
  };

  const coverStages = stages.filter(stage => stage.type === 'cover');
  const questionStages = stages.filter(stage => stage.type === 'question');
  const resultStages = stages.filter(stage => stage.type === 'result');
  const strategicStages = stages.filter(stage => stage.type === 'strategic');

  const toggleSection = (section: 'cover' | 'question' | 'result' | 'strategic') => {
    setExpandedTypes(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="h-full flex flex-col text-white">
      <div className="p-4 border-b border-[#333333] flex items-center justify-between">
        <h2 className="font-semibold text-white">Etapas do Quiz</h2>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#333333]">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 bg-[#1A1F2C] border-[#333333]" align="end">
            <div className="grid gap-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#333333]"
                onClick={() => handleAddStage('cover')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Nova Capa</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#333333]"
                onClick={() => handleAddStage('question')}
              >
                <FileQuestion className="w-4 h-4 mr-2" />
                <span>Nova Questão</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#333333]"
                onClick={() => handleAddStage('result')}
              >
                <Award className="w-4 h-4 mr-2" />
                <span>Nova Página de Resultado</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={stages.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {/* Cover Stages Section */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-2 text-white/80 hover:text-white"
                  onClick={() => toggleSection('cover')}
                >
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="font-medium">Capas</span>
                  </div>
                  {expandedTypes.cover ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {expandedTypes.cover && (
                  <div className="pl-6 space-y-1">
                    {coverStages.length > 0 ? (
                      coverStages.map(stage => (
                        <SortableStage
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={() => onStageSelect(stage.id)}
                          onDelete={() => onStageDelete(stage.id)}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-1 italic">Sem etapas</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-400 hover:text-white text-xs mt-1"
                      onClick={() => handleAddStage('cover')}
                    >
                      <PlusCircle className="w-3 h-3 mr-1" />
                      Adicionar Capa
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Questions Section */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-2 text-white/80 hover:text-white"
                  onClick={() => toggleSection('question')}
                >
                  <div className="flex items-center">
                    <FileQuestion className="w-4 h-4 mr-2" />
                    <span className="font-medium">Questões</span>
                  </div>
                  {expandedTypes.question ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {expandedTypes.question && (
                  <div className="pl-6 space-y-1">
                    {questionStages.length > 0 ? (
                      questionStages.map(stage => (
                        <SortableStage
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={() => onStageSelect(stage.id)}
                          onDelete={() => onStageDelete(stage.id)}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-1 italic">Sem etapas</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-400 hover:text-white text-xs mt-1"
                      onClick={() => handleAddStage('question')}
                    >
                      <PlusCircle className="w-3 h-3 mr-1" />
                      Adicionar Questão
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Results Section */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-2 text-white/80 hover:text-white"
                  onClick={() => toggleSection('result')}
                >
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="font-medium">Resultados</span>
                  </div>
                  {expandedTypes.result ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {expandedTypes.result && (
                  <div className="pl-6 space-y-1">
                    {resultStages.length > 0 ? (
                      resultStages.map(stage => (
                        <SortableStage
                          key={stage.id}
                          stage={stage}
                          isActive={stage.id === activeStageId}
                          onSelect={() => onStageSelect(stage.id)}
                          onDelete={() => onStageDelete(stage.id)}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-1 italic">Sem etapas</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-400 hover:text-white text-xs mt-1"
                      onClick={() => handleAddStage('result')}
                    >
                      <PlusCircle className="w-3 h-3 mr-1" />
                      Adicionar Resultado
                    </Button>
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

export default StagesPanel;
