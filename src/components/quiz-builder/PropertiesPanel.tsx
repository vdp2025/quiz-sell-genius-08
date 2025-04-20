
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { X, Trash, Upload, Image, Type } from 'lucide-react';
import { QuizComponentData, QuizOption, StyleCategory } from '@/types/quizBuilder';
import { ImageUploader } from './ImageUploader';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  onClose: () => void;
  onUpdate: (data: Partial<QuizComponentData>) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onClose,
  onUpdate,
  onDelete
}) => {
  if (!component) {
    return (
      <div className="h-full border-l bg-white flex flex-col justify-center items-center text-[#8F7A6A] text-center p-4">
        <p className="mb-2">Selecione um componente para editar suas propriedades</p>
        <p className="text-sm">Clique em um componente no painel de visualização ou adicione um novo a partir do menu lateral.</p>
      </div>
    );
  }

  const getComponentTitle = () => {
    switch (component.type) {
      case 'header': return 'Cabeçalho';
      case 'section': return 'Seção';
      case 'columns': return 'Colunas';
      case 'headline': return 'Título';
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'multipleChoice': return 'Múltipla Escolha';
      case 'singleChoice': return 'Escolha Única';
      case 'scale': return 'Escala';
      case 'openEnded': return 'Resposta Aberta';
      case 'date': return 'Data';
      case 'benefitsList': return 'Lista de Benefícios';
      case 'faq': return 'Perguntas Frequentes';
      case 'quizResult': return 'Resultado do Quiz';
      case 'continueButton': return 'Botão de Continuar';
      default: return 'Componente';
    }
  };

  const renderContentTab = () => {
    switch (component.type) {
      case 'headline':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title" 
                value={component.data.title || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, title: e.target.value } })}
                placeholder="Insira o título"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input 
                id="subtitle" 
                value={component.data.subtitle || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, subtitle: e.target.value } })}
                placeholder="Insira o subtítulo"
              />
            </div>
          </>
        );
        
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Texto</Label>
            <Textarea 
              id="text" 
              value={component.data.text || ''} 
              onChange={(e) => onUpdate({ data: { ...component.data, text: e.target.value } })}
              placeholder="Insira o texto"
              className="min-h-[200px]"
            />
          </div>
        );
        
      case 'image':
        return (
          <div className="space-y-4">
            <Label>Imagem</Label>
            <ImageUploader 
              imageUrl={component.data.imageUrl}
              onImageUpload={(url) => onUpdate({ data: { ...component.data, imageUrl: url } })}
              onImageRemove={() => onUpdate({ data: { ...component.data, imageUrl: '' } })}
            />
            
            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input 
                id="alt" 
                value={component.data.alt || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, alt: e.target.value } })}
                placeholder="Descrição da imagem"
              />
            </div>
          </div>
        );
        
      case 'multipleChoice':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pergunta</Label>
              <Textarea 
                id="question" 
                value={component.data.question || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, question: e.target.value } })}
                placeholder="Insira a pergunta"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Número de Seleções Obrigatórias</Label>
              <Select
                value={String(component.data.multiSelect || 3)}
                onValueChange={(value) => onUpdate({ data: { ...component.data, multiSelect: parseInt(value) } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 seleção</SelectItem>
                  <SelectItem value="2">2 seleções</SelectItem>
                  <SelectItem value="3">3 seleções</SelectItem>
                  <SelectItem value="4">4 seleções</SelectItem>
                  <SelectItem value="5">5 seleções</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Exibição</Label>
              <Select
                value={component.data.displayType || 'text'}
                onValueChange={(value) => {
                  const displayType = value as 'text' | 'image' | 'both';
                  onUpdate({ data: { ...component.data, displayType } });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Exibição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Apenas Texto</SelectItem>
                  <SelectItem value="image">Apenas Imagem</SelectItem>
                  <SelectItem value="both">Texto e Imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
              <div className="space-y-2">
                <Label>Colunas da Grade</Label>
                <Select
                  value={String(component.data.gridColumns || 2)}
                  onValueChange={(value) => onUpdate({ data: { ...component.data, gridColumns: parseInt(value) } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 coluna</SelectItem>
                    <SelectItem value="2">2 colunas</SelectItem>
                    <SelectItem value="3">3 colunas</SelectItem>
                    <SelectItem value="4">4 colunas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
              <div className="space-y-2">
                <Label>Altura das Imagens (px)</Label>
                <Input 
                  type="number" 
                  value={component.data.imageHeight || 200} 
                  onChange={(e) => onUpdate({ data: { ...component.data, imageHeight: parseInt(e.target.value) } })}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Opções</Label>
              
              {(component.data.options || []).map((option, index) => (
                <div key={index} className="flex flex-col gap-2 p-3 border rounded-md mb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Opção {index + 1}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const newOptions = [...(component.data.options || [])];
                        newOptions.splice(index, 1);
                        onUpdate({ data: { ...component.data, options: newOptions } });
                        
                        // Also update fullOptions if they exist
                        if (component.data.fullOptions) {
                          const newFullOptions = [...component.data.fullOptions];
                          newFullOptions.splice(index, 1);
                          onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                        }
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Input 
                    value={option} 
                    onChange={(e) => {
                      const newOptions = [...(component.data.options || [])];
                      newOptions[index] = e.target.value;
                      onUpdate({ data: { ...component.data, options: newOptions } });
                      
                      // Also update fullOptions if they exist
                      if (component.data.fullOptions) {
                        const newFullOptions = [...component.data.fullOptions];
                        newFullOptions[index] = { 
                          ...newFullOptions[index], 
                          text: e.target.value 
                        };
                        onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                      }
                    }}
                    placeholder="Texto da opção"
                  />
                  
                  {(component.data.displayType === 'image' || component.data.displayType === 'both') && (
                    <div>
                      <Label className="mb-1 block">Imagem</Label>
                      <ImageUploader 
                        imageUrl={component.data.fullOptions?.[index]?.imageUrl}
                        onImageUpload={(url) => {
                          // Make sure fullOptions exists
                          const fullOptions = component.data.fullOptions || 
                            (component.data.options || []).map(text => ({ 
                              text,
                              styleCategory: 'Natural' as StyleCategory,
                              points: 1
                            }));
                          
                          const newFullOptions = [...fullOptions];
                          newFullOptions[index] = { 
                            ...newFullOptions[index],
                            imageUrl: url,
                            text: component.data.options?.[index] || ''
                          };
                          
                          onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                        }}
                        onImageRemove={() => {
                          if (component.data.fullOptions) {
                            const newFullOptions = [...component.data.fullOptions];
                            newFullOptions[index] = { 
                              ...newFullOptions[index],
                              imageUrl: undefined
                            };
                            onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                          }
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`category-${index}`}>Categoria</Label>
                      <Select
                        value={component.data.fullOptions?.[index]?.styleCategory || 'Natural'}
                        onValueChange={(value) => {
                          // Make sure fullOptions exists
                          const fullOptions = component.data.fullOptions || 
                            (component.data.options || []).map(text => ({ 
                              text,
                              styleCategory: 'Natural' as StyleCategory,
                              points: 1
                            }));
                          
                          const newFullOptions = [...fullOptions];
                          newFullOptions[index] = { 
                            ...newFullOptions[index],
                            styleCategory: value as StyleCategory,
                            text: component.data.options?.[index] || ''
                          };
                          
                          onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                        }}
                      >
                        <SelectTrigger id={`category-${index}`}>
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Natural">Natural</SelectItem>
                          <SelectItem value="Clássico">Clássico</SelectItem>
                          <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
                          <SelectItem value="Elegante">Elegante</SelectItem>
                          <SelectItem value="Romântico">Romântico</SelectItem>
                          <SelectItem value="Sexy">Sexy</SelectItem>
                          <SelectItem value="Dramático">Dramático</SelectItem>
                          <SelectItem value="Criativo">Criativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor={`points-${index}`}>Pontos</Label>
                      <Input 
                        id={`points-${index}`}
                        type="number"
                        min="0"
                        max="5"
                        value={component.data.fullOptions?.[index]?.points || 1}
                        onChange={(e) => {
                          // Make sure fullOptions exists
                          const fullOptions = component.data.fullOptions || 
                            (component.data.options || []).map(text => ({ 
                              text,
                              styleCategory: 'Natural' as StyleCategory,
                              points: 1
                            }));
                          
                          const newFullOptions = [...fullOptions];
                          newFullOptions[index] = { 
                            ...newFullOptions[index],
                            points: parseInt(e.target.value),
                            text: component.data.options?.[index] || ''
                          };
                          
                          onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  const newOptions = [...(component.data.options || []), 'Nova opção'];
                  onUpdate({ data: { ...component.data, options: newOptions } });
                  
                  // Add to fullOptions if they exist
                  if (component.data.fullOptions) {
                    const newFullOptions = [...component.data.fullOptions, { 
                      text: 'Nova opção',
                      styleCategory: 'Natural' as StyleCategory,
                      points: 1
                    }];
                    onUpdate({ data: { ...component.data, fullOptions: newFullOptions } });
                  }
                }}
              >
                Adicionar Opção
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 pt-3">
              <Switch
                id="continueButton"
                checked={component.data.showContinueButton || false}
                onCheckedChange={(checked) => onUpdate({ data: { ...component.data, showContinueButton: checked } })}
              />
              <Label htmlFor="continueButton">Mostrar botão de continuar</Label>
            </div>
            
            {component.data.showContinueButton && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Texto do Botão</Label>
                  <Input 
                    id="buttonText" 
                    value={component.data.buttonText || 'Continuar'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonText: e.target.value } })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buttonUrl">URL de Destino (opcional)</Label>
                  <Input 
                    id="buttonUrl" 
                    value={component.data.buttonUrl || ''} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonUrl: e.target.value } })}
                    placeholder="https://exemplo.com/pagina"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="buttonColor">Cor do Botão</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="buttonColor"
                        type="color"
                        value={component.data.buttonColor || '#B89B7A'} 
                        onChange={(e) => onUpdate({ data: { ...component.data, buttonColor: e.target.value } })}
                        className="w-12 h-8"
                      />
                      <Input 
                        value={component.data.buttonColor || '#B89B7A'} 
                        onChange={(e) => onUpdate({ data: { ...component.data, buttonColor: e.target.value } })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buttonTextColor">Cor do Texto</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="buttonTextColor"
                        type="color"
                        value={component.data.buttonTextColor || '#FFFFFF'} 
                        onChange={(e) => onUpdate({ data: { ...component.data, buttonTextColor: e.target.value } })}
                        className="w-12 h-8"
                      />
                      <Input 
                        value={component.data.buttonTextColor || '#FFFFFF'} 
                        onChange={(e) => onUpdate({ data: { ...component.data, buttonTextColor: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
        
      case 'singleChoice':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Pergunta</Label>
              <Textarea 
                id="question" 
                value={component.data.question || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, question: e.target.value } })}
                placeholder="Insira a pergunta"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Opções</Label>
              
              {(component.data.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-md mb-3">
                  <Input 
                    value={option} 
                    onChange={(e) => {
                      const newOptions = [...(component.data.options || [])];
                      newOptions[index] = e.target.value;
                      onUpdate({ data: { ...component.data, options: newOptions } });
                    }}
                    placeholder="Texto da opção"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      const newOptions = [...(component.data.options || [])];
                      newOptions.splice(index, 1);
                      onUpdate({ data: { ...component.data, options: newOptions } });
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  const newOptions = [...(component.data.options || []), 'Nova opção'];
                  onUpdate({ data: { ...component.data, options: newOptions } });
                }}
              >
                Adicionar Opção
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 pt-3">
              <Switch
                id="continueButton"
                checked={component.data.showContinueButton || false}
                onCheckedChange={(checked) => onUpdate({ data: { ...component.data, showContinueButton: checked } })}
              />
              <Label htmlFor="continueButton">Mostrar botão de continuar</Label>
            </div>
            
            {component.data.showContinueButton && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Texto do Botão</Label>
                  <Input 
                    id="buttonText" 
                    value={component.data.buttonText || 'Continuar'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonText: e.target.value } })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buttonUrl">URL de Destino (opcional)</Label>
                  <Input 
                    id="buttonUrl" 
                    value={component.data.buttonUrl || ''} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonUrl: e.target.value } })}
                    placeholder="https://exemplo.com/pagina"
                  />
                </div>
              </>
            )}
          </div>
        );
        
      case 'continueButton':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="buttonText">Texto do Botão</Label>
              <Input 
                id="buttonText" 
                value={component.data.buttonText || 'Continuar'} 
                onChange={(e) => onUpdate({ data: { ...component.data, buttonText: e.target.value } })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonUrl">URL de Destino</Label>
              <Input 
                id="buttonUrl" 
                value={component.data.buttonUrl || ''} 
                onChange={(e) => onUpdate({ data: { ...component.data, buttonUrl: e.target.value } })}
                placeholder="https://exemplo.com/pagina"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="buttonColor">Cor do Botão</Label>
                <div className="flex gap-2">
                  <Input 
                    id="buttonColor"
                    type="color"
                    value={component.data.buttonColor || '#B89B7A'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonColor: e.target.value } })}
                    className="w-12 h-8"
                  />
                  <Input 
                    value={component.data.buttonColor || '#B89B7A'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonColor: e.target.value } })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonTextColor">Cor do Texto</Label>
                <div className="flex gap-2">
                  <Input 
                    id="buttonTextColor"
                    type="color"
                    value={component.data.buttonTextColor || '#FFFFFF'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonTextColor: e.target.value } })}
                    className="w-12 h-8"
                  />
                  <Input 
                    value={component.data.buttonTextColor || '#FFFFFF'} 
                    onChange={(e) => onUpdate({ data: { ...component.data, buttonTextColor: e.target.value } })}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonRadius">Arredondamento (px)</Label>
              <Input 
                id="buttonRadius" 
                type="number"
                value={component.data.buttonRadius || 4} 
                onChange={(e) => onUpdate({ data: { ...component.data, buttonRadius: Number(e.target.value) } })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonPadding">Espaçamento Interno</Label>
              <Input 
                id="buttonPadding" 
                value={component.data.buttonPadding || '0.5rem 1rem'} 
                onChange={(e) => onUpdate({ data: { ...component.data, buttonPadding: e.target.value } })}
                placeholder="0.5rem 1rem"
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center p-4 text-[#8F7A6A]">
            <p>Edite as propriedades deste componente na aba "Estilo".</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full border-l bg-white flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium text-[#432818]">{getComponentTitle()}</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDelete}
            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="style">Estilo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              {renderContentTab()}
            </TabsContent>
            
            <TabsContent value="style" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="padding">Espaçamento</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    id="paddingY" 
                    value={component.style?.paddingY || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, paddingY: e.target.value } })}
                    placeholder="Vertical (px)"
                  />
                  <Input 
                    id="paddingX" 
                    value={component.style?.paddingX || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, paddingX: e.target.value } })}
                    placeholder="Horizontal (px)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="backgroundColor" 
                    type="color"
                    value={component.style?.backgroundColor || '#ffffff'} 
                    onChange={(e) => onUpdate({ style: { ...component.style, backgroundColor: e.target.value } })}
                    className="w-12 h-8 p-1"
                  />
                  <Input 
                    value={component.style?.backgroundColor || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, backgroundColor: e.target.value } })}
                    placeholder="#ffffff ou rgba(255,255,255,1)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textColor">Cor do Texto</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="textColor" 
                    type="color"
                    value={component.style?.textColor || '#000000'} 
                    onChange={(e) => onUpdate({ style: { ...component.style, textColor: e.target.value } })}
                    className="w-12 h-8 p-1"
                  />
                  <Input 
                    value={component.style?.textColor || ''} 
                    onChange={(e) => onUpdate({ style: { ...component.style, textColor: e.target.value } })}
                    placeholder="#000000 ou rgba(0,0,0,1)"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Família da Fonte</Label>
                <Select
                  value={component.style?.fontFamily || 'default'}
                  onValueChange={(value) => onUpdate({ style: { ...component.style, fontFamily: value === 'default' ? undefined : value } })}
                >
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Fonte padrão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Fonte padrão</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans-serif">Sans-serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                    <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                    <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamanho da Fonte (px)</Label>
                <Input 
                  id="fontSize" 
                  type="number"
                  value={component.style?.fontSize || ''} 
                  onChange={(e) => onUpdate({ style: { ...component.style, fontSize: Number(e.target.value) } })}
                  placeholder="16"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontWeight">Peso da Fonte</Label>
                <Select
                  value={component.style?.fontWeight || 'normal'}
                  onValueChange={(value) => onUpdate({ style: { ...component.style, fontWeight: value } })}
                >
                  <SelectTrigger id="fontWeight">
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bold">Negrito</SelectItem>
                    <SelectItem value="lighter">Leve</SelectItem>
                    <SelectItem value="bolder">Extra Negrito</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                    <SelectItem value="400">400</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="600">600</SelectItem>
                    <SelectItem value="700">700</SelectItem>
                    <SelectItem value="800">800</SelectItem>
                    <SelectItem value="900">900</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="borderRadius">Borda Arredondada</Label>
                <Input 
                  id="borderRadius" 
                  type="number"
                  value={component.style?.borderRadius || 0} 
                  onChange={(e) => onUpdate({ style: { ...component.style, borderRadius: Number(e.target.value) } })}
                  placeholder="0"
                />
              </div>
              
              {component.type === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="imageWidth">Largura da Imagem (%)</Label>
                  <Input 
                    id="imageWidth" 
                    type="number"
                    min="10"
                    max="100"
                    value={component.style?.imageWidth || 100} 
                    onChange={(e) => onUpdate({ style: { ...component.style, imageWidth: Number(e.target.value) } })}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
