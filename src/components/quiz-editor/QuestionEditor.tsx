import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2Icon, PlusIcon, GripVerticalIcon } from 'lucide-react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { generateId } from '@/utils/idGenerator';

interface QuestionEditorProps {
  question: QuizQuestion;
  onUpdate: (updatedQuestion: QuizQuestion) => void;
  onDelete: (questionId: string) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onUpdate, onDelete }) => {
  const [localQuestion, setQuestion] = useState<QuizQuestion>(question);

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
    const defaultQuestion: QuizQuestion = {
      id: generateId(),
      title: 'Nova Pergunta',
      type: 'text',
      multiSelect: 3,
      options: [],
      orderIndex: 0
    };
    setQuestion(defaultQuestion);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(question.id);
  }, [onDelete, question.id]);

  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(localQuestion.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestion(prevQuestion => ({
      ...prevQuestion,
      options: items
    }));
  }, [localQuestion.options]);

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="options">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {localQuestion.options.map((option, index) => (
                  <Draggable key={option.id} draggableId={option.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center space-x-2 p-3 rounded-md bg-gray-50 border border-gray-200"
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVerticalIcon className="h-5 w-5 text-gray-400 cursor-grab" />
                        </div>
                        <Input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                          placeholder="Texto da opção"
                          className="flex-grow border-[#B89B7A]/20"
                        />
                        <Input
                          type="number"
                          value={option.points}
                          onChange={(e) => handleOptionChange(option.id, 'points', parseInt(e.target.value))}
                          placeholder="Pontos"
                          className="w-20 border-[#B89B7A]/20"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOptionDelete(option.id)}
                          className="text-red-500"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
