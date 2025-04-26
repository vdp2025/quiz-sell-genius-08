import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Layout, 
  Type, 
  Image, 
  CreditCard, 
  Check, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Columns, 
  Palette, 
  Video, 
  Layers, 
  Heart,
  Share2,
  Gift,
  SlidersHorizontal,
  FileText,
  Maximize,
  HelpCircle,
  ImagePlus,
  Code,
  Wand2
} from 'lucide-react';

const componentGroups = [
  {
    title: 'Básico',
    components: [
      { name: 'Cabeçalho', type: 'header', icon: <Layout className="h-4 w-4" /> },
      { name: 'Título', type: 'headline', icon: <Type className="h-4 w-4" /> },
      { name: 'Texto', type: 'text', icon: <FileText className="h-4 w-4" /> },
      { name: 'Imagem', type: 'image', icon: <Image className="h-4 w-4" /> },
      { name: 'Duas Colunas', type: 'two-column', icon: <Columns className="h-4 w-4" /> },
      { name: 'Espaçador', type: 'spacer', icon: <Maximize className="h-4 w-4" /> },
      { name: 'Ícone Decorativo', type: 'icon', icon: <Sparkles className="h-4 w-4" /> },
    ]
  },
  {
    title: 'Seções',
    components: [
      { name: 'Seção Hero', type: 'hero-section', icon: <Layers className="h-4 w-4" /> },
      { name: 'Benefícios', type: 'benefits', icon: <Check className="h-4 w-4" /> },
      { name: 'Depoimentos', type: 'testimonials', icon: <Heart className="h-4 w-4" /> },
      { name: 'Produtos', type: 'products', icon: <ShieldCheck className="h-4 w-4" /> },
      { name: 'Carrossel de Bônus', type: 'bonus-carousel', icon: <Gift className="h-4 w-4" /> },
      { name: 'Garantia', type: 'guarantee', icon: <Award className="h-4 w-4" /> },
      { name: 'Vídeo', type: 'video', icon: <Video className="h-4 w-4" /> },
      { name: 'FAQ', type: 'faq', icon: <HelpCircle className="h-4 w-4" /> },
      { name: 'Carrossel', type: 'carousel', icon: <ImagePlus className="h-4 w-4" /> },
    ]
  },
  {
    title: 'Conversão',
    components: [
      { name: 'Preço', type: 'pricing', icon: <CreditCard className="h-4 w-4" /> },
      { name: 'Botão CTA', type: 'cta', icon: <Share2 className="h-4 w-4" /> },
    ]
  },
  {
    title: 'Resultado do Quiz',
    components: [
      { name: 'Estilo Principal', type: 'style-result', icon: <Palette className="h-4 w-4" /> },
      { name: 'Estilos Secundários', type: 'secondary-styles', icon: <SlidersHorizontal className="h-4 w-4" /> },
    ]
  },
  {
    title: 'Avançado',
    components: [
      { name: 'Código Personalizado', type: 'custom-code', icon: <Code className="h-4 w-4" /> },
      { name: 'Animação', type: 'animation-block', icon: <Wand2 className="h-4 w-4" /> },
    ]
  }
];

type ComponentsSidebarProps = {
  onComponentSelect: (type: string) => void;
};

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onComponentSelect }) => {
  return (
    <div className="h-full border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
        <p className="text-sm text-[#8F7A6A]">Arraste ou clique para adicionar</p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="p-4 space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-medium text-[#432818]">{group.title}</h3>
              <div className="space-y-2">
                {group.components.map((component) => (
                  <Card
                    key={component.type}
                    className="p-3 cursor-pointer hover:bg-[#FAF9F7] transition-colors flex items-center gap-2"
                    onClick={() => onComponentSelect(component.type)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', component.type);
                    }}
                  >
                    <div className="bg-[#FAF9F7] rounded-md p-1.5">
                      {component.icon}
                    </div>
                    <span className="text-sm text-[#432818]">{component.name}</span>
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
