
import React from 'react';
import { X, Trash2, PaintBucket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditableContent, Block } from '@/types/editor';
import { StyleControls } from '../editor/controls/StyleControls';

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

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-[#432818]">
          {getBlockTitle(selectedBlock.type)}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 grid grid-cols-2">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Aparência</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 p-4">
          <TabsContent value="content" className="space-y-4 mt-0">
            {renderContentInputs(selectedBlock, handleUpdateContent)}
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

// Function to render different inputs based on block type
function renderContentInputs(block: Block, onUpdate: (content: Partial<EditableContent>) => void) {
  const { type, content } = block;
  
  // Common inputs for most block types
  const commonInputs = (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Digite o título"
        />
      </div>
      
      {(type === 'headline' || type === 'header' || type === 'style-hero') && (
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Digite o subtítulo"
          />
        </div>
      )}
      
      {(type === 'text' || type === 'style-result' || type === 'style-hero') && (
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={content.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Digite a descrição"
            className="min-h-[100px]"
          />
        </div>
      )}
    </>
  );
  
  // Block-specific inputs
  switch (type) {
    case 'image':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={content.imageUrl || ''}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Texto Alternativo</Label>
            <Input
              id="imageAlt"
              value={content.imageAlt || ''}
              onChange={(e) => onUpdate({ imageAlt: e.target.value })}
              placeholder="Descrição da imagem"
            />
          </div>
        </>
      );
    
    case 'style-hero':
      return (
        <>
          {commonInputs}
          <div className="space-y-2">
            <Label htmlFor="mainImage">Imagem Principal</Label>
            <Input
              id="mainImage"
              value={content.mainImage || ''}
              onChange={(e) => onUpdate({ mainImage: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="styleType">Tipo de Estilo</Label>
            <Input
              id="styleType"
              value={content.styleType || ''}
              onChange={(e) => onUpdate({ styleType: e.target.value })}
              placeholder="Natural, Clássico, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaText">Texto do Botão</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ''}
              onChange={(e) => onUpdate({ ctaText: e.target.value })}
              placeholder="Ex: Saiba Mais"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">URL do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
              placeholder="https://exemplo.com/pagina"
            />
          </div>
        </>
      );
    
    case 'offer':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Título da Oferta"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={content.subtitle || ''}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
              placeholder="Subtítulo da Oferta"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Descrição da Oferta"
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productImage">Imagem do Produto</Label>
            <Input
              id="productImage"
              value={content.productImage || ''}
              onChange={(e) => onUpdate({ productImage: e.target.value })}
              placeholder="https://exemplo.com/produto.jpg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                value={content.price || ''}
                onChange={(e) => onUpdate({ price: e.target.value })}
                placeholder="R$ 39,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regularPrice">Preço Normal</Label>
              <Input
                id="regularPrice"
                value={content.regularPrice || ''}
                onChange={(e) => onUpdate({ regularPrice: e.target.value })}
                placeholder="R$ 99,90"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaText">Texto do Botão</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ''}
              onChange={(e) => onUpdate({ ctaText: e.target.value })}
              placeholder="COMPRAR AGORA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">URL do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
              placeholder="https://exemplo.com/checkout"
            />
          </div>
        </>
      );
    
    case 'style-result':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Título do Resultado"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Descrição do estilo"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={content.imageUrl || ''}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              placeholder="https://exemplo.com/estilo.jpg"
            />
          </div>
        </>
      );
    
    case 'secondary-styles':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Estilos Complementares"
            />
          </div>
          <p className="text-sm text-[#8F7A6A] mt-2">
            Os estilos secundários são carregados automaticamente com base no resultado do quiz.
          </p>
        </>
      );
    
    default:
      return commonInputs;
  }
}

export default PropertiesPanel;
