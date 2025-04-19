
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface HeadlineBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const HeadlineBlockEditor: React.FC<HeadlineBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Digite o título"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Input
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Digite o subtítulo"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="alignment">Alinhamento</Label>
        <Select
          value={content.alignment || 'left'}
          onValueChange={(value) => onUpdate({ alignment: value })}
        >
          <SelectTrigger id="alignment">
            <SelectValue placeholder="Selecione o alinhamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="textColor">Cor do texto</Label>
        <div className="flex space-x-2">
          <Input
            id="textColor"
            type="color"
            value={content.textColor || '#432818'}
            onChange={(e) => onUpdate({ textColor: e.target.value })}
            className="w-12"
          />
          <Input
            value={content.textColor || '#432818'}
            onChange={(e) => onUpdate({ textColor: e.target.value })}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadlineBlockEditor;
