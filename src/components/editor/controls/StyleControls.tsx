
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/result-editor/ColorPicker';

interface StyleControlsProps {
  style: any;
  onUpdate: (style: any) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdate }) => {
  const handleChange = (property: string, value: string) => {
    onUpdate({
      ...style,
      [property]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Cor do Fundo</Label>
        <ColorPicker
          color={style.backgroundColor || '#FFFFFF'}
          onChange={(color) => handleChange('backgroundColor', color)}
        />
      </div>

      <div>
        <Label>Dimensões da Imagem</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Largura</Label>
            <Input
              value={style.width || ''}
              onChange={(e) => handleChange('width', e.target.value)}
              placeholder="100%"
            />
          </div>
          <div>
            <Label className="text-xs">Altura</Label>
            <Input
              value={style.height || ''}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="auto"
            />
          </div>
        </div>
      </div>

      <div>
        <Label>Espaçamento</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Margem</Label>
            <Input
              value={style.margin || ''}
              onChange={(e) => handleChange('margin', e.target.value)}
              placeholder="0px"
            />
          </div>
          <div>
            <Label className="text-xs">Padding</Label>
            <Input
              value={style.padding || ''}
              onChange={(e) => handleChange('padding', e.target.value)}
              placeholder="0px"
            />
          </div>
        </div>
      </div>

      <div>
        <Label>Arredondamento das Bordas</Label>
        <Input
          value={style.borderRadius || ''}
          onChange={(e) => handleChange('borderRadius', e.target.value)}
          placeholder="0px"
        />
      </div>
    </div>
  );
};
