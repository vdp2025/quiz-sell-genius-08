
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StyleEditorProps {
  style: any;
  onUpdate: (style: any) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style, onUpdate }) => {
  const handleStyleChange = (property: string, value: string) => {
    onUpdate({
      ...style,
      [property]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="spacing" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="spacing" className="flex-1">Espaçamento</TabsTrigger>
          <TabsTrigger value="colors" className="flex-1">Cores</TabsTrigger>
          <TabsTrigger value="typography" className="flex-1">Tipografia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spacing" className="space-y-4">
          <div className="space-y-2">
            <Label>Margem Superior</Label>
            <Select
              value={style.marginTop || '0'}
              onValueChange={(value) => handleStyleChange('marginTop', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Nenhum</SelectItem>
                <SelectItem value="1">XS (4px)</SelectItem>
                <SelectItem value="2">S (8px)</SelectItem>
                <SelectItem value="4">M (16px)</SelectItem>
                <SelectItem value="6">L (24px)</SelectItem>
                <SelectItem value="8">XL (32px)</SelectItem>
                <SelectItem value="12">XXL (48px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Margem Inferior</Label>
            <Select
              value={style.marginBottom || '0'}
              onValueChange={(value) => handleStyleChange('marginBottom', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Nenhum</SelectItem>
                <SelectItem value="1">XS (4px)</SelectItem>
                <SelectItem value="2">S (8px)</SelectItem>
                <SelectItem value="4">M (16px)</SelectItem>
                <SelectItem value="6">L (24px)</SelectItem>
                <SelectItem value="8">XL (32px)</SelectItem>
                <SelectItem value="12">XXL (48px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Padding</Label>
            <Select
              value={style.padding || '4'}
              onValueChange={(value) => handleStyleChange('padding', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Nenhum</SelectItem>
                <SelectItem value="1">XS (4px)</SelectItem>
                <SelectItem value="2">S (8px)</SelectItem>
                <SelectItem value="4">M (16px)</SelectItem>
                <SelectItem value="6">L (24px)</SelectItem>
                <SelectItem value="8">XL (32px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="space-y-2">
            <Label>Cor de Fundo</Label>
            <Input
              type="text"
              value={style.backgroundColor || '#FFFFFF'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cor do Texto</Label>
            <Input
              type="text"
              value={style.textColor || '#432818'}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Cor de Destaque</Label>
            <Input
              type="text"
              value={style.accentColor || '#B89B7A'}
              onChange={(e) => handleStyleChange('accentColor', e.target.value)}
              className="font-mono"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-4">
          <div className="space-y-2">
            <Label>Alinhamento</Label>
            <Select
              value={style.textAlign || 'left'}
              onValueChange={(value) => handleStyleChange('textAlign', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tamanho da Fonte</Label>
            <Select
              value={style.fontSize || 'base'}
              onValueChange={(value) => handleStyleChange('fontSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">Muito Pequeno</SelectItem>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="base">Médio</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
                <SelectItem value="xl">Muito Grande</SelectItem>
                <SelectItem value="2xl">Extra Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StyleEditor;
