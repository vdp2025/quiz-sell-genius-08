
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    </div>
  );
};

export default TextBlockEditor;
