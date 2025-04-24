
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizComponentLayout } from '@/types/quizBuilder/componentTypes';
import { Grid, AlignLeft, AlignCenter, AlignRight, Columns, Rows } from 'lucide-react';

interface LayoutControlsProps {
  layout: QuizComponentLayout;
  onLayoutChange: (layout: Partial<QuizComponentLayout>) => void;
}

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  layout,
  onLayoutChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Colunas</Label>
        <Select
          value={layout.columns.toString()}
          onValueChange={(value) => onLayoutChange({ columns: Number(value) as 1 | 2 | 3 | 4 })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Coluna</SelectItem>
            <SelectItem value="2">2 Colunas</SelectItem>
            <SelectItem value="3">3 Colunas</SelectItem>
            <SelectItem value="4">4 Colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Espaçamento</Label>
        <Select
          value={layout.spacing}
          onValueChange={(value) => onLayoutChange({ spacing: value as QuizComponentLayout['spacing'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem espaçamento</SelectItem>
            <SelectItem value="small">Pequeno</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Alinhamento</Label>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded ${layout.alignment === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onLayoutChange({ alignment: 'left' })}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${layout.alignment === 'center' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onLayoutChange({ alignment: 'center' })}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${layout.alignment === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onLayoutChange({ alignment: 'right' })}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Direção</Label>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded ${layout.direction === 'horizontal' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onLayoutChange({ direction: 'horizontal' })}
          >
            <Rows className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${layout.direction === 'vertical' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onLayoutChange({ direction: 'vertical' })}
          >
            <Columns className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Largura do Container</Label>
        <Select
          value={layout.containerWidth}
          onValueChange={(value) => onLayoutChange({ containerWidth: value as QuizComponentLayout['containerWidth'] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Largura Total</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="small">Pequena</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
