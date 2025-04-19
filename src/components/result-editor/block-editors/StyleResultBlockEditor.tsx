
import React from 'react';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { ImageUploader } from '@/components/editor/ImageUploader';

interface StyleResultBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const StyleResultBlockEditor: React.FC<StyleResultBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      <div className="p-3 bg-[#FAF9F7] rounded border border-[#B89B7A]/20">
        <p className="text-sm text-[#8F7A6A]">
          Este bloco exibe automaticamente o estilo predominante do usuário com base no resultado do quiz.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Descrição do resultado</Label>
        <RichTextEditor
          initialValue={content.description || ''}
          onChange={(value) => onUpdate({ description: value })}
          placeholder="Descreva o que este estilo representa..."
          minRows={5}
        />
      </div>

      <div className="space-y-2">
        <Label>Imagem do estilo</Label>
        <ImageUploader
          currentImageUrl={content.imageUrl || content.image || ''}
          onImageChange={(url) => onUpdate({ imageUrl: url, image: url })}
          imageAlt={content.imageAlt || 'Imagem do estilo'}
          onAltChange={(alt) => onUpdate({ imageAlt: alt })}
        />
      </div>
    </div>
  );
};

export default StyleResultBlockEditor;
