
import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { QuizQuestion } from '@/types/quiz';
import QuestionEditor from './QuestionEditor';
import { generateId } from '@/utils/idGenerator';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Trash2 } from 'lucide-react';

interface QuizEditorProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
}

const QuizEditor: React.FC<QuizEditorProps> = ({ questions: initialQuestions, onQuestionsChange }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  useEffect(() => {
    onQuestionsChange(questions);
  }, [questions, onQuestionsChange]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddQuestion = useCallback(() => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      title: `Nova Pergunta ${questions.length + 1}`,
      type: 'text',
      multiSelect: 1,
      options: [],
      orderIndex: questions.length // Add the orderIndex property
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  }, [questions, setQuestions, setSelectedQuestionId]);

  const handleSelectQuestion = useCallback((id: string) => {
    setSelectedQuestionId(id);
  }, []);

  const handleUpdateQuestion = useCallback((id: string, updatedFields: Partial<QuizQuestion>) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id ? { ...question, ...updatedFields } : question
      )
    );
  }, []);

  const handleDeleteQuestion = useCallback((id: string) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
    setSelectedQuestionId(null);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const activeIndex = questions.findIndex(question => question.id === active.id);
      const overIndex = questions.findIndex(question => question.id === over.id);

      if (activeIndex !== overIndex) {
        const newQuestions = arrayMove(questions, activeIndex, overIndex).map((question, index) => ({
          ...question,
          orderIndex: index
        }));
        setQuestions(newQuestions);
      }
    }
  }, [questions]);

  const activeQuestion = questions.find(question => question.id === selectedQuestionId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Question List */}
      <div className="space-y-4">
        <Label>Lista de Perguntas</Label>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questions.map(question => question.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {questions.map((question) => (
                <SortableItem
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  isSelected={question.id === selectedQuestionId}
                  onSelect={() => handleSelectQuestion(question.id)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button onClick={handleAddQuestion}>Adicionar Pergunta</Button>
      </div>

      {/* Question Editor */}
      <div>
        {activeQuestion ? (
          <QuestionEditor
            question={activeQuestion}
            onUpdate={(updatedFields) => handleUpdateQuestion(activeQuestion.id, updatedFields)}
            onDelete={() => handleDeleteQuestion(activeQuestion.id)}
          />
        ) : (
          <div className="p-6 border border-dashed border-gray-300 rounded-md">
            Selecione uma pergunta para editar ou adicione uma nova.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizEditor;
