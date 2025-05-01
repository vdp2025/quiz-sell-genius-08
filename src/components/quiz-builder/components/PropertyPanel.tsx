
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { QuizComponentData, QuizComponentLayout } from '@/types/quizBuilder';
import { Trash2, Plus, Image, Layout, PaintBucket, Type, Grid } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface PropertyPanelProps {
  selectedComponentId: string | null;
  components: QuizComponentData[];
  onUpdate: (id: string, data: Partial<QuizComponentData['data']>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponentId,
  components,
  onUpdate,
  onDelete,
  onClose,
}) => {
  if (!selectedComponentId) {
    return (
      <div className="p-4 text-center text-[#432818]/60">
        Selecione um componente para editar suas propriedades
      </div>
    );
  }

  const component = components.find(c => c.id === selectedComponentId);

  if (!component) {
    return (
      <div className="p-4 text-center text-[#432818]/60">
        Componente não encontrado
      </div>
    );
  }

  const handleUpdate = (field: string, value: any) => {
    onUpdate(selectedComponentId, { 
      ...component.data, 
      [field]: value 
    });
  };

  const handleStyleUpdate = (field: string, value: any) => {
    onUpdate(selectedComponentId, {
      ...component.data,
      style: { ...(component.data.style || {}), [field]: value }
    });
  };

  return (
    <div className="h-full p-4 space-y-4 bg-white overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#432818]">Propriedades</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500"
          onClick={() => onDelete(selectedComponentId)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Basic Content Fields */}
          {component.type !== 'stageQuestion' && (
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={component.data.title || ''}
                placeholder="Digite o título"
                onChange={(e) => handleUpdate('title', e.target.value)}
              />
            </div>
          )}

          {component.type !== 'stageQuestion' && (
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input
                id="subtitle"
                value={component.data.subtitle || ''}
                placeholder="Digite o subtítulo"
                onChange={(e) => handleUpdate('subtitle', e.target.value)}
              />
            </div>
          )}

          {component.type === 'stageQuestion' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Pergunta</Label>
                <Textarea
                  id="question"
                  value={component.data.question || ''}
                  placeholder="Digite a pergunta"
                  className="min-h-[80px]"
                  onChange={(e) => handleUpdate('question', e.target.value)}
                />
              </div>

              {/* Question Options */}
              <div className="space-y-2">
                <Label>Opções de Resposta</Label>
                <ScrollArea className="h-[200px] border rounded p-2">
                  {(component.data.options || []).map((option, index) => (
                    <div key={index} className="flex gap-2 mb-3 items-center">
                      <div className="flex-1">
                        <Input 
                          value={option} 
                          onChange={(e) => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions[index] = e.target.value;
                            handleUpdate('options', newOptions);
                          }}
                          placeholder={`Opção ${index + 1}`}
                          className="mb-1"
                        />
                        
                        {/* Image URL for option */}
                        {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
                          <div className="flex gap-1 items-center">
                            <Input 
                              value={(component.data.optionImages || [])[index] || ''}
                              onChange={(e) => {
                                const newImages = [...(component.data.optionImages || [])];
                                newImages[index] = e.target.value;
                                handleUpdate('optionImages', newImages);
                              }}
                              placeholder="URL da imagem"
                              className="text-xs"
                            />
                          </div>
                        )}
                        
                        {/* Style Category and Score */}
                        <div className="flex gap-2 mt-1">
                          <div className="flex-1">
                            <Input 
                              value={(component.data.optionStyleCategories || [])[index] || ''}
                              onChange={(e) => {
                                const newCategories = [...(component.data.optionStyleCategories || [])];
                                newCategories[index] = e.target.value;
                                handleUpdate('optionStyleCategories', newCategories);
                              }}
                              placeholder="Categoria"
                              className="text-xs"
                            />
                          </div>
                          <div className="w-20">
                            <Input 
                              type="number"
                              min="0"
                              max="1"
                              step="0.1"
                              value={(component.data.optionScores || [])[index] || 0}
                              onChange={(e) => {
                                const newScores = [...(component.data.optionScores || [])];
                                newScores[index] = parseFloat(e.target.value);
                                handleUpdate('optionScores', newScores);
                              }}
                              placeholder="0-1"
                              className="text-xs"
                            />
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          const newOptions = [...(component.data.options || [])];
                          const newImages = [...(component.data.optionImages || [])];
                          const newCategories = [...(component.data.optionStyleCategories || [])];
                          const newScores = [...(component.data.optionScores || [])];
                          
                          newOptions.splice(index, 1);
                          newImages.splice(index, 1);
                          newCategories.splice(index, 1);
                          newScores.splice(index, 1);
                          
                          handleUpdate('options', newOptions);
                          handleUpdate('optionImages', newImages);
                          handleUpdate('optionStyleCategories', newCategories);
                          handleUpdate('optionScores', newScores);
                        }}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <Button
                  onClick={() => {
                    const newOptions = [...(component.data.options || []), ''];
                    const newImages = [...(component.data.optionImages || []), ''];
                    const newCategories = [...(component.data.optionStyleCategories || []), ''];
                    const newScores = [...(component.data.optionScores || []), 0];
                    
                    handleUpdate('options', newOptions);
                    handleUpdate('optionImages', newImages);
                    handleUpdate('optionStyleCategories', newCategories);
                    handleUpdate('optionScores', newScores);
                  }}
                  className="w-full mt-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
                >
                  <Plus className="h-4 w-4 mr-1" /> Adicionar Opção
                </Button>
              </div>
              
              {/* Multiple Choice Configuration */}
              <div className="space-y-2">
                <Label htmlFor="multiSelect">Seleção Múltipla</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="multiSelectEnabled"
                    checked={(component.data.multiSelect || 0) > 0}
                    onCheckedChange={(checked) => {
                      handleUpdate('multiSelect', checked ? 1 : 0);
                    }}
                  />
                  <span className="text-sm">Permitir mais de uma seleção</span>
                </div>
                
                {(component.data.multiSelect || 0) > 0 && (
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <Label htmlFor="minSelections">Seleções Mínimas</Label>
                      <span className="text-sm">{component.data.minSelections || 1}</span>
                    </div>
                    <Input
                      id="minSelections"
                      type="number"
                      min="1"
                      max={component.data.options?.length || 1}
                      value={component.data.minSelections || 1}
                      onChange={(e) => handleUpdate('minSelections', parseInt(e.target.value) || 1)}
                    />
                    
                    <div className="flex justify-between">
                      <Label htmlFor="maxSelections">Seleções Máximas</Label>
                      <span className="text-sm">{component.data.maxSelections || component.data.options?.length || 1}</span>
                    </div>
                    <Input
                      id="maxSelections"
                      type="number"
                      min={component.data.minSelections || 1}
                      max={component.data.options?.length || 1}
                      value={component.data.maxSelections || component.data.options?.length || 1}
                      onChange={(e) => handleUpdate('maxSelections', parseInt(e.target.value) || 1)}
                    />
                  </div>
                )}
              </div>
              
              {/* Required Field */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={component.data.required || false}
                  onCheckedChange={(checked) => {
                    handleUpdate('required', checked);
                  }}
                />
                <Label htmlFor="required">Resposta obrigatória</Label>
              </div>
              
              {/* Auto Advance */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoAdvance"
                  checked={component.data.autoAdvance || false}
                  onCheckedChange={(checked) => {
                    handleUpdate('autoAdvance', checked);
                  }}
                />
                <Label htmlFor="autoAdvance">Avançar automaticamente após seleção</Label>
              </div>
            </div>
          )}

          {component.type === 'text' && (
            <div className="space-y-2">
              <Label htmlFor="text">Conteúdo do Texto</Label>
              <Textarea
                id="text"
                value={component.data.text || ''}
                placeholder="Digite o texto"
                className="min-h-[100px]"
                onChange={(e) => handleUpdate('text', e.target.value)}
              />
            </div>
          )}

          {component.type === 'stageCover' && (
            <div className="space-y-2">
              <Label htmlFor="buttonText">Texto do Botão</Label>
              <Input
                id="buttonText"
                value={component.data.buttonText || ''}
                placeholder="Iniciar Quiz"
                onChange={(e) => handleUpdate('buttonText', e.target.value)}
              />
            </div>
          )}

          {component.type === 'stageResult' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="primaryStyleTitle">Título do Estilo Principal</Label>
                <Input
                  id="primaryStyleTitle"
                  value={component.data.primaryStyleTitle || ''}
                  placeholder="Seu Estilo Predominante"
                  onChange={(e) => handleUpdate('primaryStyleTitle', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryStylesTitle">Título dos Estilos Secundários</Label>
                <Input
                  id="secondaryStylesTitle"
                  value={component.data.secondaryStylesTitle || ''}
                  placeholder="Estilos Complementares"
                  onChange={(e) => handleUpdate('secondaryStylesTitle', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="callToActionText">Texto do Botão de Ação</Label>
                <Input
                  id="callToActionText"
                  value={component.data.callToActionText || ''}
                  placeholder="Ver Recomendações"
                  onChange={(e) => handleUpdate('callToActionText', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="showPercentages"
                  checked={component.data.showPercentages || false}
                  onCheckedChange={(checked) => {
                    handleUpdate('showPercentages', checked);
                  }}
                />
                <Label htmlFor="showPercentages">Mostrar percentuais</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="showDescriptions"
                  checked={component.data.showDescriptions || false}
                  onCheckedChange={(checked) => {
                    handleUpdate('showDescriptions', checked);
                  }}
                />
                <Label htmlFor="showDescriptions">Mostrar descrições</Label>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          {/* Display Type */}
          {component.type === 'stageQuestion' && (
            <div className="space-y-2">
              <Label htmlFor="displayType">Tipo de Exibição</Label>
              <Select 
                value={component.data.displayType || 'text'} 
                onValueChange={(value) => handleUpdate('displayType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Apenas Texto</SelectItem>
                  <SelectItem value="image">Apenas Imagem</SelectItem>
                  <SelectItem value="both">Texto e Imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {(component.type === 'stageQuestion' && 
            (component.data.displayType === 'image' || component.data.displayType === 'both')) && (
            <div className="space-y-2">
              <Label htmlFor="imageSize">Tamanho da Imagem</Label>
              <Select 
                value={component.data.imageSize || 'medium'} 
                onValueChange={(value) => handleUpdate('imageSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Selection Indicator */}
          {component.type === 'stageQuestion' && (
            <div className="space-y-2">
              <Label htmlFor="selectionIndicator">Indicador de Seleção</Label>
              <Select 
                value={component.data.selectionIndicator || 'border'} 
                onValueChange={(value) => handleUpdate('selectionIndicator', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="border">Borda</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="highlight">Destaque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Background Color */}
          <div className="space-y-2">
            <Label>Cor de Fundo</Label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded border">
                <input
                  type="color"
                  value={component.data.backgroundColor || '#FAF9F7'}
                  onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                  className="w-10 h-10 cursor-pointer rounded"
                />
              </div>
              <Input
                value={component.data.backgroundColor || '#FAF9F7'}
                onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                placeholder="#FAF9F7"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* Text Color */}
          <div className="space-y-2">
            <Label>Cor do Texto</Label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded border">
                <input
                  type="color"
                  value={component.data.textColor || '#432818'}
                  onChange={(e) => handleUpdate('textColor', e.target.value)}
                  className="w-10 h-10 cursor-pointer rounded"
                />
              </div>
              <Input
                value={component.data.textColor || '#432818'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                placeholder="#432818"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* Accent Color (for result page) */}
          {component.type === 'stageResult' && (
            <div className="space-y-2">
              <Label>Cor de Destaque</Label>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded border">
                  <input
                    type="color"
                    value={component.data.accentColor || '#B89B7A'}
                    onChange={(e) => handleUpdate('accentColor', e.target.value)}
                    className="w-10 h-10 cursor-pointer rounded"
                  />
                </div>
                <Input
                  value={component.data.accentColor || '#B89B7A'}
                  onChange={(e) => handleUpdate('accentColor', e.target.value)}
                  placeholder="#B89B7A"
                  className="flex-1"
                />
              </div>
            </div>
          )}
          
          {/* Border Radius */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="borderRadius">Arredondamento de Bordas</Label>
              <span className="text-sm">{component.data.borderRadius || '8px'}</span>
            </div>
            <Select 
              value={component.data.borderRadius || '8'} 
              onValueChange={(value) => handleUpdate('borderRadius', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Sem Arredondamento</SelectItem>
                <SelectItem value="4">Pequeno (4px)</SelectItem>
                <SelectItem value="8">Médio (8px)</SelectItem>
                <SelectItem value="12">Grande (12px)</SelectItem>
                <SelectItem value="full">Completo (Circular)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          {/* Layout Options */}
          {component.type === 'stageQuestion' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layout.columns">Número de Colunas</Label>
                <Select 
                  value={String(component.data.layout?.columns || 1)} 
                  onValueChange={(value) => handleUpdate('layout', { 
                    ...(component.data.layout || {}), 
                    columns: parseInt(value) as 1 | 2 | 3 | 4 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <Label htmlFor="layout.direction">Direção do Layout</Label>
                <Select 
                  value={component.data.layout?.direction || 'vertical'} 
                  onValueChange={(value) => handleUpdate('layout', { 
                    ...(component.data.layout || {}), 
                    direction: value as 'vertical' | 'horizontal' 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vertical">Vertical</SelectItem>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Spacing Controls */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="paddingY">Espaçamento Vertical</Label>
              <span className="text-sm">{component.data.paddingY || '16px'}</span>
            </div>
            <Select 
              value={component.data.paddingY || '16'} 
              onValueChange={(value) => handleUpdate('paddingY', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">Pequeno (4px)</SelectItem>
                <SelectItem value="8">Médio (8px)</SelectItem>
                <SelectItem value="16">Grande (16px)</SelectItem>
                <SelectItem value="24">Extra Grande (24px)</SelectItem>
                <SelectItem value="32">Muito Grande (32px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="paddingX">Espaçamento Horizontal</Label>
              <span className="text-sm">{component.data.paddingX || '16px'}</span>
            </div>
            <Select 
              value={component.data.paddingX || '16'} 
              onValueChange={(value) => handleUpdate('paddingX', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">Pequeno (4px)</SelectItem>
                <SelectItem value="8">Médio (8px)</SelectItem>
                <SelectItem value="16">Grande (16px)</SelectItem>
                <SelectItem value="24">Extra Grande (24px)</SelectItem>
                <SelectItem value="32">Muito Grande (32px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
