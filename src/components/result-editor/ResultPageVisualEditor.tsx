import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { EditorPreview } from './EditorPreview';
import { PropertiesPanel } from './PropertiesPanel';
import EditorToolbar from './EditorToolbar';
import { StyleResult } from '@/types/quiz';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { toast } from '@/components/ui/use-toast';
import { Block } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GlobalStylesEditor } from './GlobalStylesEditor';

export const ResultPageVisualEditor: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 5,
    percentage: 19
  });
  
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  
  const { 
    resultPageConfig, 
    updateSection, 
    saveConfig,
    resetConfig,
    loading 
  } = useResultPageConfig(selectedStyle.category);
  
  // Load blocks from config when it's available
  useEffect(() => {
    if (resultPageConfig && !loading) {
      // Convert stored config to editor blocks format
      const convertedBlocks: Block[] = [];
      
      // Add header block if visible
      if (resultPageConfig.header.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'header',
          content: {
            ...resultPageConfig.header.content,
            style: resultPageConfig.header.style
          },
          order: 0
        });
      }
      
      // Add style-result block
      convertedBlocks.push({
        id: generateId(),
        type: 'style-result',
        content: {
          ...resultPageConfig.mainContent.content,
          style: resultPageConfig.mainContent.style
        },
        order: 1
      });
      
      // Add secondary-styles block if visible
      if (resultPageConfig.secondaryStyles.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'secondary-styles',
          content: {
            ...resultPageConfig.secondaryStyles.content,
            style: resultPageConfig.secondaryStyles.style
          },
          order: 2
        });
      }
      
      // Add offer blocks
      if (resultPageConfig.offer.hero.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'hero-section',
          content: {
            ...resultPageConfig.offer.hero.content,
            style: resultPageConfig.offer.hero.style
          },
          order: 3
        });
      }
      
      if (resultPageConfig.offer.products.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'products',
          content: {
            ...resultPageConfig.offer.products.content,
            style: resultPageConfig.offer.products.style
          },
          order: 4
        });
      }
      
      if (resultPageConfig.offer.benefits.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'benefits',
          content: {
            ...resultPageConfig.offer.benefits.content,
            style: resultPageConfig.offer.benefits.style
          },
          order: 5
        });
      }
      
      if (resultPageConfig.offer.pricing.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'pricing',
          content: {
            ...resultPageConfig.offer.pricing.content,
            style: resultPageConfig.offer.pricing.style
          },
          order: 6
        });
      }
      
      if (resultPageConfig.offer.testimonials.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'testimonials',
          content: {
            ...resultPageConfig.offer.testimonials.content,
            style: resultPageConfig.offer.testimonials.style
          },
          order: 7
        });
      }
      
      if (resultPageConfig.offer.guarantee.visible) {
        convertedBlocks.push({
          id: generateId(),
          type: 'guarantee',
          content: {
            ...resultPageConfig.offer.guarantee.content,
            style: resultPageConfig.offer.guarantee.style
          },
          order: 8
        });
      }
      
      setBlocks(convertedBlocks);
    }
  }, [resultPageConfig, loading]);
  
  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    return newBlock.id;
  };
  
  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index })));
    setSelectedBlockId(null);
  };
  
  const handleReorderBlocks = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;
    
    const result = Array.from(blocks);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    // Update order property
    const reorderedBlocks = result.map((block, index) => ({
      ...block,
      order: index
    }));
    
    setBlocks(reorderedBlocks);
  };
  
  const handleSave = async () => {
    // Convert blocks back to config format
    const newConfig = { ...resultPageConfig };
    
    // Reset visibility of all sections first
    newConfig.header.visible = false;
    newConfig.mainContent.visible = false;
    newConfig.secondaryStyles.visible = false;
    newConfig.offer.hero.visible = false;
    newConfig.offer.products.visible = false;
    newConfig.offer.benefits.visible = false;
    newConfig.offer.pricing.visible = false;
    newConfig.offer.testimonials.visible = false;
    newConfig.offer.guarantee.visible = false;
    
    // Update based on blocks
    blocks.forEach(block => {
      // Extract style from content if it exists
      const { style, ...contentWithoutStyle } = block.content;
      
      switch (block.type) {
        case 'header':
          newConfig.header.visible = true;
          newConfig.header.content = contentWithoutStyle;
          newConfig.header.style = style || newConfig.header.style;
          break;
        case 'style-result':
          newConfig.mainContent.visible = true;
          newConfig.mainContent.content = contentWithoutStyle;
          newConfig.mainContent.style = style || newConfig.mainContent.style;
          break;
        case 'secondary-styles':
          newConfig.secondaryStyles.visible = true;
          newConfig.secondaryStyles.content = contentWithoutStyle;
          newConfig.secondaryStyles.style = style || newConfig.secondaryStyles.style;
          break;
        case 'hero-section':
          newConfig.offer.hero.visible = true;
          newConfig.offer.hero.content = contentWithoutStyle;
          newConfig.offer.hero.style = style || newConfig.offer.hero.style;
          break;
        case 'products':
          newConfig.offer.products.visible = true;
          newConfig.offer.products.content = contentWithoutStyle;
          newConfig.offer.products.style = style || newConfig.offer.products.style;
          break;
        case 'benefits':
          newConfig.offer.benefits.visible = true;
          newConfig.offer.benefits.content = contentWithoutStyle;
          newConfig.offer.benefits.style = style || newConfig.offer.benefits.style;
          break;
        case 'pricing':
          newConfig.offer.pricing.visible = true;
          newConfig.offer.pricing.content = contentWithoutStyle;
          newConfig.offer.pricing.style = style || newConfig.offer.pricing.style;
          break;
        case 'testimonials':
          newConfig.offer.testimonials.visible = true;
          newConfig.offer.testimonials.content = contentWithoutStyle;
          newConfig.offer.testimonials.style = style || newConfig.offer.testimonials.style;
          break;
        case 'guarantee':
          newConfig.offer.guarantee.visible = true;
          newConfig.offer.guarantee.content = contentWithoutStyle;
          newConfig.offer.guarantee.style = style || newConfig.offer.guarantee.style;
          break;
      }
    });
    
    // Save updated config
    const success = await saveConfig();
    if (success) {
      toast({
        title: 'Alterações salvas',
        description: 'As configurações da página de resultados foram salvas com sucesso.'
      });
    } else {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as configurações.',
        variant: 'destructive'
      });
    }
  };
  
  const handleReset = () => {
    const confirmReset = window.confirm('Tem certeza que deseja resetar todas as configurações? Esta ação não pode ser desfeita.');
    if (confirmReset) {
      resetConfig(selectedStyle.category);
      toast({
        title: 'Configurações resetadas',
        description: 'As configurações da página foram restauradas para o padrão.'
      });
    }
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col overflow-hidden">
        <EditorToolbar 
          onSave={handleSave}
          isPreviewMode={isPreviewing}
          onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
          onReset={handleReset}
          onEditGlobalStyles={() => setIsGlobalStylesOpen(true)}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - Components */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentsSidebar 
              onComponentSelect={handleAddBlock}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center Panel - Preview */}
          <ResizablePanel defaultSize={55}>
            <EditorPreview
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              isPreviewing={isPreviewing}
              primaryStyle={selectedStyle}
              onReorderBlocks={handleReorderBlocks}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Properties */}
          <ResizablePanel defaultSize={25}>
            <PropertiesPanel
              selectedBlockId={selectedBlockId}
              blocks={blocks}
              onClose={() => setSelectedBlockId(null)}
              onUpdate={handleUpdateBlock}
              onDelete={handleDeleteBlock}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {isGlobalStylesOpen && (
          <GlobalStylesEditor
            globalStyles={resultPageConfig.globalStyles || {}}
            onSave={(styles) => {
              updateSection('globalStyles', styles);
              setIsGlobalStylesOpen(false);
              toast({
                title: 'Estilos globais atualizados',
                description: 'Os estilos globais foram atualizados com sucesso.'
              });
            }}
            onCancel={() => setIsGlobalStylesOpen(false)}
          />
        )}
      </div>
    </DndProvider>
  );
};

