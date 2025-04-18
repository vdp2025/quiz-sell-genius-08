
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Type, Image, ListChecks, MessageSquare, DollarSign } from 'lucide-react';
import { EditorBlock } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: EditorBlock['type']) => void;
}

export function ComponentsSidebar({ onComponentSelect }: ComponentsSidebarProps) {
  const components = [
    { type: 'headline' as const, label: 'Título', icon: Type },
    { type: 'text' as const, label: 'Texto', icon: Type },
    { type: 'image' as const, label: 'Imagem', icon: Image },
    { type: 'benefits' as const, label: 'Benefícios', icon: ListChecks },
    { type: 'testimonials' as const, label: 'Depoimentos', icon: MessageSquare },
    { type: 'pricing' as const, label: 'Preço', icon: DollarSign },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="font-playfair text-lg text-[#432818]">Componentes</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
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
