
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizOptionEditor from './QuizOptionEditor';
import { generateId } from '@/utils/idGenerator';
import { Plus } from 'lucide-react';

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
      return {
        id: option.id || generateId(),
        text: option.text || '',
        imageUrl: option.imageUrl || '',
        styleCategory: option.styleCategory || 'Natural'
      };
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
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[#432818]">Título da Pergunta</Label>
          <Input
            value={component.data.question || ''}
            onChange={(e) => onUpdate({
              data: { ...component.data, question: e.target.value }
            })}
            placeholder="Digite a pergunta"
            className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#432818]">Tipo de Exibição</Label>
          <Select
            value={component.data.displayType || 'text'}
            onValueChange={(value: 'text' | 'image' | 'both') => onUpdate({
              data: { ...component.data, displayType: value }
            })}
          >
            <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]">
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
          <Label className="text-[#432818]">Tamanho das Imagens</Label>
          <Select
            value={component.data.imageSize || 'medium'}
            onValueChange={(value: 'small' | 'medium' | 'large') => onUpdate({
              data: { ...component.data, imageSize: value }
            })}
          >
            <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]">
              <SelectValue placeholder="Tamanho das imagens" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#432818]">Layout das Opções</Label>
          <Select
            value={String(component.data.layout?.columns || 2)}
            onValueChange={(value) => onUpdate({
              data: { 
                ...component.data, 
                layout: {
                  ...component.data.layout,
                  columns: parseInt(value) as 1 | 2 | 3 | 4
                }
              }
            })}
          >
            <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]">
              <SelectValue placeholder="Colunas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Coluna</SelectItem>
              <SelectItem value="2">2 Colunas</SelectItem>
              <SelectItem value="3">3 Colunas</SelectItem>
              <SelectItem value="4">4 Colunas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#432818]">Número de Seleções</Label>
          <Select
            value={String(component.data.multiSelect || component.data.maxSelections || 3)}
            onValueChange={(value) => onUpdate({
              data: { 
                ...component.data, 
                multiSelect: parseInt(value),
                maxSelections: parseInt(value) 
              }
            })}
          >
            <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]">
              <SelectValue placeholder="Número de seleções" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 seleção</SelectItem>
              <SelectItem value="3">3 seleções</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[#432818]">Indicador de Seleção</Label>
          <Select
            value={component.data.selectionIndicator || 'border'}
            onValueChange={(value: 'border' | 'checkbox' | 'highlight') => onUpdate({
              data: { ...component.data, selectionIndicator: value }
            })}
          >
            <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A] focus:ring-[#B89B7A]">
              <SelectValue placeholder="Tipo de indicador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="border">Borda</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="highlight">Destaque</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-[#432818] text-lg">Opções</Label>
          <Button 
            variant="outline" 
            onClick={handleAddOption}
            className="text-[#B89B7A] border-[#B89B7A] hover:bg-[#B89B7A]/10 hover:text-[#432818]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Opção
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
