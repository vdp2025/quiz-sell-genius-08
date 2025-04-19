
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
  DollarSign,
  Columns
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
        },
        {
          type: 'two-column',
          name: 'Duas Colunas',
          icon: <Columns className="w-4 h-4" />,
          description: 'Container com duas colunas'
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
    }
  ];

  // Filter components based on search term
  const filteredCategories = searchTerm 
    ? categories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })).filter(category => category.items.length > 0)
    : categories;

  return (
    <div className="h-full flex flex-col bg-white border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-semibold text-[#432818] mb-4">Componentes</h2>
        <Input
          placeholder="Pesquisar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-[#B89B7A]/30"
        />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium text-[#8F7A6A] mb-2">{category.name}</h3>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Button
                    key={item.type}
                    variant="ghost"
                    className="w-full justify-start text-[#432818] hover:bg-[#FAF9F7]"
                    onClick={() => onComponentSelect(item.type)}
                  >
                    <div className="mr-2">{item.icon}</div>
                    <div className="flex flex-col items-start">
                      <span>{item.name}</span>
                      {item.description && (
                        <span className="text-xs text-[#8F7A6A] font-normal">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
