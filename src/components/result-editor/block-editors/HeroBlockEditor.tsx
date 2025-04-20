
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';

interface HeroBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const HeroBlockEditor: React.FC<HeroBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título Principal</Label>
        <Textarea
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="VOCÊ DESCOBRIU SEU ESTILO"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Agora é hora de aplicar com clareza — e se vestir de você"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input
          id="imageUrl"
          value={content.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        
        {content.imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-[#8F7A6A] mb-1">Pré-visualização:</p>
            <div className="p-2 bg-gray-50 rounded">
              <img 
                src={content.imageUrl} 
                alt="Preview" 
                className="h-40 object-contain mx-auto" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Imagem+Inválida';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBlockEditor;
