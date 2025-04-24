
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Layout,
  Type,
  Image,
  ListChecks,
  Clock,
  ArrowRight,
  Layers,
  Award,
  Grid,
  Rows,
  Columns
} from 'lucide-react';
import { QuizComponentType } from '@/types/quizBuilder/componentTypes';

interface ComponentCategory {
  title: string;
  items: {
    type: QuizComponentType;
    label: string;
    icon: React.FC<any>;
    description: string;
  }[];
}

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    title: 'Layout',
    items: [
      {
        type: 'header',
        label: 'Cabeçalho',
        icon: Layout,
        description: 'Adiciona um cabeçalho à página'
      },
      {
        type: 'divider',
        label: 'Divisor',
        icon: Rows,
        description: 'Adiciona uma linha divisória'
      },
      {
        type: 'carousel',
        label: 'Carrossel',
        icon: Layers,
        description: 'Cria um carrossel de conteúdo'
      }
    ]
  },
  {
    title: 'Conteúdo',
    items: [
      {
        type: 'text',
        label: 'Texto',
        icon: Type,
        description: 'Adiciona um bloco de texto'
      },
      {
        type: 'image',
        label: 'Imagem',
        icon: Image,
        description: 'Adiciona uma imagem'
      }
    ]
  },
  {
    title: 'Questões',
    items: [
      {
        type: 'multipleChoice',
        label: 'Múltipla Escolha',
        icon: ListChecks,
        description: 'Pergunta com múltiplas opções'
      },
      {
        type: 'singleChoice',
        label: 'Escolha Única',
        icon: Grid,
        description: 'Pergunta com uma única opção'
      }
    ]
  },
  {
    title: 'Elementos',
    items: [
      {
        type: 'countdown',
        label: 'Contador',
        icon: Clock,
        description: 'Adiciona um contador regressivo'
      },
      {
        type: 'progress',
        label: 'Progresso',
        icon: ArrowRight,
        description: 'Mostra o progresso do quiz'
      }
    ]
  }
];

interface ComponentsSidebarProps {
  onSelectComponent: (type: QuizComponentType) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onSelectComponent
}) => {
  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Componentes</h2>
        <p className="text-sm text-gray-500">Arraste ou clique para adicionar</p>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-6">
          {COMPONENT_CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">{category.title}</h3>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((item) => (
                  <Button
                    key={item.type}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-sm font-normal h-auto py-3",
                      "hover:bg-gray-50 active:bg-gray-100"
                    )}
                    onClick={() => onSelectComponent(item.type)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', item.type);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium text-gray-900">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
