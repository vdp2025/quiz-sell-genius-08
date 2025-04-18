
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { Block } from '@/types/editor';

interface BenefitsBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const BenefitsBlockEditor: React.FC<BenefitsBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const [newItem, setNewItem] = useState('');
  
  const items = content.items || [
    'Aplicar seus estilos com autenticidade',
    'Montar looks práticos para o dia a dia, trabalho e eventos',
    'Usar cores e modelagens que valorizam quem você é',
    'Parar de errar nas compras e economizar tempo'
  ];
  
  const handleAddItem = () => {
    if (newItem.trim()) {
      onUpdate({ items: [...items, newItem.trim()] });
      setNewItem('');
    }
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onUpdate({ items: newItems });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="O que você vai aprender:"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Itens de Benefícios</Label>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  onUpdate({ items: newItems });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(index)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Adicionar novo benefício"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button type="button" onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default BenefitsBlockEditor;
