
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';

interface EditBlockContentProps {
  block: EditorBlock;
  onUpdate: (content: any) => void;
}

export const EditBlockContent: React.FC<EditBlockContentProps> = ({
  block,
  onUpdate
}) => {
  // Helper to update a single property
  const updateProperty = (property: string, value: any) => {
    onUpdate({ [property]: value });
  };

  // Helper to update array items
  const updateArrayItem = (property: string, index: number, value: string) => {
    const items = [...(block.content[property] || [])];
    items[index] = value;
    onUpdate({ [property]: items });
  };

  // Add new item to array
  const addArrayItem = (property: string) => {
    const items = [...(block.content[property] || []), ''];
    onUpdate({ [property]: items });
  };

  // Remove item from array
  const removeArrayItem = (property: string, index: number) => {
    const items = [...(block.content[property] || [])];
    items.splice(index, 1);
    onUpdate({ [property]: items });
  };

  // Render different editors based on block type
  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-title`}>Título</Label>
            <Input
              id={`${block.id}-title`}
              value={block.content.title || ''}
              onChange={(e) => updateProperty('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-subtitle`}>Subtítulo</Label>
            <Input
              id={`${block.id}-subtitle`}
              value={block.content.subtitle || ''}
              onChange={(e) => updateProperty('subtitle', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Alinhamento</Label>
            <RadioGroup
              value={block.content.alignment || 'left'}
              onValueChange={(value) => updateProperty('alignment', value)}
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id={`${block.id}-align-left`} />
                <Label htmlFor={`${block.id}-align-left`}>Esquerda</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="center" id={`${block.id}-align-center`} />
                <Label htmlFor={`${block.id}-align-center`}>Centro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id={`${block.id}-align-right`} />
                <Label htmlFor={`${block.id}-align-right`}>Direita</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      );
      
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-text`}>Texto</Label>
            <Textarea
              id={`${block.id}-text`}
              value={block.content.text || ''}
              onChange={(e) => updateProperty('text', e.target.value)}
              className="mt-1"
              rows={5}
            />
          </div>
          
          <div>
            <Label>Alinhamento</Label>
            <RadioGroup
              value={block.content.alignment || 'left'}
              onValueChange={(value) => updateProperty('alignment', value)}
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id={`${block.id}-align-left`} />
                <Label htmlFor={`${block.id}-align-left`}>Esquerda</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="center" id={`${block.id}-align-center`} />
                <Label htmlFor={`${block.id}-align-center`}>Centro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id={`${block.id}-align-right`} />
                <Label htmlFor={`${block.id}-align-right`}>Direita</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      );
      
    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-imageUrl`}>URL da Imagem</Label>
            <Input
              id={`${block.id}-imageUrl`}
              value={block.content.imageUrl || ''}
              onChange={(e) => updateProperty('imageUrl', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-imageAlt`}>Texto Alternativo</Label>
            <Input
              id={`${block.id}-imageAlt`}
              value={block.content.imageAlt || ''}
              onChange={(e) => updateProperty('imageAlt', e.target.value)}
              className="mt-1"
            />
          </div>
          
          {block.content.imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-[#8F7A6A] mb-2">Pré-visualização:</p>
              <img 
                src={block.content.imageUrl} 
                alt={block.content.imageAlt || ''} 
                className="max-w-full h-auto max-h-40 rounded-lg"
              />
            </div>
          )}
        </div>
      );
      
    case 'benefits':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-title`}>Título</Label>
            <Input
              id={`${block.id}-title`}
              value={block.content.title || ''}
              onChange={(e) => updateProperty('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Benefícios</Label>
            <div className="space-y-2 mt-2">
              {(block.content.items || []).map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayItem('items', index, e.target.value)}
                    placeholder={`Benefício ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('items', index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('items')}
                className="mt-2 w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Benefício
              </Button>
            </div>
          </div>
        </div>
      );
      
    case 'pricing':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-regularPrice`}>Preço Regular (R$)</Label>
            <Input
              id={`${block.id}-regularPrice`}
              value={block.content.regularPrice || ''}
              onChange={(e) => updateProperty('regularPrice', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-salePrice`}>Preço Promocional (R$)</Label>
            <Input
              id={`${block.id}-salePrice`}
              value={block.content.salePrice || ''}
              onChange={(e) => updateProperty('salePrice', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-buttonText`}>Texto do Botão</Label>
            <Input
              id={`${block.id}-buttonText`}
              value={block.content.buttonText || ''}
              onChange={(e) => updateProperty('buttonText', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-checkoutUrl`}>URL de Checkout</Label>
            <Input
              id={`${block.id}-checkoutUrl`}
              value={block.content.checkoutUrl || ''}
              onChange={(e) => updateProperty('checkoutUrl', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      );
      
    case 'guarantee':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-title`}>Título</Label>
            <Input
              id={`${block.id}-title`}
              value={block.content.title || ''}
              onChange={(e) => updateProperty('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-text`}>Texto</Label>
            <Textarea
              id={`${block.id}-text`}
              value={block.content.text || ''}
              onChange={(e) => updateProperty('text', e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      );
      
    case 'cta':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-title`}>Título</Label>
            <Input
              id={`${block.id}-title`}
              value={block.content.title || ''}
              onChange={(e) => updateProperty('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-buttonText`}>Texto do Botão</Label>
            <Input
              id={`${block.id}-buttonText`}
              value={block.content.buttonText || ''}
              onChange={(e) => updateProperty('buttonText', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`${block.id}-url`}>URL</Label>
            <Input
              id={`${block.id}-url`}
              value={block.content.url || ''}
              onChange={(e) => updateProperty('url', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      );
      
    case 'testimonials':
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${block.id}-title`}>Título</Label>
            <Input
              id={`${block.id}-title`}
              value={block.content.title || ''}
              onChange={(e) => updateProperty('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="p-4 rounded-md bg-[#FAF9F7] border border-[#B89B7A]/20">
            <p className="text-sm text-[#8F7A6A]">
              Os depoimentos são carregados do banco de dados. Para gerenciar depoimentos, 
              acesse o painel administrativo.
            </p>
          </div>
        </div>
      );
      
    default:
      return <p>Tipo de bloco não suportado: {block.type}</p>;
  }
};
