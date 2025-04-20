import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  HelpCircle, 
  Image, 
  ListChecks, 
  Type, 
  Layout, 
  FileText,
  AlignLeft,
  PanelTop,
  Grid3X3,
  CheckCircle,
  Radio,
  SlidersHorizontal,
  MessageCircle,
  CalendarRange
} from 'lucide-react';
import { QuizComponentType } from '@/types/quizBuilder';

interface ComponentsSidebarProps {
  onComponentSelect: (type: QuizComponentType) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  const componentGroups = [
    {
      title: 'Layout',
      components: [
        { type: 'header', label: 'Cabeçalho', icon: <PanelTop className="h-4 w-4" /> },
        { type: 'section', label: 'Seção', icon: <Layout className="h-4 w-4" /> },
        { type: 'columns', label: 'Colunas', icon: <Grid3X3 className="h-4 w-4" /> },
      ]
    },
    {
      title: 'Básicos',
      components: [
        { type: 'headline', label: 'Título', icon: <Type className="h-4 w-4" /> },
        { type: 'text', label: 'Texto', icon: <AlignLeft className="h-4 w-4" /> },
        { type: 'image', label: 'Imagem', icon: <Image className="h-4 w-4" /> },
      ]
    },
    {
      title: 'Perguntas',
      components: [
        { type: 'multipleChoice', label: 'Múltipla Escolha', icon: <CheckCircle className="h-4 w-4" /> },
        { type: 'singleChoice', label: 'Escolha Única', icon: <Radio className="h-4 w-4" /> },
        { type: 'scale', label: 'Escala', icon: <SlidersHorizontal className="h-4 w-4" /> },
        { type: 'openEnded', label: 'Resposta Aberta', icon: <MessageCircle className="h-4 w-4" /> },
        { type: 'date', label: 'Data', icon: <CalendarRange className="h-4 w-4" /> },
      ]
    },
    {
      title: 'Avançados',
      components: [
        { type: 'benefitsList', label: 'Lista de Benefícios', icon: <ListChecks className="h-4 w-4" /> },
        { type: 'faq', label: 'Perguntas Frequentes', icon: <HelpCircle className="h-4 w-4" /> },
        { type: 'quizResult', label: 'Resultado do Quiz', icon: <FileText className="h-4 w-4" /> },
      ]
    }
  ];

  return (
    <div className="h-full border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium text-[#432818]">Componentes</h2>
        <p className="text-sm text-[#8F7A6A]">Arraste ou clique para adicionar</p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-sm font-medium text-[#432818]">{group.title}</h3>
              <div className="space-y-2">
                {group.components.map((component) => (
                  <Card
                    key={component.type}
                    className="p-2 cursor-pointer hover:bg-[#FAF9F7] transition-colors flex items-center gap-2"
                    onClick={() => onComponentSelect(component.type as QuizComponentType)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', component.type);
                    }}
                  >
                    <div className="bg-[#FAF9F7] rounded-md p-1.5">
                      {component.icon}
                    </div>
                    <span className="text-sm text-[#432818]">{component.label}</span>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
