
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QuizComponentStyle } from '@/types/quizBuilder';

interface ComponentStylePropertiesProps {
  style: QuizComponentStyle;
  onUpdate: (id: string, updates: Partial<QuizComponentStyle>) => void;
  componentId: string;
}

export const ComponentStyleProperties: React.FC<ComponentStylePropertiesProps> = ({
  style,
  onUpdate,
  componentId
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Cor de fundo</Label>
        <Input 
          type="color"
          value={style.backgroundColor || '#ffffff'} 
          onChange={(e) => onUpdate(componentId, { backgroundColor: e.target.value })}
          className="w-10 h-10 p-1 border rounded-md"
        />
      </div>
      
      <div>
        <Label>Cor do texto</Label>
        <Input 
          type="color"
          value={style.textColor || '#000000'} 
          onChange={(e) => onUpdate(componentId, { textColor: e.target.value })}
          className="w-10 h-10 p-1 border rounded-md"
        />
      </div>
      
      <div>
        <Label>Raio da borda</Label>
        <Input 
          type="number"
          value={style.borderRadius || '0'} 
          onChange={(e) => onUpdate(componentId, { borderRadius: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div>
        <Label>Espaçamento vertical (px)</Label>
        <Input 
          type="number"
          value={style.paddingY || '16'} 
          onChange={(e) => onUpdate(componentId, { paddingY: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div>
        <Label>Espaçamento horizontal (px)</Label>
        <Input 
          type="number"
          value={style.paddingX || '16'} 
          onChange={(e) => onUpdate(componentId, { paddingX: e.target.value })}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};
