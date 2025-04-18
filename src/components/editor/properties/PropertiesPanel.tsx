
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { X, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Trash2 } from 'lucide-react';
import { EditableContent, EditorBlock } from '@/types/editor';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
  onUpdate: (content: EditableContent) => void;
  onDelete: () => void;
  blocks: EditorBlock[];
}

const PropertiesPanel = ({ selectedComponentId, onClose, onUpdate, onDelete, blocks }: PropertiesPanelProps) => {
  const selectedBlock = selectedComponentId 
    ? blocks.find(block => block.id === selectedComponentId) 
    : null;

  if (!selectedComponentId || !selectedBlock) {
    return (
      <div className="p-4 text-center text-[#8F7A6A]">
        Selecione um componente para editar suas propriedades
      </div>
    );
  }

  const renderContentFields = () => {
    switch (selectedBlock.type) {
      case 'headline':
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input 
                placeholder="Digite o título..." 
                value={selectedBlock.content.title || ''}
                onChange={(e) => onUpdate({ ...selectedBlock.content, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea 
                placeholder="Digite o subtítulo..." 
                className="h-32"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => onUpdate({ ...selectedBlock.content, subtitle: e.target.value })}
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label>URL da Imagem</Label>
              <Input 
                placeholder="https://example.com/image.jpg" 
                value={selectedBlock.content.imageUrl || ''}
                onChange={(e) => onUpdate({ ...selectedBlock.content, imageUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Texto Alternativo</Label>
              <Input 
                placeholder="Descrição da imagem" 
                value={selectedBlock.content.imageAlt || ''}
                onChange={(e) => onUpdate({ ...selectedBlock.content, imageAlt: e.target.value })}
              />
            </div>
          </div>
        );
      case 'benefits':
        return (
          <div className="space-y-4">
            <div>
              <Label>Título da Seção</Label>
              <Input 
                placeholder="Benefícios" 
                value={selectedBlock.content.title || 'Benefícios'}
                onChange={(e) => onUpdate({ ...selectedBlock.content, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Benefícios (um por linha)</Label>
              <Textarea 
                placeholder="Benefício 1&#10;Benefício 2&#10;Benefício 3" 
                className="h-32"
                value={(selectedBlock.content.items || []).join('\n')}
                onChange={(e) => onUpdate({ 
                  ...selectedBlock.content, 
                  items: e.target.value.split('\n').filter(item => item.trim() !== '')
                })}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div>
              <Label>Conteúdo</Label>
              <Textarea 
                placeholder="Digite o conteúdo..." 
                className="h-32"
                value={selectedBlock.content.text || ''}
                onChange={(e) => onUpdate({ ...selectedBlock.content, text: e.target.value })}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">
          {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onDelete} className="text-red-500">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card className="p-4">
            {renderContentFields()}
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Formatação de Texto</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="icon">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Cor do Texto</Label>
                <Input 
                  type="color" 
                  className="h-10 w-full"
                  value={selectedBlock.content.textColor || '#432818'}
                  onChange={(e) => onUpdate({ ...selectedBlock.content, textColor: e.target.value })}
                />
              </div>
              <div>
                <Label>Cor de Fundo</Label>
                <Input 
                  type="color" 
                  className="h-10 w-full"
                  value={selectedBlock.content.backgroundColor || '#ffffff'}
                  onChange={(e) => onUpdate({ ...selectedBlock.content, backgroundColor: e.target.value })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Alinhamento</Label>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant={selectedBlock.content.alignment === 'left' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => onUpdate({ ...selectedBlock.content, alignment: 'left' })}
                  >
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={selectedBlock.content.alignment === 'center' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => onUpdate({ ...selectedBlock.content, alignment: 'center' })}
                  >
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={selectedBlock.content.alignment === 'right' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => onUpdate({ ...selectedBlock.content, alignment: 'right' })}
                  >
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Espaçamento</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input 
                    placeholder="Margem (px)" 
                    type="number"
                    value={selectedBlock.content.margin || ''}
                    onChange={(e) => onUpdate({ ...selectedBlock.content, margin: e.target.value })}
                  />
                  <Input 
                    placeholder="Padding (px)" 
                    type="number"
                    value={selectedBlock.content.padding || ''}
                    onChange={(e) => onUpdate({ ...selectedBlock.content, padding: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
