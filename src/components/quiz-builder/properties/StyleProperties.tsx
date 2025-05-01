
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QuizComponentStyle } from '@/types/quizBuilder';
import { Slider } from '@/components/ui/slider';

interface StylePropertiesProps {
  style: QuizComponentStyle;
  onUpdate: (style: QuizComponentStyle) => void;
}

const StyleProperties: React.FC<StylePropertiesProps> = ({ style, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Cor de Fundo</Label>
        <div className="flex gap-2">
          <div 
            className="w-10 h-10 rounded-md border border-gray-200" 
            style={{ backgroundColor: style.backgroundColor || 'transparent' }}
          />
          <Input
            id="backgroundColor"
            value={style.backgroundColor || ''}
            onChange={(e) => onUpdate({ ...style, backgroundColor: e.target.value })}
            placeholder="ex: #ffffff"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="textColor">Cor do Texto</Label>
        <div className="flex gap-2">
          <div 
            className="w-10 h-10 rounded-md border border-gray-200" 
            style={{ backgroundColor: style.textColor || '#000000' }}
          />
          <Input
            id="textColor"
            value={style.textColor || ''}
            onChange={(e) => onUpdate({ ...style, textColor: e.target.value })}
            placeholder="ex: #000000"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="padding">Espaçamento Interno</Label>
        <div className="flex gap-3 items-center">
          <Slider
            value={[parseInt(style.padding || '16')]}
            min={0}
            max={64}
            step={4}
            onValueChange={(values) => onUpdate({ ...style, padding: String(values[0]) })}
            className="flex-1"
          />
          <div className="w-12 text-center">{style.padding || '16'}px</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borderRadius">Borda Arredondada</Label>
        <div className="flex gap-3 items-center">
          <Slider
            value={[parseInt(style.borderRadius || '0')]}
            min={0}
            max={24}
            step={1}
            onValueChange={(values) => onUpdate({ ...style, borderRadius: String(values[0]) })}
            className="flex-1"
          />
          <div className="w-12 text-center">{style.borderRadius || '0'}px</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borderColor">Cor da Borda</Label>
        <div className="flex gap-2">
          <div 
            className="w-10 h-10 rounded-md border border-gray-200" 
            style={{ backgroundColor: style.borderColor || 'transparent' }}
          />
          <Input
            id="borderColor"
            value={style.borderColor || ''}
            onChange={(e) => onUpdate({ ...style, borderColor: e.target.value })}
            placeholder="ex: #cccccc"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="borderWidth">Espessura da Borda</Label>
        <div className="flex gap-3 items-center">
          <Slider
            value={[parseInt(style.borderWidth || '0')]}
            min={0}
            max={10}
            step={1}
            onValueChange={(values) => onUpdate({ ...style, borderWidth: String(values[0]) })}
            className="flex-1"
          />
          <div className="w-12 text-center">{style.borderWidth || '0'}px</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="boxShadow">Sombra</Label>
        <select
          id="boxShadow"
          value={style.boxShadow || 'none'}
          onChange={(e) => onUpdate({ ...style, boxShadow: e.target.value })}
          className="w-full border rounded-md p-2"
        >
          <option value="none">Nenhuma</option>
          <option value="0 1px 3px rgba(0,0,0,0.1)">Suave</option>
          <option value="0 4px 6px rgba(0,0,0,0.1)">Média</option>
          <option value="0 10px 15px rgba(0,0,0,0.1)">Forte</option>
        </select>
      </div>
    </div>
  );
};

export default StyleProperties;
