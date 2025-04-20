
import React, { useState } from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Image, Upload, Text, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

interface MultipleChoicePropertiesProps {
  data: QuizComponentData['data'];
  onUpdate: (data: any) => void;
}

const MultipleChoiceProperties: React.FC<MultipleChoicePropertiesProps> = ({ data, onUpdate }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const handleAddOption = () => {
    const newOptions = [...(data.options || []), 'Nova Opção'];
    const newOptionImages = [...(data.optionImages || []), ''];
    const newOptionStyleCategories = [...(data.optionStyleCategories || []), 'Natural'];
    
    onUpdate({ 
      ...data, 
      options: newOptions,
      optionImages: newOptionImages,
      optionStyleCategories: newOptionStyleCategories
    });
  };
  
  const handleRemoveOption = (index: number) => {
    const newOptions = [...(data.options || [])];
    newOptions.splice(index, 1);
    
    const newOptionImages = [...(data.optionImages || [])];
    if (newOptionImages.length > index) {
      newOptionImages.splice(index, 1);
    }
    
    const newOptionStyleCategories = [...(data.optionStyleCategories || [])];
    if (newOptionStyleCategories.length > index) {
      newOptionStyleCategories.splice(index, 1);
    }
    
    onUpdate({ 
      ...data, 
      options: newOptions,
      optionImages: newOptionImages,
      optionStyleCategories: newOptionStyleCategories
    });
    
    if (selectedOptionIndex === index) {
      setSelectedOptionIndex(null);
    }
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(data.options || [])];
    newOptions[index] = value;
    onUpdate({ ...data, options: newOptions });
  };
  
  const handleOptionImageChange = (index: number, value: string) => {
    const newOptionImages = [...(data.optionImages || [])];
    while (newOptionImages.length <= index) {
      newOptionImages.push('');
    }
    newOptionImages[index] = value;
    onUpdate({ ...data, optionImages: newOptionImages });
  };
  
  const handleOptionStyleCategoryChange = (index: number, value: string) => {
    const newOptionStyleCategories = [...(data.optionStyleCategories || [])];
    while (newOptionStyleCategories.length <= index) {
      newOptionStyleCategories.push('Natural');
    }
    newOptionStyleCategories[index] = value;
    onUpdate({ ...data, optionStyleCategories: newOptionStyleCategories });
  };
  
  const styleCategories = [
    'Natural', 'Clássico', 'Contemporâneo', 'Elegante', 
    'Romântico', 'Sexy', 'Dramático', 'Criativo'
  ];
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
          <TabsTrigger value="options" className="flex-1">Opções</TabsTrigger>
          <TabsTrigger value="behavior" className="flex-1">Comportamento</TabsTrigger>
          <TabsTrigger value="display" className="flex-1">Exibição</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Pergunta</Label>
            <Textarea
              id="title"
              value={data.title || ''}
              onChange={(e) => onUpdate({ ...data, title: e.target.value })}
              placeholder="Digite o título da pergunta"
              rows={2}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="question">Texto da Instrução</Label>
            <Input
              id="question"
              value={data.question || ''}
              onChange={(e) => onUpdate({ ...data, question: e.target.value })}
              placeholder="Ex: Selecione 3 opções"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Opções de Resposta</Label>
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
            
            <div className="grid grid-cols-1 gap-4 mt-3">
              {(data.options || []).map((option, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden ${selectedOptionIndex === index ? 'ring-2 ring-[#B89B7A]' : ''}`}
                  onClick={() => setSelectedOptionIndex(index)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <span className="bg-[#B89B7A] text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-medium">Opção {index + 1}</h4>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOption(index);
                        }}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`option-text-${index}`}>Texto</Label>
                        <Input
                          id={`option-text-${index}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Texto da opção ${index + 1}`}
                          className="mt-1"
                        />
                      </div>
                      
                      {(data.displayType === 'image' || data.displayType === 'both') && (
                        <div>
                          <Label htmlFor={`option-image-${index}`}>URL da Imagem</Label>
                          <Input
                            id={`option-image-${index}`}
                            value={(data.optionImages && data.optionImages[index]) || ''}
                            onChange={(e) => handleOptionImageChange(index, e.target.value)}
                            placeholder="URL da imagem"
                            className="mt-1"
                          />
                          {(data.optionImages && data.optionImages[index]) && (
                            <div className="mt-2 h-16 w-full">
                              <img 
                                src={data.optionImages[index]} 
                                alt={`Preview ${index + 1}`} 
                                className="h-full object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor={`option-category-${index}`}>Categoria de Estilo</Label>
                        <Select
                          value={(data.optionStyleCategories && data.optionStyleCategories[index]) || 'Natural'}
                          onValueChange={(value) => handleOptionStyleCategoryChange(index, value)}
                        >
                          <SelectTrigger id={`option-category-${index}`} className="mt-1">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {styleCategories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {(data.options || []).length === 0 && (
                <div className="text-center py-6 border border-dashed rounded-md">
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
              <Label htmlFor="multiSelect">Número de seleções obrigatórias</Label>
              <Select
                value={String(data.multiSelect || 3)}
                onValueChange={(value) => onUpdate({ 
                  ...data, 
                  multiSelect: parseInt(value),
                  minSelections: parseInt(value),
                  maxSelections: parseInt(value)
                })}
              >
                <SelectTrigger id="multiSelect">
                  <SelectValue placeholder="Selecione o número" />
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
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Button
                  type="button"
                  variant={data.displayType === 'text' ? 'default' : 'outline'}
                  className={data.displayType === 'text' ? 'bg-[#B89B7A] hover:bg-[#9F836A]' : ''}
                  onClick={() => onUpdate({ ...data, displayType: 'text' })}
                >
                  <Text className="w-4 h-4 mr-2" />
                  Texto
                </Button>
                <Button
                  type="button"
                  variant={data.displayType === 'image' ? 'default' : 'outline'}
                  className={data.displayType === 'image' ? 'bg-[#B89B7A] hover:bg-[#9F836A]' : ''}
                  onClick={() => onUpdate({ ...data, displayType: 'image' })}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Imagem
                </Button>
                <Button
                  type="button"
                  variant={data.displayType === 'both' ? 'default' : 'outline'}
                  className={data.displayType === 'both' ? 'bg-[#B89B7A] hover:bg-[#9F836A]' : ''}
                  onClick={() => onUpdate({ ...data, displayType: 'both' })}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Ambos
                </Button>
              </div>
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
