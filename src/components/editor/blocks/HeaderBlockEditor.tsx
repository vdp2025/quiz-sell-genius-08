
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';

export const HeaderBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-logo`}>Logo URL</Label>
        <Input
          id={`${block.id}-logo`}
          value={block.content.logo || ''}
          onChange={(e) => onUpdate({ logo: e.target.value })}
          className="mt-1"
          placeholder="URL da imagem do logo"
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-logoAlt`}>Texto Alternativo do Logo</Label>
        <Input
          id={`${block.id}-logoAlt`}
          value={block.content.logoAlt || ''}
          onChange={(e) => onUpdate({ logoAlt: e.target.value })}
          className="mt-1"
          placeholder="Descrição do logo para acessibilidade"
        />
      </div>

      <div>
        <Label htmlFor={`${block.id}-title`}>Título Principal</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Seu Estilo Revelado"
        />
      </div>

      <div>
        <Label htmlFor={`${block.id}-subtitle`}>Subtítulo</Label>
        <Input
          id={`${block.id}-subtitle`}
          value={block.content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          className="mt-1"
          placeholder="Descrição curta e envolvente"
        />
      </div>
    </div>
  );
};
