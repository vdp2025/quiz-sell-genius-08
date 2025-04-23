import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { XCircle, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import QuizQuestionEditor from './components/QuizQuestionEditor';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  if (!component && !stage) {
    return (
      <div className="h-full flex flex-col text-gray-400 p-6 items-center justify-center text-center">
        <Settings className="h-12 w-12 mb-4 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-200 mb-2">Nenhum item selecionado</h3>
        <p className="text-gray-400">
          Selecione um componente ou uma etapa para editar suas propriedades
        </p>
      </div>
    );
  }

  if (stage && !component) {
    return (
      <div className="h-full flex flex-col border-l border-[#333333]">
        <div className="p-4 border-b border-[#333333] flex items-center justify-between">
          <h2 className="font-medium text-white">Propriedades da Etapa</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-200">Título da Etapa</Label>
              <Input 
                value={stage.title || ''} 
                onChange={(e) => onUpdateStage(stage.id, { title: e.target.value })}
                className="bg-[#333333] border-[#444444] text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-200">Tipo</Label>
              <Select 
                value={stage.type} 
                onValueChange={(value) => onUpdateStage(stage.id, { type: value as QuizStage['type'] })}
              >
                <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#333333] border-[#444444]">
                  <SelectItem value="cover" className="text-white">Capa</SelectItem>
                  <SelectItem value="question" className="text-white">Questão</SelectItem>
                  <SelectItem value="result" className="text-white">Resultado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (component) {
    return (
      <div className="h-full flex flex-col border-l border-[#333333]">
        <div className="p-4 border-b border-[#333333] flex items-center justify-between">
          <h2 className="font-medium text-white">Propriedades do Componente</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <div className="border-b border-[#333333]">
            <TabsList className="w-full bg-[#222222] border-b border-[#333333]">
              <TabsTrigger value="content" className="flex-1 text-gray-200 data-[state=active]:bg-[#333333] data-[state=active]:text-white">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1 text-gray-200 data-[state=active]:bg-[#333333] data-[state=active]:text-white">
                Estilo
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1">
            <TabsContent value="content" className="mt-0 p-4">
              {component.type === 'headline' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Texto do Título</Label>
                    <Input 
                      value={component.data.title || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, title: e.target.value } 
                      })}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'text' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Conteúdo do Texto</Label>
                    <Textarea 
                      value={component.data.text || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, text: e.target.value } 
                      })}
                      className="min-h-[200px] bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'image' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">URL da Imagem</Label>
                    <Input 
                      value={component.data.imageUrl || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, imageUrl: e.target.value } 
                      })}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-200">Texto Alternativo</Label>
                    <Input 
                      value={component.data.alt || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, alt: e.target.value } 
                      })}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                </div>
              )}
              
              {component.type === 'multipleChoice' || component.type === 'singleChoice' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Pergunta</Label>
                    <Input 
                      value={component.data.question || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        data: { ...component.data, question: e.target.value } 
                      })}
                      className="bg-[#333333] border-[#444444] text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-200">Opções</Label>
                    {component.data.options && component.data.options.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input 
                          value={option} 
                          onChange={(e) => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions[index] = e.target.value;
                            onUpdate(component.id, { 
                              data: { ...component.data, options: newOptions } 
                            });
                          }}
                          className="bg-[#333333] border-[#444444] text-white"
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => {
                            const newOptions = [...(component.data.options || [])];
                            newOptions.splice(index, 1);
                            onUpdate(component.id, { 
                              data: { ...component.data, options: newOptions } 
                            });
                          }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        const newOptions = [...(component.data.options || []), ''];
                        onUpdate(component.id, { 
                          data: { ...component.data, options: newOptions } 
                        });
                      }}
                      className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                    >
                      Adicionar Opção
                    </Button>
                  </div>
                </div>
              )}
              
              {component.type === 'stageQuestion' && (
                <QuizQuestionEditor 
                  component={component}
                  onUpdate={(updates) => onUpdate(component.id, updates)}
                />
              )}
              
              <div className="mt-6 pt-4 border-t border-[#444444]">
                <Button 
                  variant="destructive" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => onDelete(component.id)}
                >
                  Excluir Componente
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="style" className="mt-0 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-200">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color"
                      value={component.style?.backgroundColor || '#ffffff'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1 bg-[#333333] border-[#444444]"
                    />
                    <Input 
                      type="text"
                      value={component.style?.backgroundColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, backgroundColor: e.target.value } 
                      })}
                      className="flex-1 bg-[#333333] border-[#444444] text-white"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-200">Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="color"
                      value={component.style?.textColor || '#000000'} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="w-12 h-10 p-1 bg-[#333333] border-[#444444]"
                    />
                    <Input 
                      type="text"
                      value={component.style?.textColor || ''} 
                      onChange={(e) => onUpdate(component.id, { 
                        style: { ...component.style, textColor: e.target.value } 
                      })}
                      className="flex-1 bg-[#333333] border-[#444444] text-white"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-200">Arredondamento de Bordas</Label>
                  <Select 
                    value={component.style?.borderRadius || 'none'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, borderRadius: value } 
                    })}
                  >
                    <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333333] border-[#444444]">
                      <SelectItem value="none" className="text-white">Sem Arredondamento</SelectItem>
                      <SelectItem value="sm" className="text-white">Pequeno</SelectItem>
                      <SelectItem value="md" className="text-white">Médio</SelectItem>
                      <SelectItem value="lg" className="text-white">Grande</SelectItem>
                      <SelectItem value="full" className="text-white">Completo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-200">Padding Vertical</Label>
                  <Select 
                    value={component.style?.paddingY || '4'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, paddingY: value } 
                    })}
                  >
                    <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333333] border-[#444444]">
                      <SelectItem value="0" className="text-white">Nenhum</SelectItem>
                      <SelectItem value="2" className="text-white">Extra Pequeno (0.5rem)</SelectItem>
                      <SelectItem value="4" className="text-white">Pequeno (1rem)</SelectItem>
                      <SelectItem value="6" className="text-white">Médio (1.5rem)</SelectItem>
                      <SelectItem value="8" className="text-white">Grande (2rem)</SelectItem>
                      <SelectItem value="12" className="text-white">Extra Grande (3rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-200">Padding Horizontal</Label>
                  <Select 
                    value={component.style?.paddingX || '4'} 
                    onValueChange={(value) => onUpdate(component.id, { 
                      style: { ...component.style, paddingX: value } 
                    })}
                  >
                    <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#333333] border-[#444444]">
                      <SelectItem value="0" className="text-white">Nenhum</SelectItem>
                      <SelectItem value="2" className="text-white">Extra Pequeno (0.5rem)</SelectItem>
                      <SelectItem value="4" className="text-white">Pequeno (1rem)</SelectItem>
                      <SelectItem value="6" className="text-white">Médio (1.5rem)</SelectItem>
                      <SelectItem value="8" className="text-white">Grande (2rem)</SelectItem>
                      <SelectItem value="12" className="text-white">Extra Grande (3rem)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    );
  }

  return null;
};
