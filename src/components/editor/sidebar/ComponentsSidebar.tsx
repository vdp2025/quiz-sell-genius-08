
import React from 'react';
import { 
  Type, 
  Image, 
  Video, 
  MessageCircle, 
  Award, 
  DollarSign, 
  Shield 
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
}

const components = [
  {
    type: 'headline',
    icon: Type,
    label: 'Título Principal',
    description: 'Títulos e subtítulos impactantes'
  },
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
  },
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
  }
];

const ComponentsSidebar = ({ onComponentSelect }: ComponentsSidebarProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-playfair text-[#432818] mb-4">Componentes</h2>
      <div className="space-y-2">
        {components.map((component) => (
          <button
            key={component.type}
            onClick={() => onComponentSelect(component.type)}
            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAF9F7] transition-colors text-left"
          >
            <component.icon className="w-5 h-5 text-[#B89B7A] mt-1" />
            <div>
              <h3 className="text-sm font-medium text-[#432818]">{component.label}</h3>
              <p className="text-xs text-[#8F7A6A]">{component.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComponentsSidebar;
