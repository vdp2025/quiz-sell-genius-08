
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { Block } from '@/types/editor';

interface BenefitsListBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const BenefitsListBlockEditor: React.FC<BenefitsListBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const items = content.items || [
    'Entenda seu tipo de corpo e o que valoriza você',
    'Aprenda a criar looks autênticos e poderosos',
    'Descubra as cores que harmonizam com você',
    'Maximize seu guarda-roupa com peças versáteis'
  ];

  const handleTitleChange = (title: string) => {
    onUpdate({ title });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onUpdate({ items: newItems });
  };

  const handleAddItem = () => {
    onUpdate({ items: [...items, 'Novo benefício'] });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onUpdate({ items: newItems });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Lista</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Benefícios do Guia"
        />
      </div>
      
      <div className="space-y-1">
        <Label>Itens da Lista</Label>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(index)}
              className="h-9 w-9 text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddItem}
          className="mt-2 w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>
    </div>
  );
};

export default BenefitsListBlockEditor;
