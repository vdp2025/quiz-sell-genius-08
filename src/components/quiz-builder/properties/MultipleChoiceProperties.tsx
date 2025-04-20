
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface MultipleChoicePropertiesProps {
  data: QuizComponentData['data'];
  onUpdate: (data: any) => void;
}

const MultipleChoiceProperties: React.FC<MultipleChoicePropertiesProps> = ({ data, onUpdate }) => {
  const handleAddOption = () => {
    const newOptions = [...(data.options || []), 'Nova Opção'];
    onUpdate({ ...data, options: newOptions });
  };
  
  const handleRemoveOption = (index: number) => {
    const newOptions = [...(data.options || [])];
    newOptions.splice(index, 1);
    onUpdate({ ...data, options: newOptions });
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(data.options || [])];
    newOptions[index] = value;
    onUpdate({ ...data, options: newOptions });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="question">Pergunta</Label>
        <Textarea
          id="question"
          value={data.question || ''}
          onChange={(e) => onUpdate({ ...data, question: e.target.value })}
          placeholder="Digite a pergunta aqui"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Opções</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddOption}
            className="h-8"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Adicionar
          </Button>
        </div>
        
        <div className="space-y-2 mt-3">
          {(data.options || []).map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Opção ${index + 1}`}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveOption(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          
          {(data.options || []).length === 0 && (
            <div className="text-center py-3 border border-dashed rounded-md">
              <p className="text-sm text-gray-500">Nenhuma opção adicionada</p>
              <Button 
                variant="ghost" 
                onClick={handleAddOption}
                className="mt-1 text-sm h-8"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Adicionar Opção
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="multiSelect">Número de seleções</Label>
        <Select
          value={String(data.multiSelect || 1)}
          onValueChange={(value) => onUpdate({ ...data, multiSelect: parseInt(value) })}
        >
          <SelectTrigger id="multiSelect">
            <SelectValue placeholder="Número de seleções" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 seleção</SelectItem>
            <SelectItem value="2">2 seleções</SelectItem>
            <SelectItem value="3">3 seleções</SelectItem>
            <SelectItem value="4">4 seleções</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">
          Quantas opções o usuário deve selecionar para esta pergunta
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="required">Pergunta obrigatória</Label>
        <Switch
          id="required"
          checked={data.required !== false}
          onCheckedChange={(checked) => onUpdate({ ...data, required: checked })}
        />
      </div>
    </div>
  );
};

export default MultipleChoiceProperties;
