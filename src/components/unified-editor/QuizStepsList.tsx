
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';
import { Edit, GripVertical, Plus } from 'lucide-react';
import { generateId } from '@/utils/idGenerator';
import { cn } from '@/lib/utils';

interface QuizStepsListProps {
  questions: QuizQuestion[];
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
  onAddQuestion: (question: QuizQuestion) => void;
}

interface SortableQuestionItemProps {
  question: QuizQuestion;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const SortableQuestionItem: React.FC<SortableQuestionItemProps> = ({ question, index, isActive, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: question.id
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
        "flex items-center p-3 mb-2 rounded-md cursor-pointer group",
        isActive ? "bg-[#FAF9F7] border border-[#B89B7A]" : "hover:bg-gray-50 border border-transparent"
      )}
      onClick={onClick}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mr-2 cursor-grab"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <span className="w-6 h-6 bg-[#B89B7A]/20 rounded-full flex items-center justify-center mr-2 text-xs font-medium text-[#432818]">
            {index + 1}
          </span>
          <span className="font-medium text-sm truncate">
            {question.title || `Pergunta ${index + 1}`}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {question.type === 'text' ? 'Texto' : question.type === 'image' ? 'Imagem' : 'Texto e Imagem'}
          {' · '}{question.options?.length || 0} opções
        </div>
      </div>
    </div>
  );
};

const QuizStepsList: React.FC<QuizStepsListProps> = ({ 
  questions, 
  activeQuestionId, 
  onSelectQuestion,
  onAddQuestion
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      title: 'Nova Pergunta',
      type: 'text',
      multiSelect: 3,
      options: []
    };
    
    onAddQuestion(newQuestion);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      // Reordering logic would go here
      console.log(`Moved question from index ${active.id} to ${over.id}`);
      // You would update the order in your state
    }
  };

  return (
    <div className="p-4">
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={questions.map(q => q.id)} 
          strategy={verticalListSortingStrategy}
        >
          {questions.map((question, index) => (
            <SortableQuestionItem
              key={question.id}
              question={question}
              index={index}
              isActive={question.id === activeQuestionId}
              onClick={() => onSelectQuestion(question.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <Button
        className="w-full mt-4 border-dashed border-2 bg-transparent hover:bg-[#FAF9F7] text-[#B89B7A] border-[#B89B7A]/50"
        onClick={handleAddQuestion}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nova Pergunta
      </Button>
    </div>
  );
};

export default QuizStepsList;
