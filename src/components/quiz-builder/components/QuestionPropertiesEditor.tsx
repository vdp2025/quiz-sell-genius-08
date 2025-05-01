
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash, Plus, ChevronDown, ChevronUp, Image, PencilLine } from 'lucide-react';
import { QuizComponentData } from '@/types/quizBuilder';
import ImageUploadField from './ImageUploadField';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface QuestionPropertiesEditorProps {
  data: QuizComponentData['data'];
  onUpdate: (data: Partial<QuizComponentData['data']>) => void;
}

const SortableOption = ({ 
  id, 
  children,
  handle = false
}: { 
  id: string; 
  children: React.ReactNode;
  handle?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {handle ? (
        <div {...attributes} {...listeners}>
          {children}
        </div>
      ) : (
        <div {...attributes} {...listeners} className="touch-none">
          {children}
        </div>
      )}
    </div>
  );
};

export const QuestionPropertiesEditor: React.FC<QuestionPropertiesEditorProps> = ({
  data,
  onUpdate
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [optionExpanded, setOptionExpanded] = React.useState<string | null>(null);
  
  // Handle option reordering
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = (data.options || []).findIndex((_, i) => `option-${i}` === active.id);
      const newIndex = (data.options || []).findIndex((_, i) => `option-${i}` === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOptions = [...(data.options || [])];
        const [movedOption] = newOptions.splice(oldIndex, 1);
        newOptions.splice(newIndex, 0, movedOption);
        
        // Also move related data (images, categories, scores)
        const newImages = [...(data.optionImages || [])];
        if (newImages.length > 0) {
          const [movedImage] = newImages.splice(oldIndex, 1);
          newImages.splice(newIndex, 0, movedImage || '');
        }
        
        const newCategories = [...(data.optionStyleCategories || [])];
        if (newCategories.length > 0) {
          const [movedCategory] = newCategories.splice(oldIndex, 1);
          newCategories.splice(newIndex, 0, movedCategory || '');
        }
        
        const newScores = [...(data.optionScores || [])];
        if (newScores.length > 0) {
          const [movedScore] = newScores.splice(oldIndex, 1);
          newScores.splice(newIndex, 0, movedScore || 0);
        }
        
        onUpdate({
          options: newOptions,
          optionImages: newImages,
          optionStyleCategories: newCategories,
          optionScores: newScores
        });
      }
    }
  };
  
  // Add a new option
  const addOption = () => {
    const newOptions = [...(data.options || []), ''];
    const newImages = [...(data.optionImages || []), ''];
    const newCategories = [...(data.optionStyleCategories || []), ''];
    const newScores = [...(data.optionScores || []), 0];
    
    onUpdate({
      options: newOptions,
      optionImages: newImages,
      optionStyleCategories: newCategories,
      optionScores: newScores
    });
    
    // Expand the newly added option
    setTimeout(() => {
      setOptionExpanded(`option-${newOptions.length - 1}`);
    }, 100);
  };
  
  // Update a single option
  const updateOption = (index: number, value: string) => {
    const newOptions = [...(data.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };
  
  // Update option image
  const updateOptionImage = (index: number, value: string) => {
    const newImages = [...(data.optionImages || [])];
    newImages[index] = value;
    onUpdate({ optionImages: newImages });
  };
  
  // Update option category
  const updateOptionCategory = (index: number, value: string) => {
    const newCategories = [...(data.optionStyleCategories || [])];
    newCategories[index] = value;
    onUpdate({ optionStyleCategories: newCategories });
  };
  
  // Update option score
  const updateOptionScore = (index: number, value: number) => {
    const newScores = [...(data.optionScores || [])];
    newScores[index] = value;
    onUpdate({ optionScores: newScores });
  };
  
  // Delete an option
  const deleteOption = (index: number) => {
    const newOptions = [...(data.options || [])];
    const newImages = [...(data.optionImages || [])];
    const newCategories = [...(data.optionStyleCategories || [])];
    const newScores = [...(data.optionScores || [])];
    
    newOptions.splice(index, 1);
    newImages.splice(index, 1);
    newCategories.splice(index, 1);
    newScores.splice(index, 1);
    
    onUpdate({
      options: newOptions,
      optionImages: newImages,
      optionStyleCategories: newCategories,
      optionScores: newScores
    });
  };
  
  const styleCategories = [
    'Natural',
    'Clássico',
    'Contemporâneo',
    'Elegante',
    'Romântico',
    'Sexy',
    'Dramático',
    'Criativo'
  ];

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="space-y-2">
        <Label>Pergunta</Label>
        <Textarea
          value={data.question || ''}
          onChange={(e) => onUpdate({ question: e.target.value })}
          placeholder="Digite a pergunta aqui..."
          className="min-h-[100px]"
        />
      </div>
      
      {/* Display Settings */}
      <div className="space-y-2">
        <Label>Tipo de Exibição</Label>
        <Select 
          value={data.displayType || 'text'} 
          onValueChange={(value: 'text' | 'image' | 'both') => onUpdate({ displayType: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">
              <div className="flex items-center">
                <PencilLine className="h-4 w-4 mr-2" />
                <span>Apenas Texto</span>
              </div>
            </SelectItem>
            <SelectItem value="image">
              <div className="flex items-center">
                <Image className="h-4 w-4 mr-2" />
                <span>Apenas Imagem</span>
              </div>
            </SelectItem>
            <SelectItem value="both">
              <div className="flex items-center">
                <PencilLine className="h-4 w-4 mr-2" />
                <Image className="h-4 w-4 mr-2" />
                <span>Texto e Imagem</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Layout */}
      <div className="space-y-2">
        <Label>Layout</Label>
        <Select 
          value={String(data.layout?.columns || 1)} 
          onValueChange={(value) => onUpdate({ 
            layout: {
              ...(data.layout || {}),
              columns: parseInt(value) as 1 | 2 | 3 | 4,
              direction: 'vertical'
            } 
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
      
      {/* Selection Indicator */}
      <div className="space-y-2">
        <Label>Indicador de Seleção</Label>
        <Select 
          value={data.selectionIndicator || 'border'} 
          onValueChange={(value: 'border' | 'checkbox' | 'highlight') => onUpdate({ selectionIndicator: value })}
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
      
      {/* Multiple Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="multiselect"
            checked={(data.multiSelect || 0) > 0}
            onCheckedChange={(checked) => onUpdate({ multiSelect: checked ? 1 : 0 })}
          />
          <Label htmlFor="multiselect">Permitir múltipla seleção</Label>
        </div>
        
        {(data.multiSelect || 0) > 0 && (
          <div className="grid grid-cols-2 gap-4 pl-6">
            <div className="space-y-2">
              <Label>Mínimo de seleções</Label>
              <Input
                type="number"
                min={1}
                max={(data.options || []).length}
                value={data.minSelections || 1}
                onChange={(e) => onUpdate({ minSelections: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Máximo de seleções</Label>
              <Input
                type="number"
                min={(data.minSelections || 1)}
                max={(data.options || []).length}
                value={data.maxSelections || (data.options || []).length}
                onChange={(e) => onUpdate({ maxSelections: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Auto Advance */}
      <div className="flex items-center space-x-2">
        <Switch
          id="auto-advance"
          checked={data.autoAdvance || false}
          onCheckedChange={(checked) => onUpdate({ autoAdvance: checked })}
        />
        <Label htmlFor="auto-advance">Avançar automaticamente após seleção</Label>
      </div>
      
      {/* Required Question */}
      <div className="flex items-center space-x-2">
        <Switch
          id="required"
          checked={data.required || false}
          onCheckedChange={(checked) => onUpdate({ required: checked })}
        />
        <Label htmlFor="required">Pergunta obrigatória</Label>
      </div>
      
      {/* Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Opções ({(data.options || []).length})</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={addOption}
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>
        
        <div className="space-y-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={(data.options || []).map((_, i) => `option-${i}`)}
              strategy={verticalListSortingStrategy}
            >
              {(data.options || []).map((option, index) => (
                <Collapsible
                  key={`option-${index}`}
                  open={optionExpanded === `option-${index}`}
                  onOpenChange={(open) => setOptionExpanded(open ? `option-${index}` : null)}
                >
                  <SortableOption id={`option-${index}`}>
                    <div className="mb-1">
                      <Card className="overflow-hidden border">
                        <div className="flex items-center bg-[#FAF9F7] border-b p-2">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-grab mr-2" />
                          <div className="flex-1 truncate text-sm">
                            {option || `Opção ${index + 1}`}
                          </div>
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => deleteOption(index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                {optionExpanded === `option-${index}` ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="p-3 space-y-4">
                            <div className="space-y-2">
                              <Label>Texto da opção</Label>
                              <Textarea
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                placeholder={`Opção ${index + 1}`}
                                className="resize-none"
                                rows={2}
                              />
                            </div>
                            
                            {(data.displayType === 'image' || data.displayType === 'both') && (
                              <ImageUploadField
                                label="Imagem da opção"
                                value={(data.optionImages || [])[index] || ''}
                                onChange={(url) => updateOptionImage(index, url)}
                              />
                            )}
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Categoria de estilo</Label>
                                <Select
                                  value={(data.optionStyleCategories || [])[index] || ''}
                                  onValueChange={(value) => updateOptionCategory(index, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar categoria" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {styleCategories.map((category) => (
                                      <SelectItem key={category} value={category}>
                                        {category}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Pontuação</Label>
                                  <span className="text-xs">
                                    {(data.optionScores || [])[index] || 0}
                                  </span>
                                </div>
                                <Slider
                                  value={[(data.optionScores || [])[index] || 0]}
                                  min={0}
                                  max={1}
                                  step={0.1}
                                  onValueChange={(value) => updateOptionScore(index, value[0])}
                                />
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </div>
                  </SortableOption>
                </Collapsible>
              ))}
            </SortableContext>
          </DndContext>
        </div>
        
        {(data.options || []).length === 0 && (
          <div className="border border-dashed rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-2">Nenhuma opção definida</p>
            <Button
              size="sm"
              onClick={addOption}
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Opção
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPropertiesEditor;
