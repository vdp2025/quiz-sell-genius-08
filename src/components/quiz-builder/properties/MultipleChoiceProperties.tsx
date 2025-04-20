
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Image, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

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
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
          <TabsTrigger value="behavior" className="flex-1">Comportamento</TabsTrigger>
          <TabsTrigger value="display" className="flex-1">Exibição</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minSelections">Seleções mínimas</Label>
              <Select
                value={String(data.minSelections || 0)}
                onValueChange={(value) => onUpdate({ ...data, minSelections: parseInt(value) })}
              >
                <SelectTrigger id="minSelections">
                  <SelectValue placeholder="Número mínimo de seleções" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 (Opcional)</SelectItem>
                  <SelectItem value="1">1 seleção</SelectItem>
                  <SelectItem value="2">2 seleções</SelectItem>
                  <SelectItem value="3">3 seleções</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxSelections">Seleções máximas</Label>
              <Select
                value={String(data.maxSelections || data.multiSelect || 1)}
                onValueChange={(value) => onUpdate({ 
                  ...data, 
                  maxSelections: parseInt(value),
                  multiSelect: parseInt(value) // Manter compatibilidade
                })}
              >
                <SelectTrigger id="maxSelections">
                  <SelectValue placeholder="Número máximo de seleções" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 seleção</SelectItem>
                  <SelectItem value="2">2 seleções</SelectItem>
                  <SelectItem value="3">3 seleções</SelectItem>
                  <SelectItem value="4">4 seleções</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoAdvance">Avançar automaticamente</Label>
              <Switch
                id="autoAdvance"
                checked={data.autoAdvance !== false}
                onCheckedChange={(checked) => onUpdate({ ...data, autoAdvance: checked })}
              />
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
        </TabsContent>
        
        <TabsContent value="display" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayType">Tipo de exibição</Label>
              <Select
                value={data.displayType || 'text'}
                onValueChange={(value: 'text' | 'image' | 'both') => 
                  onUpdate({ ...data, displayType: value })
                }
              >
                <SelectTrigger id="displayType">
                  <SelectValue placeholder="Selecione o tipo de exibição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Apenas texto</SelectItem>
                  <SelectItem value="image">Apenas imagem</SelectItem>
                  <SelectItem value="both">Texto e imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {data.displayType !== 'text' && (
              <div className="space-y-2">
                <Label htmlFor="imageSize">Tamanho da imagem</Label>
                <Select
                  value={data.imageSize || 'medium'}
                  onValueChange={(value: 'small' | 'medium' | 'large') => 
                    onUpdate({ ...data, imageSize: value })
                  }
                >
                  <SelectTrigger id="imageSize">
                    <SelectValue placeholder="Selecione o tamanho da imagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="columns">Colunas</Label>
              <Select
                value={String(data.layout?.columns || 2)}
                onValueChange={(value) => onUpdate({ 
                  ...data, 
                  layout: { 
                    ...data.layout,
                    columns: parseInt(value) 
                  } 
                })}
              >
                <SelectTrigger id="columns">
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
              <Label htmlFor="direction">Direção</Label>
              <Select
                value={data.layout?.direction || 'vertical'}
                onValueChange={(value: 'vertical' | 'horizontal') => onUpdate({ 
                  ...data, 
                  layout: {
                    ...data.layout,
                    direction: value
                  }
                })}
              >
                <SelectTrigger id="direction">
                  <SelectValue placeholder="Direção do layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultipleChoiceProperties;
