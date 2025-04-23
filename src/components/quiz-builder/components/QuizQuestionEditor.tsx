
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizOptionEditor from './QuizOptionEditor';
import { generateId } from '@/utils/idGenerator';

interface QuizQuestionEditorProps {
  component: QuizComponentData;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
}

const QuizQuestionEditor: React.FC<QuizQuestionEditorProps> = ({
  component,
  onUpdate
}) => {
  const handleAddOption = () => {
    const newOption = {
      id: generateId(),
      text: 'Nova opção',
      imageUrl: '',
      styleCategory: 'Natural'
    };

    onUpdate({
      data: {
        ...component.data,
        options: [...(component.data.options || []), newOption]
      }
    });
  };

  const handleOptionUpdate = (index: number, field: string, value: string) => {
    const newOptions = [...(component.data.options || [])];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };

    onUpdate({
      data: {
        ...component.data,
        options: newOptions
      }
    });
  };

  const handleOptionRemove = (index: number) => {
    const newOptions = [...(component.data.options || [])];
    newOptions.splice(index, 1);

    onUpdate({
      data: {
        ...component.data,
        options: newOptions
      }
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Título da Pergunta</Label>
          <Input
            value={component.data.question || ''}
            onChange={(e) => onUpdate({
              data: { ...component.data, question: e.target.value }
            })}
            placeholder="Digite a pergunta"
          />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Exibição</Label>
          <Select
            value={component.data.displayType || 'text'}
            onValueChange={(value) => onUpdate({
              data: { ...component.data, displayType: value }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Apenas texto</SelectItem>
              <SelectItem value="image">Apenas imagem</SelectItem>
              <SelectItem value="both">Texto e imagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Número de Seleções</Label>
          <Select
            value={String(component.data.multiSelect || 3)}
            onValueChange={(value) => onUpdate({
              data: { ...component.data, multiSelect: parseInt(value) }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Número de seleções" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 seleção</SelectItem>
              <SelectItem value="3">3 seleções</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Opções</Label>
          <Button 
            variant="outline" 
            onClick={handleAddOption}
            className="text-[#B89B7A] border-[#B89B7A]"
          >
            Adicionar Opção
          </Button>
        </div>

        <div className="space-y-4">
          {(component.data.options || []).map((option, index) => (
            <QuizOptionEditor
              key={option.id || index}
              option={option}
              index={index}
              onUpdate={handleOptionUpdate}
              onRemove={handleOptionRemove}
              showImage={component.data.displayType !== 'text'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionEditor;
