
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizOptionEditor from './QuizOptionEditor';
import { generateId } from '@/utils/idGenerator';

interface QuizOptionType {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory?: string;
}

interface QuizQuestionEditorProps {
  component: QuizComponentData;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
}

const QuizQuestionEditor: React.FC<QuizQuestionEditorProps> = ({
  component,
  onUpdate
}) => {
  // Ensure options are always in the object format
  const ensureOptionsFormat = (): QuizOptionType[] => {
    if (!component.data.options) return [];
    
    return component.data.options.map((option: any) => {
      if (typeof option === 'string') {
        return {
          id: generateId(),
          text: option,
          imageUrl: '',
          styleCategory: 'Natural'
        };
      }
      return option as QuizOptionType;
    });
  };

  const handleAddOption = () => {
    const newOption: QuizOptionType = {
      id: generateId(),
      text: 'Nova opção',
      imageUrl: '',
      styleCategory: 'Natural'
    };

    onUpdate({
      data: {
        ...component.data,
        options: [...ensureOptionsFormat(), newOption] as any
      }
    });
  };

  const handleOptionUpdate = (index: number, field: string, value: string) => {
    const options = ensureOptionsFormat();
    options[index] = {
      ...options[index],
      [field]: value
    };

    onUpdate({
      data: {
        ...component.data,
        options: options as any
      }
    });
  };

  const handleOptionRemove = (index: number) => {
    const options = ensureOptionsFormat();
    options.splice(index, 1);

    onUpdate({
      data: {
        ...component.data,
        options: options as any
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tipo de Exibição</Label>
            <Select
              value={component.data.displayType || 'both'}
              onValueChange={(value: 'text' | 'image' | 'both') => onUpdate({
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Layout de Colunas</Label>
            <Select
              value={String(component.data.layout?.columns || 2)}
              onValueChange={(value) => onUpdate({
                data: { 
                  ...component.data, 
                  layout: {
                    ...component.data.layout,
                    columns: parseInt(value)
                  }
                }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Número de colunas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 coluna</SelectItem>
                <SelectItem value="2">2 colunas</SelectItem>
                <SelectItem value="3">3 colunas</SelectItem>
                <SelectItem value="4">4 colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tamanho das Imagens</Label>
            <Select
              value={component.data.imageSize || 'medium'}
              onValueChange={(value: 'small' | 'medium' | 'large') => onUpdate({
                data: { ...component.data, imageSize: value }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tamanho da imagem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeno</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Número da Pergunta (para progressão)</Label>
          <Input
            type="number"
            min="1"
            value={component.data.stageNumber || 1}
            onChange={(e) => onUpdate({
              data: { ...component.data, stageNumber: parseInt(e.target.value) }
            })}
          />
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
          {ensureOptionsFormat().map((option, index) => (
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
