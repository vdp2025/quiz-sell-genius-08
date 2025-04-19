
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ImageUploader } from '@/components/editor/ImageUploader';

interface StyleHeroBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const StyleHeroBlockEditor: React.FC<StyleHeroBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-6">
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
        <Label>Descrição</Label>
        <RichTextEditor
          initialValue={content.description || ''}
          onChange={(value) => onUpdate({ description: value })}
          placeholder="Descrição da seção hero..."
        />
      </div>
      
      <div className="space-y-2">
        <Label>Imagem principal</Label>
        <ImageUploader
          currentImageUrl={content.mainImage || ''}
          onImageChange={(url) => onUpdate({ mainImage: url })}
          imageAlt="Imagem principal"
        />
      </div>
      
      <div className="space-y-2 pt-4 border-t">
        <Label htmlFor="ctaText">Texto do botão CTA</Label>
        <Input
          id="ctaText"
          value={content.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Ex: Quero saber mais"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ctaUrl">URL do botão CTA</Label>
        <Input
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="https://exemplo.com/pagina"
        />
      </div>
    </div>
  );
};

export default StyleHeroBlockEditor;
