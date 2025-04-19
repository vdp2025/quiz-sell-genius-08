
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutTemplate,
  Image,
  Type,
  ListChecks,
  MessageSquare,
  DollarSign,
  Shield,
  MousePointer,
  Award,
  Layout,
  Gift
} from 'lucide-react';
import { EditorBlock } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: EditorBlock['type']) => void;
}

export function ComponentsSidebar({ onComponentSelect }: ComponentsSidebarProps) {
  const components = [
    { type: 'header', label: 'Cabeçalho', icon: LayoutTemplate },
    { type: 'hero-section', label: 'Seção Hero', icon: Layout },
    { type: 'bonus-carousel', label: 'Carrossel de Bônus', icon: Gift },
    { type: 'headline', label: 'Título', icon: Type },
    { type: 'image', label: 'Imagem', icon: Image },
    { type: 'text', label: 'Texto', icon: Type },
    { type: 'benefits', label: 'Benefícios', icon: ListChecks },
    { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { type: 'pricing', label: 'Preço', icon: DollarSign },
    { type: 'guarantee', label: 'Garantia', icon: Shield },
    { type: 'cta', label: 'Botão CTA', icon: MousePointer },
    { type: 'style-result', label: 'Resultado do Estilo', icon: Award },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-white border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {components.map((component) => (
            <Button
              key={component.type}
              variant="ghost"
              className="w-full justify-start text-[#8F7A6A] hover:text-[#432818] hover:bg-[#FAF9F7]"
              onClick={() => onComponentSelect(component.type)}
            >
              <component.icon className="w-4 h-4 mr-2" />
              {component.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
