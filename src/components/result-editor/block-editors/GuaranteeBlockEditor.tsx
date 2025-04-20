
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';

interface GuaranteeBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const GuaranteeBlockEditor: React.FC<GuaranteeBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Garantia de Satisfação"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="text">Texto da Garantia</Label>
        <Textarea
          id="text"
          value={content.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, basta solicitar o reembolso em até 7 dias após a compra."
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="days">Dias de Garantia</Label>
        <Input
          id="days"
          type="number"
          min="1"
          value={content.days || 7}
          onChange={(e) => onUpdate({ days: parseInt(e.target.value) })}
          placeholder="7"
        />
      </div>
    </div>
  );
};

export default GuaranteeBlockEditor;
