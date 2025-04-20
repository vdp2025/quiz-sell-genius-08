
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';

interface CallToActionBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const CallToActionBlockEditor: React.FC<CallToActionBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Transforme seu Estilo Agora!"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="text">Texto</Label>
        <Textarea
          id="text"
          value={content.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Não perca mais tempo com roupas que não combinam com você. Descubra como expressar sua verdadeira essência através do seu estilo pessoal."
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaText">Texto do Botão</Label>
        <Input
          id="ctaText"
          value={content.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Quero Transformar Meu Estilo"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaUrl">URL do Botão</Label>
        <Input
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="https://pay.hotmart.com/..."
        />
      </div>
    </div>
  );
};

export default CallToActionBlockEditor;
