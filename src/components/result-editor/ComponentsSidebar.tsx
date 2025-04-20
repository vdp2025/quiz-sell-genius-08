
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutGrid, 
  Award, 
  Heart, 
  MessageSquareText, 
  ShoppingCart, 
  UserRound, 
  Sparkles,
  ListChecks,
  BadgePercent
} from 'lucide-react';
import { BlockType } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: BlockType) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  const componentGroups = [
    {
      title: 'Resultados',
      components: [
        { type: 'header', label: 'Cabeçalho', icon: LayoutGrid },
        { type: 'hero', label: 'Hero', icon: Sparkles },
        { type: 'styleResult', label: 'Estilo Principal', icon: Sparkles },
        { type: 'secondaryStyles', label: 'Estilos Secundários', icon: LayoutGrid }
      ]
    },
    {
      title: 'Oferta',
      components: [
        { type: 'benefitsList', label: 'Lista de Benefícios', icon: ListChecks },
        { type: 'testimonials', label: 'Depoimentos', icon: MessageSquareText },
        { type: 'pricing', label: 'Preço e CTA', icon: ShoppingCart },
        { type: 'guarantee', label: 'Garantia', icon: Award },
        { type: 'callToAction', label: 'Chamada para Ação', icon: BadgePercent }
      ]
    },
    {
      title: 'Conteúdo',
      components: [
        { type: 'authorInfo', label: 'Sobre a Autora', icon: UserRound }
      ]
    }
  ];

  return (
    <div className="h-full border-r border-[#B89B7A]/20 bg-white">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h3 className="font-medium text-[#432818]">Componentes</h3>
        <p className="text-sm text-[#8F7A6A]">Arraste ou clique para adicionar</p>
      </div>
      
      <ScrollArea className="h-[calc(100%-64px)]">
        <div className="p-4 space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="text-sm font-medium text-[#8F7A6A]">{group.title}</h4>
              <div className="grid grid-cols-2 gap-2">
                {group.components.map((component) => {
                  const Icon = component.icon;
                  return (
                    <Button
                      key={component.type}
                      variant="outline"
                      size="sm"
                      className="h-auto py-2 px-3 justify-start text-left"
                      onClick={() => onComponentSelect(component.type as BlockType)}
                    >
                      <Icon className="h-4 w-4 mr-2 text-[#B89B7A]" />
                      <span className="text-xs">{component.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
