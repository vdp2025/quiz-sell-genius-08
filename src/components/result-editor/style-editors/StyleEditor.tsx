
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { EditableContent } from '@/types/editor';
import { ColorPicker } from '@/components/ui/color-picker';

interface StyleEditorProps {
  style: EditableContent['style'];
  onUpdate: (style: any) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style = {}, onUpdate }) => {
  const updateStyle = (key: string, value: any) => {
    onUpdate({ ...style, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Spacing Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#432818]">Espaçamento</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Margem</Label>
            <Input
              value={style.margin || ''}
              onChange={(e) => updateStyle('margin', e.target.value)}
              placeholder="ex: 1rem"
            />
          </div>

          <div className="space-y-2">
            <Label>Padding</Label>
            <Input
              value={style.padding || ''}
              onChange={(e) => updateStyle('padding', e.target.value)}
              placeholder="ex: 1rem"
            />
          </div>
        </div>
      </div>

      {/* Typography Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#432818]">Tipografia</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tamanho da Fonte</Label>
              <Input
                value={style.fontSize || ''}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                placeholder="ex: 1rem"
              />
            </div>

            <div className="space-y-2">
              <Label>Peso da Fonte</Label>
              <Input
                value={style.fontWeight || ''}
                onChange={(e) => updateStyle('fontWeight', e.target.value)}
                placeholder="ex: 400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Altura da Linha</Label>
            <Input
              value={style.lineHeight || ''}
              onChange={(e) => updateStyle('lineHeight', e.target.value)}
              placeholder="ex: 1.5"
            />
          </div>

          <div className="space-y-2">
            <Label>Alinhamento do Texto</Label>
            <select
              value={style.textAlign || 'left'}
              onChange={(e) => updateStyle('textAlign', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
              <option value="justify">Justificado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#432818]">Cores</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cor do Texto</Label>
            <Input
              type="color"
              value={style.color || '#000000'}
              onChange={(e) => updateStyle('color', e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Cor de Fundo</Label>
            <Input
              type="color"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#432818]">Dimensões</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Largura</Label>
            <Input
              value={style.width || ''}
              onChange={(e) => updateStyle('width', e.target.value)}
              placeholder="ex: 100%"
            />
          </div>

          <div className="space-y-2">
            <Label>Altura</Label>
            <Input
              value={style.height || ''}
              onChange={(e) => updateStyle('height', e.target.value)}
              placeholder="ex: auto"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Raio da Borda</Label>
          <Input
            value={style.borderRadius || ''}
            onChange={(e) => updateStyle('borderRadius', e.target.value)}
            placeholder="ex: 0.5rem"
          />
        </div>
      </div>

      {/* Image Specific Controls */}
      {style.objectFit !== undefined && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#432818]">Ajuste de Imagem</h3>
          <select
            value={style.objectFit || 'cover'}
            onChange={(e) => updateStyle('objectFit', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="none">None</option>
            <option value="scale-down">Scale Down</option>
          </select>
        </div>
      )}

      {/* Border Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#432818]">Borda</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Estilo da Borda</Label>
            <select
              value={style.borderStyle || 'none'}
              onChange={(e) => updateStyle('borderStyle', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="none">Nenhuma</option>
              <option value="solid">Sólida</option>
              <option value="dashed">Tracejada</option>
              <option value="dotted">Pontilhada</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Largura da Borda</Label>
              <Input
                value={style.borderWidth || ''}
                onChange={(e) => updateStyle('borderWidth', e.target.value)}
                placeholder="ex: 1px"
              />
            </div>

            <div className="space-y-2">
              <Label>Cor da Borda</Label>
              <Input
                type="color"
                value={style.borderColor || '#000000'}
                onChange={(e) => updateStyle('borderColor', e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;
