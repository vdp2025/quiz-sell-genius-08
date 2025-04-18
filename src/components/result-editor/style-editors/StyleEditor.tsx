
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StyleOptions } from '@/types/resultPageConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '../ColorPicker';

interface StyleEditorProps {
  style: StyleOptions;
  onUpdate: (style: StyleOptions) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style, onUpdate }) => {
  const handleChange = (key: keyof StyleOptions, value: string) => {
    onUpdate({
      ...style,
      [key]: value
    });
  };
  
  const alignmentOptions = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita' }
  ];

  return (
    <Tabs defaultValue="spacing">
      <TabsList className="mb-4">
        <TabsTrigger value="spacing">Espaçamento</TabsTrigger>
        <TabsTrigger value="colors">Cores</TabsTrigger>
        <TabsTrigger value="typography">Tipografia</TabsTrigger>
      </TabsList>
      
      <TabsContent value="spacing" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={style.padding || ''}
              onChange={(e) => handleChange('padding', e.target.value)}
              placeholder="ex: 1rem ou 1rem 2rem"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={style.margin || ''}
              onChange={(e) => handleChange('margin', e.target.value)}
              placeholder="ex: 1rem ou 1rem 2rem"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Largura</Label>
            <Input
              id="width"
              value={style.width || ''}
              onChange={(e) => handleChange('width', e.target.value)}
              placeholder="ex: 100% ou 300px"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="borderRadius">Raio da Borda</Label>
            <Input
              id="borderRadius"
              value={style.borderRadius || ''}
              onChange={(e) => handleChange('borderRadius', e.target.value)}
              placeholder="ex: 8px ou 0.5rem"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="colors" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color">Cor do Texto</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={style.color || '#1A1818'}
                onChange={(color) => handleChange('color', color)}
              />
              <Input
                id="color"
                value={style.color || ''}
                onChange={(e) => handleChange('color', e.target.value)}
                className="flex-1"
                placeholder="#1A1818"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={style.backgroundColor || '#ffffff'}
                onChange={(color) => handleChange('backgroundColor', color)}
              />
              <Input
                id="backgroundColor"
                value={style.backgroundColor || ''}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="flex-1"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="typography" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Tamanho da Fonte</Label>
            <Input
              id="fontSize"
              value={style.fontSize || ''}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              placeholder="ex: 16px ou 1rem"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontWeight">Peso da Fonte</Label>
            <select
              id="fontWeight"
              value={style.fontWeight || ''}
              onChange={(e) => handleChange('fontWeight', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
              <option value="bolder">Bolder</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textAlign">Alinhamento do Texto</Label>
            <div className="flex space-x-2">
              {alignmentOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange('textAlign', option.value as 'left' | 'center' | 'right')}
                  className={`flex-1 py-2 px-3 border rounded-md ${
                    style.textAlign === option.value 
                      ? 'bg-[#B89B7A] text-white border-[#B89B7A]'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família da Fonte</Label>
            <select
              id="fontFamily"
              value={style.fontFamily || ''}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione</option>
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
            </select>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StyleEditor;
