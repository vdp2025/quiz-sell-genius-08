
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { LayoutTemplate, Type, Image, ListCheck, BarChart2, Clock, ShieldCheck, MousePointer, Palette, Users, Gift, Star } from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onComponentSelect
}) => {
  const componentGroups = [
    {
      title: 'Básicos',
      components: [
        { type: 'header', name: 'Cabeçalho', icon: <LayoutTemplate className="w-4 h-4" /> },
        { type: 'headline', name: 'Título e Subtítulo', icon: <Type className="w-4 h-4" /> },
        { type: 'text', name: 'Texto', icon: <Type className="w-4 h-4" /> },
        { type: 'image', name: 'Imagem', icon: <Image className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Estilo',
      components: [
        { type: 'style-result', name: 'Estilo Principal', icon: <Palette className="w-4 h-4" /> },
        { type: 'secondary-styles', name: 'Estilos Secundários', icon: <Star className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Página de Venda',
      components: [
        { type: 'hero-section', name: 'Seção Hero', icon: <LayoutTemplate className="w-4 h-4" /> },
        { type: 'benefits', name: 'Benefícios', icon: <ListCheck className="w-4 h-4" /> },
        { type: 'products', name: 'Produtos', icon: <BarChart2 className="w-4 h-4" /> },
        { type: 'testimonials', name: 'Depoimentos', icon: <Users className="w-4 h-4" /> },
        { type: 'pricing', name: 'Preço', icon: <BarChart2 className="w-4 h-4" /> },
        { type: 'guarantee', name: 'Garantia', icon: <ShieldCheck className="w-4 h-4" /> },
        { type: 'cta', name: 'Botão CTA', icon: <MousePointer className="w-4 h-4" /> },
        { type: 'bonus-carousel', name: 'Carrossel de Bônus', icon: <Gift className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
        <p className="text-sm text-[#8F7A6A]">Arraste ou clique para adicionar</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {componentGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <h3 className="font-medium text-sm text-[#432818] mb-3">{group.title}</h3>
              <div className="space-y-2">
                {group.components.map((component, componentIndex) => (
                  <Button
                    key={componentIndex}
                    variant="outline"
                    className="w-full justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7] hover:border-[#B89B7A]"
                    onClick={() => onComponentSelect(component.type as Block['type'])}
                  >
                    {component.icon}
                    <span className="ml-2">{component.name}</span>
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

export default ComponentsSidebar;
