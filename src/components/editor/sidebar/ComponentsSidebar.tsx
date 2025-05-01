
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlockType } from '@/types/editor';
import { 
  Type, 
  Image as ImageIcon, 
  FileText, 
  ListChecks,
  CheckSquare,
  Award,
  Clock,
  Layout,
  ShoppingCart,
  Tag,
  Heart,
  Shield,
  Columns
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: BlockType) => void;
}

interface ComponentTemplate {
  type: BlockType;
  icon: React.ReactNode;
  label: string;
  description: string;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onComponentSelect
}) => {
  const componentGroups = [
    {
      category: "Básicos",
      items: [
        { 
          type: 'headline' as BlockType, 
          icon: <Type className="h-4 w-4 mr-2" />, 
          label: 'Título', 
          description: 'Título com subtítulo' 
        },
        { 
          type: 'text' as BlockType, 
          icon: <FileText className="h-4 w-4 mr-2" />, 
          label: 'Texto', 
          description: 'Parágrafo simples' 
        },
        { 
          type: 'image' as BlockType, 
          icon: <ImageIcon className="h-4 w-4 mr-2" />, 
          label: 'Imagem', 
          description: 'Imagem com legenda opcional' 
        }
      ]
    },
    {
      category: "Resultado",
      items: [
        { 
          type: 'style-result' as BlockType, 
          icon: <Award className="h-4 w-4 mr-2" />, 
          label: 'Estilo Principal', 
          description: 'Exibe o estilo predominante' 
        },
        { 
          type: 'secondary-styles' as BlockType, 
          icon: <Layout className="h-4 w-4 mr-2" />, 
          label: 'Estilos Secundários', 
          description: 'Exibe estilos complementares' 
        }
      ]
    },
    {
      category: "Conversão",
      items: [
        { 
          type: 'pricing' as BlockType, 
          icon: <Tag className="h-4 w-4 mr-2" />, 
          label: 'Preço', 
          description: 'Exibe informações de preço' 
        },
        { 
          type: 'benefits' as BlockType, 
          icon: <ListChecks className="h-4 w-4 mr-2" />, 
          label: 'Benefícios', 
          description: 'Lista de benefícios com ícones' 
        },
        { 
          type: 'testimonials' as BlockType, 
          icon: <Heart className="h-4 w-4 mr-2" />, 
          label: 'Depoimentos', 
          description: 'Seção de depoimentos' 
        },
        { 
          type: 'testimonial-card' as BlockType, 
          icon: <Heart className="h-4 w-4 mr-2" />, 
          label: 'Card de Depoimento', 
          description: 'Depoimento individual destacado' 
        },
        { 
          type: 'cta' as BlockType, 
          icon: <ShoppingCart className="h-4 w-4 mr-2" />, 
          label: 'Botão de Ação', 
          description: 'Botão de compra destacado' 
        },
        { 
          type: 'guarantee' as BlockType, 
          icon: <Shield className="h-4 w-4 mr-2" />, 
          label: 'Garantia', 
          description: 'Seção de garantia' 
        },
        { 
          type: 'countdown-timer' as BlockType, 
          icon: <Clock className="h-4 w-4 mr-2" />, 
          label: 'Contador Regressivo', 
          description: 'Timer para criar urgência' 
        },
        { 
          type: 'feature-comparison' as BlockType, 
          icon: <Columns className="h-4 w-4 mr-2" />, 
          label: 'Comparação de Recursos', 
          description: 'Compare planos ou recursos' 
        }
      ]
    }
  ];

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-5">
        {componentGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h3 className="font-medium text-[#432818] text-sm">{group.category}</h3>
            
            <div className="grid grid-cols-1 gap-2">
              {group.items.map((item, index) => (
                <Button
                  key={`${item.type}-${index}`}
                  variant="outline"
                  className="justify-start text-left h-auto py-2.5 hover:bg-[#FAF9F7] hover:border-[#B89B7A]/60"
                  onClick={() => onComponentSelect(item.type)}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 text-[#B89B7A]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#432818]">{item.label}</span>
                      <span className="text-xs text-[#8F7A6A]">{item.description}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
