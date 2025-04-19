
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Block } from '@/types/editor';
import { ImageUploader } from '@/components/editor/ImageUploader';

interface TwoColumnBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const TwoColumnBlockEditor: React.FC<TwoColumnBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const leftColumn = content.leftColumn || {};
  const rightColumn = content.rightColumn || {};

  const handleLeftColumnChange = (data: any) => {
    onUpdate({
      leftColumn: {
        ...leftColumn,
        ...data
      }
    });
  };

  const handleRightColumnChange = (data: any) => {
    onUpdate({
      rightColumn: {
        ...rightColumn,
        ...data
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="columnGap">Espaçamento entre colunas</Label>
        <Input
          id="columnGap"
          value={content.columnGap || '24px'}
          onChange={(e) => onUpdate({ columnGap: e.target.value })}
          placeholder="24px"
        />
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Coluna Esquerda</h3>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="leftColumnType">Tipo de Conteúdo</Label>
            <Select
              value={leftColumn.type || 'image'}
              onValueChange={(value) => handleLeftColumnChange({ type: value })}
            >
              <SelectTrigger id="leftColumnType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="text">Texto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {leftColumn.type === 'image' && (
            <div className="space-y-2">
              <Label>Imagem</Label>
              <ImageUploader
                currentImageUrl={leftColumn.imageUrl || ''}
                onImageChange={(url) => handleLeftColumnChange({ imageUrl: url })}
                imageAlt="Imagem da coluna esquerda"
              />
            </div>
          )}
          
          {leftColumn.type === 'text' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="leftTitle">Título</Label>
                <Input
                  id="leftTitle"
                  value={leftColumn.title || ''}
                  onChange={(e) => handleLeftColumnChange({ title: e.target.value })}
                  placeholder="Título"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leftText">Texto</Label>
                <Textarea
                  id="leftText"
                  value={leftColumn.text || ''}
                  onChange={(e) => handleLeftColumnChange({ text: e.target.value })}
                  placeholder="Texto"
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Coluna Direita</h3>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="rightColumnType">Tipo de Conteúdo</Label>
            <Select
              value={rightColumn.type || 'text'}
              onValueChange={(value) => handleRightColumnChange({ type: value })}
            >
              <SelectTrigger id="rightColumnType">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Imagem</SelectItem>
                <SelectItem value="text">Texto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {rightColumn.type === 'image' && (
            <div className="space-y-2">
              <Label>Imagem</Label>
              <ImageUploader
                currentImageUrl={rightColumn.imageUrl || ''}
                onImageChange={(url) => handleRightColumnChange({ imageUrl: url })}
                imageAlt="Imagem da coluna direita"
              />
            </div>
          )}
          
          {rightColumn.type === 'text' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rightTitle">Título</Label>
                <Input
                  id="rightTitle"
                  value={rightColumn.title || ''}
                  onChange={(e) => handleRightColumnChange({ title: e.target.value })}
                  placeholder="Título"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rightText">Texto</Label>
                <Textarea
                  id="rightText"
                  value={rightColumn.text || ''}
                  onChange={(e) => handleRightColumnChange({ text: e.target.value })}
                  placeholder="Texto"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnBlockEditor;
