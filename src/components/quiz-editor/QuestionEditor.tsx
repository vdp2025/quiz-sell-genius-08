
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2Icon, PlusIcon, GripVerticalIcon } from 'lucide-react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionEditorProps {
  question: QuizQuestion;
  onUpdate: (updatedQuestion: Partial<QuizQuestion>) => void;
  onDelete: (questionId: string) => void;
}

// Componente de Item Sortable para opções
const SortableOptionItem = ({ option, index, onOptionChange, onOptionDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2 p-3 rounded-md bg-gray-50 border border-gray-200"
    >
      <div {...attributes} {...listeners}>
        <GripVerticalIcon className="h-5 w-5 text-gray-400 cursor-grab" />
      </div>
      <Input
        type="text"
        value={option.text}
        onChange={(e) => onOptionChange(option.id, 'text', e.target.value)}
        placeholder="Texto da opção"
        className="flex-grow border-[#B89B7A]/20"
      />
      <Input
        type="number"
        value={option.points}
        onChange={(e) => onOptionChange(option.id, 'points', parseInt(e.target.value))}
        placeholder="Pontos"
        className="w-20 border-[#B89B7A]/20"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onOptionDelete(option.id)}
        className="text-red-500"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onUpdate, onDelete }) => {
  const [localQuestion, setQuestion] = useState<QuizQuestion>(question);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestion(prevQuestion => ({ ...prevQuestion, [name]: value }));
  }, []);

  const handleAddOption = useCallback(() => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova Opção',
      points: 0
    };
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: [...prevQuestion.options, newOption]
    }));
  }, []);

  const handleOptionChange = useCallback((optionId: string, field: string, value: string | number) => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: prevQuestion.options.map(option =>
        option.id === optionId ? { ...option, [field]: value } : option
      )
    }));
  }, []);

  const handleOptionDelete = useCallback((optionId: string) => {
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: prevQuestion.options.filter(option => option.id !== optionId)
    }));
  }, []);

  const handleSave = useCallback(() => {
    onUpdate(localQuestion);
  }, [localQuestion, onUpdate]);

  const handleReset = useCallback(() => {
    setQuestion(question);
  }, [question]);

  const handleDelete = useCallback(() => {
    onDelete(question.id);
  }, [onDelete, question.id]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setQuestion(prevQuestion => {
        const oldIndex = prevQuestion.options.findIndex(option => option.id === active.id);
        const newIndex = prevQuestion.options.findIndex(option => option.id === over.id);
        
        return {
          ...prevQuestion,
          options: arrayMove(prevQuestion.options, oldIndex, newIndex)
        };
      });
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
      <h3 className="text-xl font-semibold text-[#432818] mb-4">
        Editar Pergunta
      </h3>

      <div>
        <Label htmlFor="title">Título da Pergunta</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={localQuestion.title}
          onChange={handleInputChange}
          placeholder="Digite a pergunta..."
          className="border-[#B89B7A]/20"
        />
      </div>

      <div>
        <Label htmlFor="type">Tipo de Pergunta</Label>
        <Input
          type="text"
          id="type"
          name="type"
          value={localQuestion.type}
          onChange={handleInputChange}
          placeholder="Tipo da pergunta"
          className="border-[#B89B7A]/20"
        />
      </div>

      <div>
        <Label htmlFor="multiSelect">Número de Seleções Permitidas</Label>
        <Input
          type="number"
          id="multiSelect"
          name="multiSelect"
          value={localQuestion.multiSelect}
          onChange={handleInputChange}
          placeholder="Número de seleções"
          className="border-[#B89B7A]/20"
        />
      </div>

      <div>
        <Label>Opções</Label>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={localQuestion.options.map(option => option.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {localQuestion.options.map((option, index) => (
                <SortableOptionItem
                  key={option.id}
                  option={option}
                  index={index}
                  onOptionChange={handleOptionChange}
                  onOptionDelete={handleOptionDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddOption}
          className="mt-2 border-[#B89B7A] text-[#B89B7A]"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Adicionar Opção
        </Button>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={handleReset}>
          Resetar
        </Button>        
        <Button variant="destructive" onClick={handleDelete}>
          Excluir
        </Button>
        <Button onClick={handleSave} className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default QuestionEditor;
