
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';

interface TextBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TextBlockEditor: React.FC<TextBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Texto</Label>
        <Textarea
          id="text"
          rows={6}
          value={content.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Digite seu texto aqui..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="textColor">Cor do texto</Label>
        <Input
          id="textColor"
          type="color"
          value={content.textColor || '#1A1818'}
          onChange={(e) => onUpdate({ textColor: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="alignment">Alinhamento</Label>
        <div className="flex gap-2">
          <button
            type="button"
            className={`p-2 border rounded-md ${
              (content.alignment || 'left') === 'left' ? 'bg-[#B89B7A]/20' : ''
            }`}
            onClick={() => onUpdate({ alignment: 'left' })}
          >
            Esquerda
          </button>
          <button
            type="button"
            className={`p-2 border rounded-md ${
              (content.alignment || 'left') === 'center' ? 'bg-[#B89B7A]/20' : ''
            }`}
            onClick={() => onUpdate({ alignment: 'center' })}
          >
            Centro
          </button>
          <button
            type="button"
            className={`p-2 border rounded-md ${
              (content.alignment || 'left') === 'right' ? 'bg-[#B89B7A]/20' : ''
            }`}
            onClick={() => onUpdate({ alignment: 'right' })}
          >
            Direita
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextBlockEditor;
