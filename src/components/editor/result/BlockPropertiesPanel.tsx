
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResultPageBlock } from '@/types/resultPageTypes';
import { ColorPicker } from '../shared/ColorPicker';
import { ImagePicker } from '../shared/ImagePicker';
import { StyleEditor } from '../shared/StyleEditor';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LucideInfo } from 'lucide-react';

interface BlockPropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: ResultPageBlock[];
  onUpdateBlock: (id: string, content: any) => void;
  onSelectionChange: (blockId: string | null) => void;
}

export const BlockPropertiesPanel: React.FC<BlockPropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onUpdateBlock,
  onSelectionChange,
}) => {
  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
  
  if (!selectedBlock) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full text-center text-muted-foreground">
        <p>Selecione um bloco para editar suas propriedades</p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Propriedades do Bloco</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="style">Estilo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              {renderContentEditor(selectedBlock, onUpdateBlock)}
            </TabsContent>
            
            <TabsContent value="style" className="space-y-4">
              <StyleEditor 
                style={selectedBlock.style || {}} 
                onChange={(newStyle) => {
                  onUpdateBlock(selectedBlock.id, { 
                    ...selectedBlock.content,
                    style: newStyle 
                  });
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to render content editor based on block type
function renderContentEditor(block: ResultPageBlock, onUpdateBlock: (id: string, content: any) => void) {
  const content = block.content || {};
  
  switch (block.type) {
    case 'headline':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, title: e.target.value })}
              placeholder="Digite o título..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={content.subtitle || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, subtitle: e.target.value })}
              placeholder="Digite o subtítulo..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alignment">Alinhamento</Label>
            <select
              id="alignment"
              className="w-full p-2 border rounded-md"
              value={content.alignment || 'center'}
              onChange={(e) => onUpdateBlock(block.id, { ...content, alignment: e.target.value })}
            >
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>
          </div>
        </>
      );
      
    case 'text':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={content.text || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, text: e.target.value })}
              placeholder="Digite o texto..."
              rows={6}
            />
          </div>
        </>
      );
      
    case 'image':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <ImagePicker
              value={content.imageUrl || ''}
              onChange={(url) => onUpdateBlock(block.id, { ...content, imageUrl: url })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">Texto Alternativo</Label>
            <Input
              id="alt"
              value={content.alt || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, alt: e.target.value })}
              placeholder="Descrição da imagem..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Largura</Label>
            <Input
              id="width"
              value={content.width || '100%'}
              onChange={(e) => onUpdateBlock(block.id, { ...content, width: e.target.value })}
              placeholder="Ex: 100%, 300px..."
            />
          </div>
        </>
      );
      
    case 'offer':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Título da Oferta</Label>
            <Input
              id="title"
              value={content.title || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, title: e.target.value })}
              placeholder="Digite o título da oferta..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={content.description || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, description: e.target.value })}
              placeholder="Digite a descrição da oferta..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              value={content.price || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, price: e.target.value })}
              placeholder="Ex: R$ 97,00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaText">Texto do Botão</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, ctaText: e.target.value })}
              placeholder="Ex: Comprar Agora"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">URL do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, ctaUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="offerImage">Imagem da Oferta</Label>
            <ImagePicker
              value={content.offerImage || ''}
              onChange={(url) => onUpdateBlock(block.id, { ...content, offerImage: url })}
            />
          </div>
        </>
      );
      
    case 'cta':
      return (
        <>
          <div className="space-y-2">
            <Label htmlFor="ctaText">Texto do Botão</Label>
            <Input
              id="ctaText"
              value={content.ctaText || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, ctaText: e.target.value })}
              placeholder="Ex: Comprar Agora"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">URL do Botão</Label>
            <Input
              id="ctaUrl"
              value={content.ctaUrl || ''}
              onChange={(e) => onUpdateBlock(block.id, { ...content, ctaUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bgColor">Cor de Fundo</Label>
            <ColorPicker
              value={content.bgColor || '#4CAF50'}
              onChange={(color) => onUpdateBlock(block.id, { ...content, bgColor: color })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="textColor">Cor do Texto</Label>
            <ColorPicker
              value={content.textColor || '#ffffff'}
              onChange={(color) => onUpdateBlock(block.id, { ...content, textColor: color })}
            />
          </div>
        </>
      );
      
    // Add more block types as needed
    
    default:
      return (
        <Alert>
          <LucideInfo className="h-4 w-4" />
          <AlertTitle>Tipo de bloco não implementado</AlertTitle>
          <AlertDescription>
            O editor para blocos do tipo "{block.type}" ainda não foi implementado.
          </AlertDescription>
        </Alert>
      );
  }
}
