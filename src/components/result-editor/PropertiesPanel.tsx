
import React from 'react';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import HeaderBlockEditor from './block-editors/HeaderBlockEditor';
import GuaranteeBlockEditor from './block-editors/GuaranteeBlockEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  if (!selectedBlockId) {
    return (
      <div className="h-full p-4 flex items-center justify-center">
        <p className="text-[#8F7A6A] text-center">
          Selecione um componente para editar suas propriedades
        </p>
      </div>
    );
  }

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  if (!selectedBlock) {
    return (
      <div className="h-full p-4 flex items-center justify-center">
        <p className="text-[#8F7A6A] text-center">
          Bloco não encontrado
        </p>
      </div>
    );
  }

  // Render the appropriate editor based on block type
  const renderBlockEditor = () => {
    switch (selectedBlock.type) {
      case 'header':
        return <HeaderBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'guarantee':
        return <GuaranteeBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      default:
        // Generic editor for other block types
        return (
          <div className="space-y-4">
            {selectedBlock.content.title !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={selectedBlock.content.title || ''}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Digite o título"
                />
              </div>
            )}

            {selectedBlock.content.subtitle !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={selectedBlock.content.subtitle || ''}
                  onChange={(e) => onUpdate({ subtitle: e.target.value })}
                  placeholder="Digite o subtítulo"
                />
              </div>
            )}

            {selectedBlock.content.text !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="text">Texto</Label>
                <Textarea
                  id="text"
                  value={selectedBlock.content.text || ''}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  placeholder="Digite o texto"
                  rows={4}
                />
              </div>
            )}

            {selectedBlock.content.imageUrl !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={selectedBlock.content.imageUrl || ''}
                  onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            )}

            {selectedBlock.content.ctaText !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="ctaText">Texto do Botão</Label>
                <Input
                  id="ctaText"
                  value={selectedBlock.content.ctaText || ''}
                  onChange={(e) => onUpdate({ ctaText: e.target.value })}
                  placeholder="Clique Aqui"
                />
              </div>
            )}

            {selectedBlock.content.ctaUrl !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="ctaUrl">URL do Botão</Label>
                <Input
                  id="ctaUrl"
                  value={selectedBlock.content.ctaUrl || ''}
                  onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
                  placeholder="#checkout"
                />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-full p-4 space-y-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#432818]">
          Editar {getBlockTitle(selectedBlock.type)}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Card className="p-4">
        {renderBlockEditor()}
      </Card>
    </div>
  );
};

function getBlockTitle(blockType: string): string {
  const blockTitles = {
    header: 'Cabeçalho',
    hero: 'Hero',
    styleResult: 'Estilo Principal',
    secondaryStyles: 'Estilos Secundários',
    benefitsList: 'Lista de Benefícios',
    testimonials: 'Depoimentos',
    pricing: 'Preço',
    guarantee: 'Garantia',
    callToAction: 'Chamada para Ação',
    authorInfo: 'Informações da Autora',
    headline: 'Título',
    text: 'Texto',
    image: 'Imagem',
    benefits: 'Benefícios',
    cta: 'Botão CTA',
    'hero-section': 'Seção Hero',
    'bonus-carousel': 'Carrossel de Bônus',
    products: 'Produtos',
    'style-result': 'Estilo Principal',
    'secondary-styles': 'Estilos Secundários'
  };

  return blockTitles[blockType] || 'Bloco';
}
