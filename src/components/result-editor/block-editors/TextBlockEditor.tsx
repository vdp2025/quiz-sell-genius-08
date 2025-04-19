
import React from 'react';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface TextBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TextBlockEditor: React.FC<TextBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <RichTextEditor
        initialValue={content.text || ''}
        onChange={(value) => onUpdate({ text: value })}
        alignment={content.alignment || 'left'}
        onAlignmentChange={(alignment) => onUpdate({ alignment })}
        label="Texto"
        placeholder="Digite o conteúdo do texto aqui..."
        minRows={6}
      />
    </div>
  );
};

export default TextBlockEditor;
