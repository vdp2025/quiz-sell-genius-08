
import React from 'react';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { 
  LayoutTemplate, 
  Type, 
  ImageIcon, 
  Sparkles, 
  ListChecks, 
  ShoppingCart, 
  Award, 
  Star, 
  Heading, 
  ScrollText, 
  Video, 
  Grid2X2, 
  DollarSign
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ComponentSidebarProps {
  onComponentSelect: (type: Block['type']) => void;
}

type ComponentCategory = {
  name: string;
  items: {
    type: Block['type'];
    name: string;
    icon: React.ReactNode;
    description?: string;
  }[];
};

export function ComponentsSidebar({ onComponentSelect }: ComponentSidebarProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const categories: ComponentCategory[] = [
    {
      name: 'Estilo',
      items: [
        {
          type: 'style-hero',
          name: 'Hero de Estilo',
          icon: <Sparkles className="w-4 h-4" />,
          description: 'Seção principal destacando o estilo'
        },
        {
          type: 'style-result',
          name: 'Resultado de Estilo',
          icon: <Sparkles className="w-4 h-4" />,
          description: 'Mostra o estilo predominante'
        },
        {
          type: 'secondary-styles',
          name: 'Estilos Secundários',
          icon: <Star className="w-4 h-4" />,
          description: 'Mostrar estilos complementares'
        },
        {
          type: 'offer',
          name: 'Oferta de Produto',
          icon: <ShoppingCart className="w-4 h-4" />,
          description: 'Bloco de oferta para venda'
        }
      ]
    },
    {
      name: 'Básicos',
      items: [
        {
          type: 'header',
          name: 'Cabeçalho',
          icon: <LayoutTemplate className="w-4 h-4" />,
          description: 'Cabeçalho com logo e menu'
        },
        {
          type: 'headline',
          name: 'Título',
          icon: <Heading className="w-4 h-4" />,
          description: 'Título e subtítulo'
        },
        {
          type: 'text',
          name: 'Texto',
          icon: <Type className="w-4 h-4" />,
          description: 'Bloco de texto simples'
        },
        {
          type: 'image',
          name: 'Imagem',
          icon: <ImageIcon className="w-4 h-4" />,
          description: 'Imagem com legenda opcional'
        }
      ]
    },
    {
      name: 'Venda',
      items: [
        {
          type: 'benefits',
          name: 'Benefícios',
          icon: <ListChecks className="w-4 h-4" />,
          description: 'Lista de benefícios'
        },
        {
          type: 'pricing',
          name: 'Preço',
          icon: <DollarSign className="w-4 h-4" />,
          description: 'Bloco de preço e compra'
        },
        {
          type: 'testimonials',
          name: 'Depoimentos',
          icon: <Star className="w-4 h-4" />,
          description: 'Depoimentos de clientes'
        },
        {
          type: 'guarantee',
          name: 'Garantia',
          icon: <Award className="w-4 h-4" />,
          description: 'Bloco de garantia'
        },
        {
          type: 'cta',
          name: 'Botão CTA',
          icon: <ShoppingCart className="w-4 h-4" />,
          description: 'Botão de chamada para ação'
        }
      ]
    },
    {
      name: 'Avançado',
      items: [
        {
          type: 'video',
          name: 'Vídeo',
          icon: <Video className="w-4 h-4" />,
          description: 'Incorporar vídeo'
        },
        {
          type: 'two-column',
          name: 'Duas Colunas',
          icon: <Grid2X2 className="w-4 h-4" />,
          description: 'Layout de duas colunas'
        },
        {
          type: 'faq',
          name: 'Perguntas Frequentes',
          icon: <ScrollText className="w-4 h-4" />,
          description: 'Seção de perguntas e respostas'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="h-full bg-white border-r border-[#B89B7A]/20 flex flex-col">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="text-lg font-medium text-[#432818] mb-3">Componentes</h2>
        <Input
          type="text"
          placeholder="Buscar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-6">
            <h3 className="text-sm font-medium text-[#8F7A6A] mb-2 px-2">{category.name}</h3>
            <div className="space-y-1">
              {category.items.map((item) => (
                <Button
                  key={item.type}
                  variant="ghost"
                  className="w-full justify-start py-2 px-2 h-auto text-[#432818] hover:bg-[#FAF9F7]"
                  onClick={() => onComponentSelect(item.type)}
                >
                  <div className="flex items-start">
                    <div className="p-1 bg-[#FAF9F7] rounded mr-3 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-[#8F7A6A] mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentsSidebar;
