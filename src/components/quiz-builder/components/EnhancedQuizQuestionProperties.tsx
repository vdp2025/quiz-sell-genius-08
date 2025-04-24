
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import GridConfigurator from './GridConfigurator';
import EnhancedImageProperties from './EnhancedImageProperties';

interface QuizQuestionPropertiesProps {
  component: QuizComponentData;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
}

const EnhancedQuizQuestionProperties: React.FC<QuizQuestionPropertiesProps> = ({
  component,
  onUpdate
}) => {
  const updateData = (updates: any) => {
    onUpdate({
      data: {
        ...component.data,
        ...updates
      }
    });
  };

  const updateOptionImage = (index: number, imageUrl: string) => {
    const updatedOptionImages = [...(component.data.optionImages || [])];
    updatedOptionImages[index] = imageUrl;
    updateData({ optionImages: updatedOptionImages });
  };

  const updateOptionText = (index: number, text: string) => {
    const updatedOptions = [...(component.data.options || [])];
    updatedOptions[index] = text;
    updateData({ options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...(component.data.options || []), ''];
    const updatedOptionImages = [...(component.data.optionImages || []), ''];
    const updatedOptionCategories = [...(component.data.optionStyleCategories || []), 'Natural'];
    
    updateData({
      options: updatedOptions,
      optionImages: updatedOptionImages,
      optionStyleCategories: updatedOptionCategories
    });
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...(component.data.options || [])];
    const updatedOptionImages = [...(component.data.optionImages || [])];
    const updatedOptionCategories = [...(component.data.optionStyleCategories || [])];
    
    updatedOptions.splice(index, 1);
    updatedOptionImages.splice(index, 1);
    updatedOptionCategories.splice(index, 1);
    
    updateData({
      options: updatedOptions,
      optionImages: updatedOptionImages,
      optionStyleCategories: updatedOptionCategories
    });
  };
  
  const styleCategories = [
    'Natural', 'Clássico', 'Contemporâneo', 'Elegante', 
    'Romântico', 'Sexy', 'Dramático', 'Criativo'
  ];

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="content">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
          <TabsTrigger value="options" className="flex-1">Opções</TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">Layout</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 space-y-4 min-h-[500px]">
            <div className="space-y-2">
              <Label htmlFor="question">Pergunta</Label>
              <Textarea
                id="question"
                value={component.data.question || ''}
                onChange={(e) => updateData({ question: e.target.value })}
                placeholder="Digite a pergunta"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Exibição</Label>
              <RadioGroup
                value={component.data.displayType || 'text'}
                onValueChange={(value) => updateData({ displayType: value })}
              >
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Texto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image">Imagem</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Ambos</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Seleções por Pergunta</Label>
              <Select
                value={String(component.data.multiSelect || 1)}
                onValueChange={(value) => updateData({ multiSelect: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quantidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num} {num === 1 ? 'Seleção' : 'Seleções'}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="options" className="p-4 space-y-4 min-h-[500px]">
            <div className="space-y-4">
              {(component.data.options || []).map((option, index) => (
                <div key={index} className="border rounded-md p-3 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Texto da Opção {index + 1}</Label>
                      <Input
                        value={option}
                        onChange={(e) => updateOptionText(index, e.target.value)}
                      />
                    </div>
                    
                    {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
                      <div className="space-y-2">
                        <Label>Imagem da Opção</Label>
                        <Input
                          value={component.data.optionImages?.[index] || ''}
                          onChange={(e) => updateOptionImage(index, e.target.value)}
                          placeholder="URL da imagem"
                        />
                        {component.data.optionImages?.[index] && (
                          <div className="mt-2 h-20 flex justify-center">
                            <img
                              src={component.data.optionImages[index]}
                              alt={`Option ${index + 1}`}
                              className="h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label>Categoria de Estilo</Label>
                      <Select
                        value={component.data.optionStyleCategories?.[index] || 'Natural'}
                        onValueChange={(value) => {
                          const updatedCategories = [...(component.data.optionStyleCategories || [])];
                          updatedCategories[index] = value;
                          updateData({ optionStyleCategories: updatedCategories });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {styleCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                className="w-full bg-[#B89B7A] text-white hover:bg-[#A38A69]"
                onClick={addOption}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="p-4 space-y-4 min-h-[500px]">
            <GridConfigurator
              columns={component.data.layout?.columns || 2}
              direction={component.data.layout?.direction || 'vertical'}
              gap={component.data.gap || 8}
              onChangeColumns={(columns) => {
                updateData({
                  layout: {
                    ...component.data.layout,
                    columns: columns as 1 | 2 | 3 | 4
                  }
                });
              }}
              onChangeDirection={(direction) => {
                updateData({
                  layout: {
                    ...component.data.layout,
                    direction
                  }
                });
              }}
              onChangeGap={(gap) => {
                updateData({ gap });
              }}
            />
            
            <div className="space-y-3 mt-6 pt-4 border-t">
              <Label>Indicador de Seleção</Label>
              <RadioGroup
                value={component.data.selectionIndicator || 'border'}
                onValueChange={(value) => updateData({ selectionIndicator: value })}
                className="grid grid-cols-3 gap-2"
              >
                {['border', 'checkbox', 'highlight'].map((indicator) => (
                  <div key={indicator} className="flex flex-col items-center">
                    <div className={`w-24 h-16 border rounded-md mb-1 flex items-center justify-center relative ${
                      indicator === 'border' ? 'border-[#B89B7A] border-2' :
                      indicator === 'highlight' ? 'bg-[#B89B7A]/20' : 'border'
                    }`}>
                      {indicator === 'checkbox' && (
                        <div className="absolute top-2 left-2 w-4 h-4 border border-[#B89B7A] rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#B89B7A] rounded-sm"></div>
                        </div>
                      )}
                      <div className="text-xs text-center">Opção</div>
                      <RadioGroupItem
                        value={indicator}
                        id={indicator}
                        className="absolute opacity-0"
                      />
                    </div>
                    <Label htmlFor={indicator} className="text-xs capitalize">
                      {indicator}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default EnhancedQuizQuestionProperties;
