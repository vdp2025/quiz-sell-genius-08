
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  Image, 
  ListChecks, 
  MessageSquare, 
  DollarSign, 
  Shield, 
  MousePointer,
  Layout,
  Award,
  Gift,
  LayoutTemplate,
  Quote,
  Columns,
  GripVertical,
  Video,
  CheckSquare,
  FileText,
  PanelTop,
  BaggageClaim,
  ImagePlus
} from 'lucide-react';
import { Block } from '@/types/editor';
import { QuizComponentType } from '@/types/quizBuilder';
import { ComponentItem } from './ComponentItem';

interface UnifiedComponentsSidebarProps {
  activeTab: 'quiz' | 'result' | 'sales';
  onComponentSelect: (type: any) => void;
  activeStageType?: string | null;
}

export function UnifiedComponentsSidebar({
  activeTab,
  onComponentSelect,
  activeStageType
}: UnifiedComponentsSidebarProps) {
  // Basic components available for all editor types
  const basicComponents = [
    { type: 'headline', label: 'Título', icon: Type, description: 'Título e subtítulo' },
    { type: 'text', label: 'Texto', icon: FileText, description: 'Bloco de texto simples' },
    { type: 'image', label: 'Imagem', icon: Image, description: 'Imagem com legenda opcional' },
  ];
  
  // Layout components
  const layoutComponents = [
    { type: 'header', label: 'Cabeçalho', icon: PanelTop, description: 'Seção de cabeçalho' },
    { type: 'two-column', label: 'Duas Colunas', icon: Columns, description: 'Layout em duas colunas' },
    { type: 'spacer', label: 'Espaçador', icon: GripVertical, description: 'Espaço vertical entre elementos' },
  ];
  
  // Content components for result and sales pages
  const contentComponents = [
    { type: 'benefits', label: 'Benefícios', icon: ListChecks, description: 'Lista de benefícios' },
    { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare, description: 'Depoimentos de clientes' },
    { type: 'pricing', label: 'Preço', icon: DollarSign, description: 'Seção de preços' },
    { type: 'guarantee', label: 'Garantia', icon: Shield, description: 'Seção de garantia' },
    { type: 'cta', label: 'Botão CTA', icon: MousePointer, description: 'Chamada para ação' },
    { type: 'video', label: 'Vídeo', icon: Video, description: 'Incorporar vídeo' },
  ];
  
  // Quiz result components
  const resultComponents = [
    { type: 'style-result', label: 'Resultado do Estilo', icon: BaggageClaim, description: 'Exibe o resultado principal do quiz' },
    { type: 'secondary-styles', label: 'Estilos Secundários', icon: Award, description: 'Exibe estilos secundários' },
    { type: 'bonus', label: 'Bônus', icon: Gift, description: 'Seção de bônus' },
    { type: 'bonus-carousel', label: 'Carrossel de Bônus', icon: ImagePlus, description: 'Exibe bônus em carrossel' },
  ];

  // Quiz-specific components
  const getQuizComponents = () => {
    if (!activeStageType) return [];
    
    switch (activeStageType) {
      case 'cover':
        return [
          { type: 'header', label: 'Cabeçalho', icon: LayoutTemplate, description: 'Cabeçalho da capa' },
          { type: 'image', label: 'Imagem de Fundo', icon: Image, description: 'Imagem para a capa' },
        ];
      case 'question':
        return [
          { type: 'stageQuestion', label: 'Pergunta', icon: Quote, description: 'Título da pergunta' },
          { type: 'multipleChoice', label: 'Múltipla Escolha', icon: ListChecks, description: 'Questão com múltiplas opções' },
          { type: 'singleChoice', label: 'Escolha Única', icon: CheckSquare, description: 'Questão com uma única opção' },
        ];
      case 'result':
        return [
          { type: 'quizResult', label: 'Resultado', icon: Award, description: 'Exibe resultado do quiz' },
          { type: 'benefitsList', label: 'Lista de Benefícios', icon: ListChecks, description: 'Benefícios relacionados' },
        ];
      default:
        return [];
    }
  };
  
  // Render appropriate tabs based on the active editor
  if (activeTab === 'quiz') {
    return (
      <div className="h-full flex flex-col bg-white border-r border-[#B89B7A]/20">
        <div className="p-4 border-b border-[#B89B7A]/20">
          <h2 className="font-medium text-[#432818]">Componentes do Quiz</h2>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {!activeStageType ? (
            <div className="text-center p-4 text-gray-500">
              Selecione uma etapa para ver os componentes disponíveis
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Componentes da Etapa</h3>
                <div className="grid grid-cols-2 gap-2">
                  {getQuizComponents().map((item) => (
                    <ComponentItem
                      key={item.type}
                      type={item.type}
                      label={item.label}
                      icon={item.icon}
                      description={item.description}
                      onSelect={onComponentSelect}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Básicos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {basicComponents.map((item) => (
                    <ComponentItem
                      key={item.type}
                      type={item.type}
                      label={item.label}
                      icon={item.icon}
                      description={item.description}
                      onSelect={onComponentSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    );
  }

  // Result or Sales editor
  return (
    <div className="h-full bg-white flex flex-col border-r border-[#B89B7A]/20">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-medium text-[#432818]">
          {activeTab === 'result' ? 'Componentes da Página de Resultado' : 'Componentes da Página de Vendas'}
        </h2>
      </div>
      
      <Tabs defaultValue="basic" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            {activeTab === 'result' && <TabsTrigger value="result">Resultado</TabsTrigger>}
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="basic" className="m-0 space-y-2">
            {basicComponents.map((item) => (
              <ComponentItem
                key={item.type}
                type={item.type as Block['type']}
                label={item.label}
                icon={item.icon}
                description={item.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="layout" className="m-0 space-y-2">
            {layoutComponents.map((item) => (
              <ComponentItem
                key={item.type}
                type={item.type as Block['type']}
                label={item.label}
                icon={item.icon}
                description={item.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="content" className="m-0 space-y-2">
            {contentComponents.map((item) => (
              <ComponentItem
                key={item.type}
                type={item.type as Block['type']}
                label={item.label}
                icon={item.icon}
                description={item.description}
                onSelect={onComponentSelect}
              />
            ))}
          </TabsContent>
          
          {activeTab === 'result' && (
            <TabsContent value="result" className="m-0 space-y-2">
              {resultComponents.map((item) => (
                <ComponentItem
                  key={item.type}
                  type={item.type as Block['type']}
                  label={item.label}
                  icon={item.icon}
                  description={item.description}
                  onSelect={onComponentSelect}
                />
              ))}
            </TabsContent>
          )}
        </ScrollArea>
      </Tabs>
    </div>
  );
}
