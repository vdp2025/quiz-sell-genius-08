
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentType, QuizStage } from '@/types/quizBuilder';
import { 
  Type, 
  Image as ImageIcon, 
  FileText, 
  ListChecks,
  CheckSquare,
  FileQuestion,
  LayoutGrid,
  Layout,
  Award,
  Gift,
  Clock,
  Heart
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: QuizComponentType) => void;
  activeStage?: QuizStage | null;
}

interface ComponentTemplate {
  type: QuizComponentType;
  icon: React.ReactNode;
  label: string;
  description: string;
  preset?: string;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({
  onComponentSelect,
  activeStage
}) => {
  if (!activeStage) {
    return (
      <div className="p-4 text-center">
        <p className="text-[#8F7A6A]">Selecione uma etapa para adicionar componentes</p>
      </div>
    );
  }

  // Define component templates based on stage type
  const getComponentTemplates = (): { category: string; items: ComponentTemplate[] }[] => {
    const basicComponents = {
      category: "Básicos",
      items: [
        { 
          type: 'text', 
          icon: <FileText className="h-4 w-4 mr-2" />, 
          label: 'Texto', 
          description: 'Bloco de texto simples' 
        },
        { 
          type: 'headline', 
          icon: <Type className="h-4 w-4 mr-2" />, 
          label: 'Título', 
          description: 'Título com formatação especial' 
        },
        { 
          type: 'image', 
          icon: <ImageIcon className="h-4 w-4 mr-2" />, 
          label: 'Imagem', 
          description: 'Imagem com legenda opcional' 
        }
      ]
    };

    switch (activeStage.type) {
      case 'cover':
        return [
          basicComponents,
          {
            category: "Componentes de Capa",
            items: [
              { 
                type: 'stageCover', 
                icon: <Layout className="h-4 w-4 mr-2" />, 
                label: 'Capa Moderna', 
                description: 'Capa com imagem de fundo',
                preset: 'modern'
              },
              { 
                type: 'stageCover', 
                icon: <Layout className="h-4 w-4 mr-2" />, 
                label: 'Capa Minimalista', 
                description: 'Capa com design limpo',
                preset: 'minimal' 
              },
              { 
                type: 'stageCover', 
                icon: <Layout className="h-4 w-4 mr-2" />, 
                label: 'Capa com Vídeo', 
                description: 'Capa com vídeo de fundo',
                preset: 'video'
              },
            ]
          }
        ];
      case 'question':
        return [
          {
            category: "Perguntas",
            items: [
              { 
                type: 'stageQuestion', 
                icon: <FileQuestion className="h-4 w-4 mr-2" />, 
                label: 'Pergunta com Imagens', 
                description: 'Opções com imagens e texto',
                preset: 'image-grid'
              },
              { 
                type: 'stageQuestion', 
                icon: <FileQuestion className="h-4 w-4 mr-2" />, 
                label: 'Cards Modernos', 
                description: 'Opções em cards elegantes',
                preset: 'modern-cards'
              },
              { 
                type: 'stageQuestion', 
                icon: <CheckSquare className="h-4 w-4 mr-2" />, 
                label: 'Lista de Opções', 
                description: 'Opções em formato de lista',
                preset: 'list-style' 
              },
              { 
                type: 'multipleChoice', 
                icon: <ListChecks className="h-4 w-4 mr-2" />, 
                label: 'Múltipla Escolha', 
                description: 'Seleção de múltiplas opções'
              },
              { 
                type: 'singleChoice', 
                icon: <CheckSquare className="h-4 w-4 mr-2" />, 
                label: 'Escolha Única', 
                description: 'Seleção de uma única opção'
              },
            ]
          },
          basicComponents
        ];
      case 'result':
        return [
          {
            category: "Resultados",
            items: [
              { 
                type: 'stageResult', 
                icon: <Award className="h-4 w-4 mr-2" />, 
                label: 'Resultado Principal', 
                description: 'Exibe o estilo predominante',
                preset: 'modern'
              },
              { 
                type: 'stageResult', 
                icon: <Layout className="h-4 w-4 mr-2" />, 
                label: 'Resultado com Gráfico', 
                description: 'Visualização gráfica dos resultados',
                preset: 'chart'
              },
              { 
                type: 'benefitsList', 
                icon: <ListChecks className="h-4 w-4 mr-2" />, 
                label: 'Lista de Benefícios', 
                description: 'Lista de vantagens com ícones',
                preset: 'checkmarks'
              },
            ]
          },
          {
            category: "Conversão",
            items: [
              { 
                type: 'callToAction', 
                icon: <Gift className="h-4 w-4 mr-2" />, 
                label: 'Botão de Ação', 
                description: 'CTA destacado para conversão',
                preset: 'highlight'
              },
              { 
                type: 'testimonial', 
                icon: <Heart className="h-4 w-4 mr-2" />, 
                label: 'Depoimento', 
                description: 'Card de depoimento com foto',
                preset: 'card'
              },
              { 
                type: 'countdownTimer', 
                icon: <Clock className="h-4 w-4 mr-2" />, 
                label: 'Contagem Regressiva', 
                description: 'Timer para criar urgência',
                preset: 'simple'
              },
            ]
          },
          basicComponents
        ];
      default:
        return [basicComponents];
    }
  };

  const componentGroups = getComponentTemplates();

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
