
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Block } from '@/types/editor';
import { ImageUploader } from '@/components/editor/ImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ZoomIn, ZoomOut, Maximize, AspectRatio as AspectRatioIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface ImageBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const ImageBlockEditor: React.FC<ImageBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const [size, setSize] = useState(parseInt(content.width?.replace('%', '') || '100'));
  const [aspectLocked, setAspectLocked] = useState(true);

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    onUpdate({ width: `${newSize}%` });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const change = direction === 'in' ? 10 : -10;
    const newSize = Math.min(Math.max(size + change, 10), 200);
    handleSizeChange(newSize);
  };

  const handleAlignment = (value: string) => {
    onUpdate({
      style: {
        ...content.style,
        margin: value === 'center' ? '0 auto' : '0',
        marginLeft: value === 'right' ? 'auto' : undefined
      }
    });
  };

  const handleFitToContainer = () => {
    handleSizeChange(100);
  };

  return (
    <div className="space-y-6">
      <ImageUploader
        currentImageUrl={content.imageUrl || ''}
        onImageChange={(url) => onUpdate({ imageUrl: url })}
        imageAlt={content.imageAlt || ''}
        onAltChange={(alt) => onUpdate({ imageAlt: alt })}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Tamanho da Imagem ({size}%)</Label>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleZoom('out')}
              disabled={size <= 10}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleZoom('in')}
              disabled={size >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFitToContainer}
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAspectLocked(!aspectLocked)}
            >
              <AspectRatioIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Slider
          value={[size]}
          onValueChange={([value]) => handleSizeChange(value)}
          min={10}
          max={200}
          step={1}
          className="w-full"
        />

        <div className="space-y-2">
          <Label>Alinhamento</Label>
          <ToggleGroup
            type="single"
            defaultValue={
              content.style?.margin === '0 auto' 
                ? 'center' 
                : content.style?.marginLeft === 'auto'
                  ? 'right'
                  : 'left'
            }
            className="justify-start"
            onValueChange={handleAlignment}
          >
            <ToggleGroupItem value="left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Ajuste da imagem</Label>
          <Select 
            value={content.style?.objectFit || 'cover'} 
            onValueChange={(value) => onUpdate({ 
              style: { 
                ...content.style, 
                objectFit: value 
              } 
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um ajuste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Preencher (cover)</SelectItem>
              <SelectItem value="contain">Conter (contain)</SelectItem>
              <SelectItem value="fill">Esticar (fill)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {aspectLocked && (
          <div className="space-y-2">
            <Label>Proporção</Label>
            <AspectRatio ratio={16/9}>
              <div className="w-full h-full bg-muted rounded-lg" />
            </AspectRatio>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageBlockEditor;
