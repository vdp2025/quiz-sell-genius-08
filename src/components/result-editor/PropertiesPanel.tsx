
import React, { useState } from 'react';
import { X, Trash2, PaintBucket, Type, Image as ImageIcon, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditableContent, Block } from '@/types/editor';
import { StyleControls } from '../editor/controls/StyleControls';
import TextBlockEditor from './block-editors/TextBlockEditor';
import ImageBlockEditor from './block-editors/ImageBlockEditor';
import HeadlineBlockEditor from './block-editors/HeadlineBlockEditor';
import StyleResultBlockEditor from './block-editors/StyleResultBlockEditor';
import StyleHeroBlockEditor from './block-editors/StyleHeroBlockEditor';
import BenefitsBlockEditor from './block-editors/BenefitsBlockEditor';
import OfferBlockEditor from './block-editors/OfferBlockEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (id: string, content: Partial<EditableContent>) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [activeTab, setActiveTab] = useState<string>("content");
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  if (!selectedBlockId || !selectedBlock) {
    return (
      <div className="h-full p-4 bg-white flex flex-col">
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <h2 className="text-lg font-medium text-[#432818]">Propriedades</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#8F7A6A] text-center">
            Selecione um bloco para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleUpdateContent = (content: Partial<EditableContent>) => {
    onUpdate(selectedBlockId, content);
  };

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4 mr-2" />;
      case 'image': return <ImageIcon className="w-4 h-4 mr-2" />;
      case 'header':
      case 'headline': return <Type className="w-4 h-4 mr-2" />;
      default: return <Layout className="w-4 h-4 mr-2" />;
    }
  };

  const renderBlockEditor = () => {
    switch (selectedBlock.type) {
      case 'text':
        return <TextBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'image':
        return <ImageBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'headline':
        return <HeadlineBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'style-result':
        return <StyleResultBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'style-hero':
        return <StyleHeroBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'benefits':
        return <BenefitsBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      case 'offer':
        return <OfferBlockEditor block={selectedBlock} onUpdate={handleUpdateContent} />;
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Editor específico para o tipo de bloco "{selectedBlock.type}" não disponível ainda.
            Em breve teremos mais opções de edição!
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          {getBlockIcon(selectedBlock.type)}
          <h2 className="text-lg font-medium text-[#432818]">
            {getBlockTitle(selectedBlock.type)}
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 grid grid-cols-2">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Aparência</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="content" className="space-y-4 mt-0">
            {renderBlockEditor()}
          </TabsContent>

          <TabsContent value="style" className="mt-0">
            <StyleControls
              style={selectedBlock.content.style || {}}
              onUpdate={(newStyle) => {
                handleUpdateContent({
                  style: newStyle
                });
              }}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="border-t p-4">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={() => onDelete(selectedBlockId)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Bloco
        </Button>
      </div>
    </div>
  );
};

// Helper function to get a user-friendly title for each block type
function getBlockTitle(type: Block['type']): string {
  const titles: Record<string, string> = {
    'header': 'Cabeçalho',
    'headline': 'Título',
    'text': 'Texto',
    'image': 'Imagem',
    'style-result': 'Resultado de Estilo',
    'secondary-styles': 'Estilos Secundários',
    'benefits': 'Benefícios',
    'pricing': 'Preço',
    'testimonials': 'Depoimentos',
    'hero-section': 'Seção Hero',
    'products': 'Produtos',
    'cta': 'Botão CTA',
    'guarantee': 'Garantia',
    'spacer': 'Espaçador',
    'icon': 'Ícone',
    'two-column': 'Duas Colunas',
    'video': 'Vídeo',
    'carousel': 'Carrossel',
    'custom-code': 'Código Personalizado',
    'animation-block': 'Animação',
    'faq': 'Perguntas Frequentes',
    'style-hero': 'Hero de Estilo',
    'offer': 'Oferta de Produto'
  };
  
  return titles[type] || 'Bloco';
}

export default PropertiesPanel;
