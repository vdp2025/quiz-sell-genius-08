
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';

export const StyleResultBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-title`}>Título do Resultado</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Seu Estilo Principal é..."
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-description`}>Descrição do Resultado</Label>
        <Input
          id={`${block.id}-description`}
          value={block.content.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="mt-1"
          placeholder="Descrição do estilo principal"
        />
      </div>
    </div>
  );
};
