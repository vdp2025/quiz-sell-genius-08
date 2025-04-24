
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeaderProperties } from '../properties/HeaderProperties';
import { MultipleChoiceProperties } from '../properties/MultipleChoiceProperties';
import { ComponentStyleProperties } from '../properties/ComponentStyleProperties';

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
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Propriedades</h2>
        </div>
        
        <div className="flex items-center justify-center h-full p-4 text-center">
          <p className="text-gray-500">
            Selecione um componente ou uma etapa para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const renderComponentProperties = () => {
    if (!component) return null;

    switch (component.type) {
      case 'header':
        return (
          <HeaderProperties
            data={component.data}
            onUpdate={onUpdate}
            componentId={component.id}
          />
        );
      case 'multipleChoice':
        return (
          <MultipleChoiceProperties
            data={component.data}
            onUpdate={onUpdate}
            componentId={component.id}
          />
        );
      default:
        return <p className="italic text-gray-500">Propriedades não disponíveis para este tipo de componente.</p>;
    }
  };

  if (component) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">{component.type}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">Estilo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                {renderComponentProperties()}
                
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      onDelete(component.id);
                      onClose();
                    }}
                  >
                    Excluir Componente
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="style">
                <ComponentStyleProperties
                  style={component.style}
                  onUpdate={onUpdate}
                  componentId={component.id}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    );
  }

  return null;
};
