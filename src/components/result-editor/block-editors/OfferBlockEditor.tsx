
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUploader } from '@/components/editor/ImageUploader';

interface OfferBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const OfferBlockEditor: React.FC<OfferBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  const handleAddBenefit = () => {
    const benefits = [...(content.benefits || []), 'Novo benefício'];
    onUpdate({ benefits });
  };

  const handleUpdateBenefit = (index: number, value: string) => {
    const benefits = [...(content.benefits || [])];
    benefits[index] = value;
    onUpdate({ benefits });
  };

  const handleRemoveBenefit = (index: number) => {
    const benefits = [...(content.benefits || [])];
    benefits.splice(index, 1);
    onUpdate({ benefits });
  };

  const handleAddBonus = () => {
    const bonuses = [...(content.bonuses || []), 'Novo bônus'];
    onUpdate({ bonuses });
  };

  const handleUpdateBonus = (index: number, value: string) => {
    const bonuses = [...(content.bonuses || [])];
    bonuses[index] = value;
    onUpdate({ bonuses });
  };

  const handleRemoveBonus = (index: number) => {
    const bonuses = [...(content.bonuses || [])];
    bonuses.splice(index, 1);
    onUpdate({ bonuses });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Oferta</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título da oferta"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo da Oferta</Label>
        <Textarea
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Descrição da oferta"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="productImage">Imagem do Produto</Label>
        <ImageUploader
          currentImageUrl={content.productImage || ''}
          onImageChange={(url) => onUpdate({ productImage: url })}
          imageAlt="Imagem do produto"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="price">Preço Atual</Label>
          <Input
            id="price"
            value={content.price || ''}
            onChange={(e) => onUpdate({ price: e.target.value })}
            placeholder="39,00"
          />
        </div>
        
        <div className="space-y-2 flex-1">
          <Label htmlFor="regularPrice">Preço Original</Label>
          <Input
            id="regularPrice"
            value={content.regularPrice || ''}
            onChange={(e) => onUpdate({ regularPrice: e.target.value })}
            placeholder="175,00"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaText">Texto do Botão</Label>
        <Input
          id="ctaText"
          value={content.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Comprar Agora"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaUrl">URL do Botão</Label>
        <Input
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="#checkout ou https://pay.hotmart.com/..."
        />
      </div>
      
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Benefícios</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddBenefit}
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </div>
        
        {(content.benefits || []).map((benefit: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={benefit}
              onChange={(e) => handleUpdateBenefit(index, e.target.value)}
              placeholder="Descreva o benefício"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveBenefit(index)}
              className="h-10 w-10 p-0 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Bônus</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddBonus}
          >
            <Plus className="w-4 h-4 mr-2" /> Adicionar
          </Button>
        </div>
        
        {(content.bonuses || []).map((bonus: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Textarea
              value={bonus}
              onChange={(e) => handleUpdateBonus(index, e.target.value)}
              placeholder="Descreva o bônus"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveBonus(index)}
              className="h-10 w-10 p-0 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBlockEditor;
