
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { QuizComponentType } from '@/types/quizBuilder/componentTypes';
import { FileText, Image, SquareStack, Type, AlignLeft, CheckSquare, ListFilter, Clock } from 'lucide-react';

interface ComponentsSidebarProps {
  onSelectComponent: (type: QuizComponentType) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onSelectComponent }) => {
  const components = [
    { type: 'header', label: 'Cabeçalho', icon: <Type className="w-4 h-4" /> },
    { type: 'cover', label: 'Capa', icon: <Image className="w-4 h-4" /> },
    { type: 'question', label: 'Questão', icon: <FileText className="w-4 h-4" /> },
    { type: 'text', label: 'Texto', icon: <AlignLeft className="w-4 h-4" /> },
    { type: 'image', label: 'Imagem', icon: <Image className="w-4 h-4" /> },
    { type: 'multipleChoice', label: 'Múltipla Escolha', icon: <CheckSquare className="w-4 h-4" /> },
    { type: 'singleChoice', label: 'Escolha Única', icon: <SquareStack className="w-4 h-4" /> },
    { type: 'carousel', label: 'Carrossel', icon: <SquareStack className="w-4 h-4" /> },
    { type: 'countdown', label: 'Contagem', icon: <Clock className="w-4 h-4" /> },
    { type: 'progress', label: 'Progresso', icon: <ListFilter className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Componentes</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-2 gap-2">
          {components.map((component) => (
            <Button
              key={component.type}
              variant="outline"
              className="flex flex-col h-auto py-3 justify-center items-center"
              onClick={() => onSelectComponent(component.type)}
            >
              <div className="mb-1">{component.icon}</div>
              <span className="text-xs">{component.label}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
