import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { X, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import HeaderProperties from './properties/HeaderProperties';
import TextProperties from './properties/TextProperties';
import ImageProperties from './properties/ImageProperties';
import MultipleChoiceProperties from './properties/MultipleChoiceProperties';
import QuizResultProperties from './properties/QuizResultProperties';
import StyleProperties from './properties/StyleProperties';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (data: Partial<QuizComponentData>) => void;
  onUpdateStage: (data: Partial<QuizStage>) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  // If no component is selected, but a stage is selected, show stage properties
  if (!component && stage) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Propriedades da Etapa</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Etapa</Label>
                <Input
                  id="title"
                  value={stage.title}
                  onChange={(e) => onUpdateStage({ title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Etapa</Label>
                <div className="text-sm py-2 px-3 bg-gray-100 rounded-md">
                  {stage.type === 'cover' ? 'Capa' : stage.type === 'question' ? 'Questão' : 'Resultado'}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Ordem</Label>
                <div className="text-sm py-2 px-3 bg-gray-100 rounded-md">
                  {stage.order + 1}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }
  
  // If no component and no stage is selected
  if (!component) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Propriedades</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 text-center">
          <p className="text-[#8F7A6A]">
            Selecione um componente ou uma etapa para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }
  
  const getComponentTitle = () => {
    switch (component.type) {
      case 'header':
        return 'Cabeçalho';
      case 'headline':
        return 'Título';
      case 'text':
        return 'Texto';
      case 'image':
        return 'Imagem';
      case 'multipleChoice':
        return 'Múltipla Escolha';
      case 'singleChoice':
        return 'Escolha Única';
      case 'scale':
        return 'Escala';
      case 'quizResult':
        return 'Resultado do Quiz';
      default:
        return 'Componente';
    }
  };
  
  const renderComponentProperties = () => {
    const props = {
      data: component.data,
      onUpdate: (data: any) => onUpdate({ data })
    };

    switch (component.type) {
      case 'header':
        return <HeaderProperties {...props} />;
      case 'headline':
        return <TextProperties {...props} isHeadline />;
      case 'text':
        return <TextProperties {...props} />;
      case 'image':
        return <ImageProperties {...props} />;
      case 'multipleChoice':
        return <MultipleChoiceProperties {...props} />;
      case 'quizResult':
        return <QuizResultProperties {...props} />;
      default:
        return <div>Propriedades não disponíveis para este tipo de componente</div>;
    }
  };
  
  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">{getComponentTitle()}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
              <TabsTrigger value="style" className="flex-1">Estilo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              {renderComponentProperties()}
            </TabsContent>
            
            <TabsContent value="style">
              <StyleProperties 
                style={component.style || {}} 
                onUpdate={(style) => onUpdate({ style })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};
