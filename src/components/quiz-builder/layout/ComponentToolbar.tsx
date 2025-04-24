import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Type,
  Image,
  Layout,
  List,
  FileText,
  LayoutGrid,
  CheckSquare,
  CircleSlash
} from 'lucide-react';
import { QuizStage, QuizComponentType } from '@/types/quizBuilder';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComponentToolbarProps {
  activeStage: QuizStage | null;
  isPreviewing: boolean;
  onComponentSelect: (type: string) => void;
}

const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  activeStage,
  isPreviewing,
  onComponentSelect
}) => {
  if (!activeStage) {
    return (
      <div className="p-4 border-b text-center text-gray-400">
        Selecione uma etapa para adicionar componentes
      </div>
    );
  }

  const commonComponents = [
    { type: 'header', icon: Layout, label: 'Cabeçalho' },
    { type: 'text', icon: FileText, label: 'Texto' },
    { type: 'headline', icon: Type, label: 'Título' },
    { type: 'image', icon: Image, label: 'Imagem' },
  ];
  
  const questionComponents = [
    { type: 'multipleChoice', icon: CheckSquare, label: 'Múltipla Escolha' },
    { type: 'singleChoice', icon: CircleSlash, label: 'Escolha Única' },
  ];
  
  const resultComponents = [
    { type: 'quizResult', icon: LayoutGrid, label: 'Resultado' },
    { type: 'benefitsList', icon: List, label: 'Benefícios' },
  ];

  const getAvailableComponents = () => {
    let availableComponents = [...commonComponents];
    
    if (activeStage.type === 'question') {
      availableComponents = [...availableComponents, ...questionComponents];
    }
    
    if (activeStage.type === 'result') {
      availableComponents = [...availableComponents, ...resultComponents];
    }
    
    return availableComponents;
  };

  return (
    <div className="p-2 border-b flex items-center justify-between bg-white">
      <div className="flex items-center">
        <span className="text-sm font-medium mr-3">
          {activeStage.title || `Etapa ${activeStage.id.substring(0, 4)}`}
        </span>
        
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
          {activeStage.type === 'cover' && 'Capa'}
          {activeStage.type === 'question' && 'Questão'}
          {activeStage.type === 'result' && 'Resultado'}
        </span>
      </div>
      
      {!isPreviewing && (
        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
              >
                Adicionar Componente
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <ScrollArea className="h-72">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 px-2">Componentes Básicos</div>
                  {commonComponents.map((component) => (
                    <Button
                      key={component.type}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => onComponentSelect(component.type)}
                    >
                      <component.icon className="h-4 w-4 mr-2" />
                      {component.label}
                    </Button>
                  ))}
                  
                  {activeStage.type === 'question' && (
                    <>
                      <Separator className="my-2" />
                      <div className="text-xs font-semibold text-gray-500 px-2">Componentes de Questão</div>
                      {questionComponents.map((component) => (
                        <Button
                          key={component.type}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => onComponentSelect(component.type)}
                        >
                          <component.icon className="h-4 w-4 mr-2" />
                          {component.label}
                        </Button>
                      ))}
                    </>
                  )}
                  
                  {activeStage.type === 'result' && (
                    <>
                      <Separator className="my-2" />
                      <div className="text-xs font-semibold text-gray-500 px-2">Componentes de Resultado</div>
                      {resultComponents.map((component) => (
                        <Button
                          key={component.type}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm"
                          onClick={() => onComponentSelect(component.type)}
                        >
                          <component.icon className="h-4 w-4 mr-2" />
                          {component.label}
                        </Button>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default ComponentToolbar;
