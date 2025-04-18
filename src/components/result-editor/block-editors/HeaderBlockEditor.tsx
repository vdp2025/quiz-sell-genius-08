
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';

interface HeaderBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const HeaderBlockEditor: React.FC<HeaderBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Olá, seu Estilo Predominante é:"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
        <Input
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Subtítulo opcional..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input
          id="logo"
          value={content.logo || ''}
          onChange={(e) => onUpdate({ logo: e.target.value })}
          placeholder="URL do logo"
        />
        {content.logo && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <img 
              src={content.logo} 
              alt="Logo preview" 
              className="h-10 object-contain mx-auto"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="logoAlt">Texto alternativo do logo</Label>
        <Input
          id="logoAlt"
          value={content.logoAlt || ''}
          onChange={(e) => onUpdate({ logoAlt: e.target.value })}
          placeholder="Descrição do logo para acessibilidade"
        />
      </div>
    </div>
  );
};

export default HeaderBlockEditor;
