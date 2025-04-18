import React from 'react';
import { 
  Type, 
  Image, 
  Video, 
  MessageCircle, 
  Award, 
  DollarSign, 
  Shield,
  Heading1,
  Heading2,
  Text,
  ListOrdered,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
}

const componentCategories = [
  {
    title: 'Texto',
    components: [
      {
        type: 'headline',
        icon: Heading1,
        label: 'Título Principal',
        description: 'Títulos impactantes para captar atenção'
      },
      {
        type: 'subheading',
        icon: Heading2,
        label: 'Subtítulo',
        description: 'Subtítulos complementares'
      },
      {
        type: 'paragraph',
        icon: Text,
        label: 'Texto',
        description: 'Blocos de texto e parágrafos'
      },
      {
        type: 'list',
        icon: ListOrdered,
        label: 'Lista',
        description: 'Listas ordenadas ou com marcadores'
      }
    ]
  },
  {
    title: 'Mídia',
    components: [
      {
        type: 'image',
        icon: Image,
        label: 'Imagem',
        description: 'Adicionar imagem ou galeria'
      },
      {
        type: 'video',
        icon: Video,
        label: 'Vídeo',
        description: 'Incorporar vídeo do YouTube/Vimeo'
      }
    ]
  },
  {
    title: 'Conversão',
    components: [
      {
        type: 'testimonials',
        icon: MessageCircle,
        label: 'Depoimentos',
        description: 'Seção de depoimentos de clientes'
      },
      {
        type: 'benefits',
        icon: Award,
        label: 'Benefícios',
        description: 'Lista de benefícios do produto'
      },
      {
        type: 'pricing',
        icon: DollarSign,
        label: 'Preço',
        description: 'Seção de preço e botão de compra'
      },
      {
        type: 'guarantee',
        icon: Shield,
        label: 'Garantia',
        description: 'Seção de garantia do produto'
      },
      {
        type: 'cta',
        icon: Button,
        label: 'Botão CTA',
        description: 'Botão de chamada para ação'
      }
    ]
  }
];

const ComponentsSidebar = ({ onComponentSelect }: ComponentsSidebarProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-playfair text-[#432818] mb-4">Componentes</h2>
      <div className="space-y-6">
        {componentCategories.map((category) => (
          <div key={category.title} className="space-y-2">
            <h3 className="text-sm font-medium text-[#8F7A6A] mb-2">
              {category.title}
            </h3>
            {category.components.map((component) => (
              <Button
                key={component.type}
                variant="ghost"
                className="w-full flex items-start gap-3 p-3 h-auto rounded-lg hover:bg-[#FAF9F7] transition-colors text-left"
                onClick={() => onComponentSelect(component.type)}
              >
                <component.icon className="w-5 h-5 text-[#B89B7A] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[#432818] text-left">
                    {component.label}
                  </h4>
                  <p className="text-xs text-[#8F7A6A] text-left">
                    {component.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsSidebar;
