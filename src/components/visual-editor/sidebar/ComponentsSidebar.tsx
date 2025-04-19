
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
  Gift,
  Sparkles,
  ShoppingCart,
  Columns
} from 'lucide-react';
import { EditorBlock } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: EditorBlock['type']) => void;
}

export function ComponentsSidebar({ onComponentSelect }: ComponentsSidebarProps) {
  const components = [
    { type: 'header' as const, label: 'Cabeçalho', icon: LayoutTemplate },
    { type: 'hero-section' as const, label: 'Seção Hero', icon: Layout },
    { type: 'style-hero' as const, label: 'Hero de Estilo', icon: Sparkles },
    { type: 'offer' as const, label: 'Oferta de Estilo', icon: ShoppingCart },
    { type: 'bonus-carousel' as const, label: 'Carrossel de Bônus', icon: Gift },
    { type: 'headline' as const, label: 'Título', icon: Type },
    { type: 'image' as const, label: 'Imagem', icon: Image },
    { type: 'text' as const, label: 'Texto', icon: Type },
    { type: 'two-column' as const, label: 'Duas Colunas', icon: Columns },
    { type: 'benefits' as const, label: 'Benefícios', icon: ListChecks },
    { type: 'testimonials' as const, label: 'Depoimentos', icon: MessageSquare },
    { type: 'pricing' as const, label: 'Preço', icon: DollarSign },
    { type: 'guarantee' as const, label: 'Garantia', icon: Shield },
    { type: 'cta' as const, label: 'Botão CTA', icon: MousePointer },
    { type: 'style-result' as const, label: 'Resultado do Estilo', icon: Award },
    { type: 'secondary-styles' as const, label: 'Estilos Secundários', icon: Award },
  ];

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
