
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  LayoutTemplate, 
  Sparkles,
  ListChecks, 
  MessageSquare, 
  DollarSign, 
  Shield, 
  MousePointer,
  HelpCircle,
  Columns,
  Award
} from 'lucide-react';
import { Block } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  const components = [
    { type: 'style-hero', label: 'Hero de Estilo', icon: Sparkles },
    { type: 'style-result', label: 'Resultado do Estilo', icon: Award },
    { type: 'headline', label: 'Título', icon: Type },
    { type: 'two-column', label: 'Duas Colunas', icon: Columns },
    { type: 'benefits', label: 'Benefícios', icon: ListChecks },
    { type: 'offer', label: 'Oferta', icon: DollarSign },
    { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { type: 'guarantee', label: 'Garantia', icon: Shield },
    { type: 'faq', label: 'Perguntas Frequentes', icon: HelpCircle },
  ];

  return (
    <div className="h-full flex flex-col border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-semibold text-[#432818]">Blocos para Página de Venda</h2>
        <p className="text-sm text-[#8F7A6A] mt-1">
          Arraste os componentes para a área de edição
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {components.map((component) => {
            const IconComponent = component.icon;
            return (
              <Button
                key={component.type}
                variant="ghost"
                className="w-full justify-start text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]"
                onClick={() => onComponentSelect(component.type as Block['type'])}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {component.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentsSidebar;
