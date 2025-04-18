
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StyleEditorProps {
  style: any;
  onUpdate: (style: any) => void;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ style, onUpdate }) => {
  const handleChange = (property: string, value: string) => {
    onUpdate({
      ...style,
      [property]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="textAlign">Alinhamento de Texto</Label>
        <Select 
          value={style.textAlign || 'left'} 
          onValueChange={(value) => handleChange('textAlign', value)}
        >
          <SelectTrigger id="textAlign">
            <SelectValue placeholder="Escolha o alinhamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="color">Cor do Texto</Label>
        <div className="flex gap-2">
          <Input
            id="color"
            type="color"
            value={style.color || '#1A1818'}
            onChange={(e) => handleChange('color', e.target.value)}
            className="w-12 h-12 p-1"
          />
          <Input
            type="text"
            value={style.color || '#1A1818'}
            onChange={(e) => handleChange('color', e.target.value)}
            placeholder="#1A1818"
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Cor de Fundo</Label>
        <div className="flex gap-2">
          <Input
            id="backgroundColor"
            type="color"
            value={style.backgroundColor || '#FFFFFF'}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="w-12 h-12 p-1"
          />
          <Input
            type="text"
            value={style.backgroundColor || '#FFFFFF'}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            placeholder="#FFFFFF"
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="padding">Espaçamento Interno (Padding)</Label>
        <Input
          id="padding"
          value={style.padding || ''}
          onChange={(e) => handleChange('padding', e.target.value)}
          placeholder="1rem ou 16px"
        />
        <p className="text-xs text-[#8F7A6A]">Ex: 1rem, 16px, 1rem 2rem (top/bottom left/right)</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="margin">Espaçamento Externo (Margin)</Label>
        <Input
          id="margin"
          value={style.margin || ''}
          onChange={(e) => handleChange('margin', e.target.value)}
          placeholder="1rem ou 16px"
        />
        <p className="text-xs text-[#8F7A6A]">Ex: 1rem, 16px, 1rem 2rem (top/bottom left/right)</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borderRadius">Arredondamento de Bordas</Label>
        <Input
          id="borderRadius"
          value={style.borderRadius || ''}
          onChange={(e) => handleChange('borderRadius', e.target.value)}
          placeholder="8px"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fontSize">Tamanho da Fonte</Label>
        <Input
          id="fontSize"
          value={style.fontSize || ''}
          onChange={(e) => handleChange('fontSize', e.target.value)}
          placeholder="1rem ou 16px"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fontWeight">Peso da Fonte</Label>
        <Select 
          value={style.fontWeight || 'normal'} 
          onValueChange={(value) => handleChange('fontWeight', value)}
        >
          <SelectTrigger id="fontWeight">
            <SelectValue placeholder="Escolha o peso da fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Negrito</SelectItem>
            <SelectItem value="200">Fino (200)</SelectItem>
            <SelectItem value="300">Leve (300)</SelectItem>
            <SelectItem value="400">Regular (400)</SelectItem>
            <SelectItem value="500">Médio (500)</SelectItem>
            <SelectItem value="600">Semi-Negrito (600)</SelectItem>
            <SelectItem value="700">Negrito (700)</SelectItem>
            <SelectItem value="800">Extra-Negrito (800)</SelectItem>
            <SelectItem value="900">Ultra-Negrito (900)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StyleEditor;
