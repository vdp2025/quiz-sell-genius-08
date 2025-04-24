
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder/componentTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutControls } from '../editor/LayoutControls';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onUpdate
}) => {
  if (!component) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center">
        <div>
          <p className="text-gray-500">
            Selecione um componente para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleContentChange = (key: string, value: any) => {
    onUpdate({
      content: {
        ...component.content,
        [key]: value
      }
    });
  };

  const handleLayoutChange = (updates: Partial<typeof component.layout>) => {
    onUpdate({
      layout: {
        ...component.layout,
        ...updates
      }
    });
  };

  const handleStyleChange = (updates: Partial<typeof component.style>) => {
    onUpdate({
      style: {
        ...component.style,
        ...updates
      }
    });
  };

  return (
    <div className="h-full border-l">
      <Tabs defaultValue="content" className="h-full flex flex-col">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="content" className="flex-1">
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">
            Layout
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Estilo
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="content" className="mt-0">
              <div className="space-y-4">
                {component.type === 'header' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={component.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtítulo</Label>
                      <Input
                        id="subtitle"
                        value={component.content.subtitle || ''}
                        onChange={(e) => handleContentChange('subtitle', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {component.type === 'text' && (
                  <div className="space-y-2">
                    <Label htmlFor="text">Texto</Label>
                    <Input
                      id="text"
                      value={component.content.text || ''}
                      onChange={(e) => handleContentChange('text', e.target.value)}
                    />
                  </div>
                )}

                {component.type === 'image' && (
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">URL da Imagem</Label>
                    <Input
                      id="imageUrl"
                      value={component.content.imageUrl || ''}
                      onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="mt-0">
              <LayoutControls 
                layout={component.layout}
                onLayoutChange={handleLayoutChange}
              />
            </TabsContent>
            
            <TabsContent value="style" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="padding">Padding</Label>
                  <Select
                    value={component.style.padding}
                    onValueChange={(value: any) => handleStyleChange({ padding: value })}
                  >
                    <SelectTrigger id="padding">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="margin">Margem</Label>
                  <Select
                    value={component.style.margin}
                    onValueChange={(value: any) => handleStyleChange({ margin: value })}
                  >
                    <SelectTrigger id="margin">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
