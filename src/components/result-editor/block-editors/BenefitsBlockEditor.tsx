
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface BenefitsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const BenefitsBlockEditor: React.FC<BenefitsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  const handleAddItem = () => {
    const currentItems = content.items || [];
    onUpdate({ items: [...currentItems, ''] });
  };

  const handleUpdateItem = (index: number, value: string) => {
    const newItems = [...(content.items || [])];
    newItems[index] = value;
    onUpdate({ items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...(content.items || [])];
    newItems.splice(index, 1);
    onUpdate({ items: newItems });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título dos benefícios</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Ex: O Guia de Estilo e Imagem + Bônus Exclusivos"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Ex: Criado para mulheres que querem muito mais do que 'saber seu estilo'."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Itens dos benefícios</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar item
          </Button>
        </div>
        
        {(content.items || []).map((item: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Textarea
              value={item}
              onChange={(e) => handleUpdateItem(index, e.target.value)}
              placeholder="Descrição do benefício"
              className="min-h-[60px]"
            />
            <Button 
              type="button" 
              size="sm" 
              variant="ghost" 
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {(content.items || []).length === 0 && (
          <p className="text-sm text-[#8F7A6A] italic">
            Nenhum item adicionado. Clique em "Adicionar item" para começar.
          </p>
        )}
      </div>
    </div>
  );
};

export default BenefitsBlockEditor;
