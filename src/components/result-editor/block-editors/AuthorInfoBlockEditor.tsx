
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';

interface AuthorInfoBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const AuthorInfoBlockEditor: React.FC<AuthorInfoBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Seção</Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Sobre a Autora"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={content.name || ''}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Gisele Galvão"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Biografia</Label>
        <Textarea
          id="bio"
          value={content.bio || ''}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          placeholder="Com mais de 10 anos de experiência em consultoria de imagem e estilo pessoal, ajudei centenas de mulheres a descobrirem sua verdadeira essência através das roupas."
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Foto</Label>
        <Input
          id="imageUrl"
          value={content.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://exemplo.com/foto.jpg"
        />
        
        {content.imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-[#8F7A6A] mb-1">Pré-visualização:</p>
            <div className="p-2 bg-gray-50 rounded">
              <img 
                src={content.imageUrl} 
                alt="Foto da Autora" 
                className="h-40 object-contain mx-auto" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Foto+Inválida';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorInfoBlockEditor;
