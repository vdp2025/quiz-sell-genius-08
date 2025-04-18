
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Block } from '@/types/editor';
import { 
  Layout, Type, Image, ListChecks, 
  DollarSign, ShieldCheck, MousePointer, Target, 
  Layers, ShoppingBag, MessageSquare, BookText
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  const componentGroups = [
    {
      title: 'Básicos',
      items: [
        { type: 'header', label: 'Cabeçalho', icon: <BookText className="w-4 h-4" /> },
        { type: 'headline', label: 'Título e Subtítulo', icon: <Type className="w-4 h-4" /> },
        { type: 'text', label: 'Texto', icon: <Type className="w-4 h-4" /> },
        { type: 'image', label: 'Imagem', icon: <Image className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Resultados',
      items: [
        { type: 'style-result', label: 'Estilo Principal', icon: <Target className="w-4 h-4" /> },
        { type: 'secondary-styles', label: 'Estilos Secundários', icon: <Layers className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Página de Venda',
      items: [
        { type: 'hero-section', label: 'Seção Hero', icon: <Layout className="w-4 h-4" /> },
        { type: 'products', label: 'Produtos', icon: <ShoppingBag className="w-4 h-4" /> },
        { type: 'benefits', label: 'Benefícios', icon: <ListChecks className="w-4 h-4" /> },
        { type: 'pricing', label: 'Preço', icon: <DollarSign className="w-4 h-4" /> },
        { type: 'testimonials', label: 'Depoimentos', icon: <MessageSquare className="w-4 h-4" /> },
        { type: 'guarantee', label: 'Garantia', icon: <ShieldCheck className="w-4 h-4" /> },
        { type: 'cta', label: 'Botão de Ação', icon: <MousePointer className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Componentes</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {componentGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <h3 className="text-sm font-medium text-[#8F7A6A]">{group.title}</h3>
              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item, itemIndex) => (
                  <Button
                    key={`${group.title}-${itemIndex}`}
                    variant="outline"
                    className="justify-start border-[#B89B7A]/20 hover:bg-[#fffaf7] hover:text-[#B89B7A]"
                    onClick={() => onComponentSelect(item.type as Block['type'])}
                  >
                    <div className="mr-2">{item.icon}</div>
                    <span>{item.label}</span>
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
