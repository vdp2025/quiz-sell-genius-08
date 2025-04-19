
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export const ImageBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  const [size, setSize] = useState(parseInt(block.content.width?.replace('%', '') || '100'));

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    onUpdate({ width: `${newSize}%` });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const change = direction === 'in' ? 10 : -10;
    const newSize = Math.min(Math.max(size + change, 10), 200);
    handleSizeChange(newSize);
  };

  const handleAlignment = (value: string) => {
    if (value === 'center') {
      onUpdate({
        style: {
          ...block.content.style,
          margin: '0 auto'
        }
      });
    } else if (value === 'right') {
      onUpdate({
        style: {
          ...block.content.style,
          margin: '0',
          marginLeft: 'auto'
        }
      });
    } else {
      onUpdate({
        style: {
          ...block.content.style,
          margin: '0'
        }
      });
    }
  };

  const getAlignment = () => {
    if (block.content.style?.margin === '0 auto') return 'center';
    if (block.content.style?.marginLeft === 'auto') return 'right';
    return 'left';
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-imageUrl`}>URL da Imagem</Label>
        <Input
          id={`${block.id}-imageUrl`}
          value={block.content.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-imageAlt`}>Texto Alternativo</Label>
        <Input
          id={`${block.id}-imageAlt`}
          value={block.content.imageAlt || ''}
          onChange={(e) => onUpdate({ imageAlt: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Tamanho da Imagem ({size}%)</Label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleZoom('out')}
              disabled={size <= 10}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleZoom('in')}
              disabled={size >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSizeChange(100)}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Slider
          value={[size]}
          onValueChange={([value]) => handleSizeChange(value)}
          min={10}
          max={200}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Alinhamento</Label>
        <Select 
          value={getAlignment()} 
          onValueChange={handleAlignment}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um alinhamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Ajuste da imagem</Label>
        <Select 
          value={block.content.style?.objectFit || 'cover'} 
          onValueChange={(value) => onUpdate({ 
            style: { 
              ...block.content.style, 
              objectFit: value 
            } 
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um ajuste" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cover">Preencher (cover)</SelectItem>
            <SelectItem value="contain">Conter (contain)</SelectItem>
            <SelectItem value="fill">Esticar (fill)</SelectItem>
            <SelectItem value="none">Original (none)</SelectItem>
            <SelectItem value="scale-down">Reduzir (scale-down)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {block.content.imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-[#8F7A6A] mb-2">Pré-visualização:</p>
          <img 
            src={block.content.imageUrl} 
            alt={block.content.imageAlt || ''} 
            className="max-w-full h-auto max-h-40 rounded-lg"
            style={{
              width: `${size}%`,
              objectFit: block.content.style?.objectFit || 'cover'
            }}
          />
        </div>
      )}
    </div>
  );
};