// Function to get default content for a block type
const getDefaultContentForType = (type: Block['type']) => {
  switch (type) {
    case 'header':
      return { 
        title: 'Olá, seu Estilo Predominante é:',
        subtitle: '',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Gisele Galvão'
      };
    case 'headline':
      return { 
        title: 'VOCÊ DESCOBRIU SEU ESTILO', 
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp'
      };
    case 'hero-section':
      return { 
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp'
      };
    case 'products':
      return {
        title: 'O que você vai receber:',
        images: [
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
            alt: 'Guia de Estilo - 3 Revistas'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
            alt: 'Todos os produtos e bônus'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
            alt: 'Celular Peças-Chave'
          }
        ]
      };
    case 'testimonials':
      return { 
        title: 'O que estão dizendo',
        testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
      };
    case 'guarantee':
      return { 
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      };
    case 'pricing':
      return { 
        regularPrice: '175,00', 
        salePrice: '39,00', 
        buttonText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        urgencyText: 'Oferta por tempo limitado!'
      };
    case 'cta':
      return { 
        buttonText: 'Clique Aqui', 
        url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        title: 'Transforme seu estilo agora'
      };
    case 'style-result':
      return { title: 'Seu estilo predominante é {{primaryStyle}}' };
    case 'secondary-styles':
      return { title: 'Seus Estilos Complementares' };
    default:
      return {};
  }
};
