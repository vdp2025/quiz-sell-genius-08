
import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StagePropertiesEditor from './StagePropertiesEditor';
import ComponentContentEditor from './ComponentContentEditor';
import ComponentStyleEditor from './ComponentStyleEditor';

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
        <h3 className="text-lg font-medium mb-2">Nenhum item selecionado</h3>
        <p className="text-gray-400">
          Selecione um componente ou uma etapa para editar suas propriedades
        </p>
      </div>
    );
  }

  if (stage && !component) {
    return (
      <div className="h-full flex flex-col text-white">
        <div className="p-4 border-b border-[#333333] flex items-center justify-between">
          <h2 className="font-medium">Propriedades da Etapa</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <StagePropertiesEditor 
            stage={stage}
            onUpdate={(updates) => onUpdateStage(stage.id, updates)}
          />
        </ScrollArea>
      </div>
    );
  }

  if (component) {
    return (
      <div className="h-full flex flex-col text-white">
        <div className="p-4 border-b border-[#333333] flex items-center justify-between">
          <h2 className="font-medium">Propriedades do Componente</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={onClose}>
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="content" className="flex-1 flex flex-col">
          <div className="border-b border-[#333333]">
            <TabsList className="w-full bg-[#262939]">
              <TabsTrigger value="content" className="flex-1 text-white data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="style" className="flex-1 text-white data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
                Estilo
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1">
            <TabsContent value="content" className="mt-0 p-4">
              <ComponentContentEditor 
                component={component} 
                onUpdate={(updates) => onUpdate(component.id, updates)}
                onDelete={() => onDelete(component.id)}
              />
            </TabsContent>
            
            <TabsContent value="style" className="mt-0 p-4">
              <ComponentStyleEditor 
                component={component} 
                onUpdate={(updates) => onUpdate(component.id, updates)}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    );
  }

  return null;
};

export default PropertiesPanel;
