
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (id: string, content: any) => void;
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
      <div className="h-full p-4 bg-white">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-[#8F7A6A] text-sm">
          <p>Selecione um componente para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 bg-white overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">
          {getBlockTitle(selectedBlock.type)}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {renderPropertiesFields(selectedBlock, (content) => onUpdate(selectedBlock.id, content))}
        
        <div className="pt-4 border-t mt-6">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => onDelete(selectedBlock.id)}
          >
            Excluir Componente
          </Button>
        </div>
      </div>
    </div>
  );
};

function getBlockTitle(type: Block['type']) {
  switch (type) {
    case 'headline': return 'Título';
    case 'text': return 'Texto';
    case 'image': return 'Imagem';
    case 'benefits': return 'Benefícios';
    case 'testimonials': return 'Depoimentos';
    case 'pricing': return 'Preço';
    case 'guarantee': return 'Garantia';
    case 'cta': return 'Botão CTA';
    case 'style-result': return 'Resultado do Estilo';
    case 'secondary-styles': return 'Estilos Secundários';
    default: return 'Componente';
  }
}

function renderPropertiesFields(block: Block, onUpdate: (content: any) => void) {
  switch (block.type) {
    case 'headline':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Digite o título"
              value={block.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              placeholder="Digite o subtítulo"
              value={block.content.subtitle || ''}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
            />
          </div>
        </>
      );
      
    case 'text':
      return (
        <div className="space-y-2">
          <Label htmlFor="text">Texto</Label>
          <Textarea
            id="text"
            placeholder="Digite o texto"
            className="min-h-[100px]"
            value={block.content.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </div>
      );
      
    case 'image':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              placeholder="https://exemplo.com/imagem.jpg"
              value={block.content.imageUrl || ''}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Texto Alternativo</Label>
            <Input
              id="imageAlt"
              placeholder="Descrição da imagem"
              value={block.content.imageAlt || ''}
              onChange={(e) => onUpdate({ imageAlt: e.target.value })}
            />
          </div>
        </>
      );
      
    case 'pricing':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="regularPrice">Preço Regular</Label>
            <Input
              id="regularPrice"
              placeholder="197,00"
              value={block.content.regularPrice || ''}
              onChange={(e) => onUpdate({ regularPrice: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salePrice">Preço Promocional</Label>
            <Input
              id="salePrice"
              placeholder="97,00"
              value={block.content.salePrice || ''}
              onChange={(e) => onUpdate({ salePrice: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buttonText">Texto do Botão</Label>
            <Input
              id="buttonText"
              placeholder="Comprar Agora"
              value={block.content.buttonText || ''}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
            />
          </div>
        </>
      );
      
    case 'benefits':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Benefícios"
              value={block.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="items">Itens (um por linha)</Label>
            <Textarea
              id="items"
              placeholder="Benefício 1&#10;Benefício 2&#10;Benefício 3"
              className="min-h-[150px]"
              value={(block.content.items || []).join('\n')}
              onChange={(e) => onUpdate({ items: e.target.value.split('\n').filter(item => item.trim() !== '') })}
            />
          </div>
        </>
      );
      
    default:
      return (
        <p className="text-sm text-[#8F7A6A]">
          As propriedades deste componente não podem ser editadas.
        </p>
      );
  }
}
