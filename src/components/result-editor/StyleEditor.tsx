
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StyleOptions } from '@/types/resultPageConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ColorPicker } from './ColorPicker';

interface StyleEditorProps {
  sectionPath: string;
  currentStyle: StyleOptions;
  onUpdate: (style: StyleOptions) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({
  sectionPath,
  currentStyle,
  onUpdate
}) => {
  const handleChange = (key: keyof StyleOptions, value: string) => {
    onUpdate({
      ...currentStyle,
      [key]: value
    });
  };

  return (
    <Tabs defaultValue="typography">
      <TabsList className="w-full">
        <TabsTrigger value="typography" className="flex-1">Tipografia</TabsTrigger>
        <TabsTrigger value="layout" className="flex-1">Layout</TabsTrigger>
        <TabsTrigger value="colors" className="flex-1">Cores</TabsTrigger>
      </TabsList>
      
      <TabsContent value="typography" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Fonte</Label>
          <select
            id="fontFamily"
            className="w-full border rounded-md p-2"
            value={currentStyle.fontFamily || ''}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
          >
            <option value="">Padrão</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Georgia', serif">Georgia</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontSize">Tamanho da Fonte</Label>
          <Input
            id="fontSize"
            type="text"
            value={currentStyle.fontSize || ''}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            placeholder="16px"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontWeight">Peso da Fonte</Label>
          <select
            id="fontWeight"
            className="w-full border rounded-md p-2"
            value={currentStyle.fontWeight || ''}
            onChange={(e) => handleChange('fontWeight', e.target.value)}
          >
            <option value="">Padrão</option>
            <option value="normal">Normal</option>
            <option value="bold">Negrito</option>
            <option value="300">Leve (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Médio (500)</option>
            <option value="600">Semi-negrito (600)</option>
            <option value="700">Negrito (700)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label>Alinhamento do Texto</Label>
          <RadioGroup
            value={currentStyle.textAlign || 'left'}
            onValueChange={(value) => handleChange('textAlign', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="text-left" />
              <Label htmlFor="text-left">Esquerda</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="text-center" />
              <Label htmlFor="text-center">Centro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="text-right" />
              <Label htmlFor="text-right">Direita</Label>
            </div>
          </RadioGroup>
        </div>
      </TabsContent>
      
      <TabsContent value="layout" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="width">Largura</Label>
          <Input
            id="width"
            type="text"
            value={currentStyle.width || ''}
            onChange={(e) => handleChange('width', e.target.value)}
            placeholder="100%"
          />
          <p className="text-xs text-[#8F7A6A]">Use valores como "100%", "300px", etc.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="padding">Espaçamento Interno</Label>
          <Input
            id="padding"
            type="text"
            value={currentStyle.padding || ''}
            onChange={(e) => handleChange('padding', e.target.value)}
            placeholder="16px"
          />
          <p className="text-xs text-[#8F7A6A]">Use valores como "16px" ou "16px 24px"</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="margin">Margem</Label>
          <Input
            id="margin"
            type="text"
            value={currentStyle.margin || ''}
            onChange={(e) => handleChange('margin', e.target.value)}
            placeholder="16px"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Arredondamento de Bordas</Label>
          <Input
            id="borderRadius"
            type="text"
            value={currentStyle.borderRadius || ''}
            onChange={(e) => handleChange('borderRadius', e.target.value)}
            placeholder="8px"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="colors" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="color">Cor do Texto</Label>
          <ColorPicker
            color={currentStyle.color || '#000000'}
            onChange={(color) => handleChange('color', color)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Cor de Fundo</Label>
          <ColorPicker
            color={currentStyle.backgroundColor || '#ffffff'}
            onChange={(color) => handleChange('backgroundColor', color)}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StyleEditor;
