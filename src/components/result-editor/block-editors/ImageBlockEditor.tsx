
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { ImageUploader } from '@/components/editor/ImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImageBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const ImageBlockEditor: React.FC<ImageBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;

  return (
    <div className="space-y-6">
      <ImageUploader
        currentImageUrl={content.imageUrl || ''}
        onImageChange={(url) => onUpdate({ imageUrl: url })}
        imageAlt={content.imageAlt || ''}
        onAltChange={(alt) => onUpdate({ imageAlt: alt })}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Largura</Label>
          <Input
            id="width"
            value={content.width || ''}
            onChange={(e) => onUpdate({ width: e.target.value })}
            placeholder="100%, 300px"
          />
          <p className="text-xs text-gray-500">Use valores como % ou px</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Arredondamento</Label>
          <Input
            id="borderRadius"
            value={content.borderRadius || ''}
            onChange={(e) => onUpdate({ borderRadius: e.target.value })}
            placeholder="8px, 50%"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="objectFit">Ajuste da imagem</Label>
        <Select 
          value={content.objectFit || 'cover'} 
          onValueChange={(value) => onUpdate({ objectFit: value })}
        >
          <SelectTrigger id="objectFit">
            <SelectValue placeholder="Selecione um ajuste" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cover">Preencher (cover)</SelectItem>
            <SelectItem value="contain">Conter (contain)</SelectItem>
            <SelectItem value="fill">Esticar (fill)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">Define como a imagem se ajusta ao seu contêiner</p>
      </div>
    </div>
  );
};

export default ImageBlockEditor;
