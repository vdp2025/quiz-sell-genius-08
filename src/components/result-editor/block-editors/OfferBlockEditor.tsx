
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ImageUploader } from '@/components/editor/ImageUploader';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface OfferBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const OfferBlockEditor: React.FC<OfferBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  const handleAddBonus = () => {
    const currentBonuses = content.bonuses || [];
    onUpdate({ bonuses: [...currentBonuses, ''] });
  };

  const handleUpdateBonus = (index: number, value: string) => {
    const newBonuses = [...(content.bonuses || [])];
    newBonuses[index] = value;
    onUpdate({ bonuses: newBonuses });
  };

  const handleRemoveBonus = (index: number) => {
    const newBonuses = [...(content.bonuses || [])];
    newBonuses.splice(index, 1);
    onUpdate({ bonuses: newBonuses });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título da oferta</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Ex: Transforme Seu Estilo com o Guia Completo"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo da oferta</Label>
        <Input
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Ex: Simples. Prático. Estratégico."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            value={content.price || ''}
            onChange={(e) => onUpdate({ price: e.target.value })}
            placeholder="Ex: 39,00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="regularPrice">Preço normal</Label>
          <Input
            id="regularPrice"
            value={content.regularPrice || ''}
            onChange={(e) => onUpdate({ regularPrice: e.target.value })}
            placeholder="Ex: 175,00"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Imagem do produto</Label>
        <ImageUploader
          currentImageUrl={content.productImage || ''}
          onImageChange={(url) => onUpdate({ productImage: url })}
          imageAlt="Imagem do produto"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bonusTitle">Título da seção de bônus</Label>
        <Input
          id="bonusTitle"
          value={content.bonusTitle || ''}
          onChange={(e) => onUpdate({ bonusTitle: e.target.value })}
          placeholder="Ex: E ainda recebe 2 bônus poderosos:"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Bônus inclusos</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddBonus}
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>
        
        {(content.bonuses || []).map((bonus: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={bonus}
              onChange={(e) => handleUpdateBonus(index, e.target.value)}
              placeholder="Descrição do bônus"
            />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={() => handleRemoveBonus(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 pt-4 border-t">
        <Label htmlFor="ctaText">Texto do botão CTA</Label>
        <Input
          id="ctaText"
          value={content.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Ex: Quero meu Guia + Bônus por R$39,00"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaUrl">URL do botão CTA</Label>
        <Input
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="https://exemplo.com/checkout"
        />
      </div>
    </div>
  );
};

export default OfferBlockEditor;
