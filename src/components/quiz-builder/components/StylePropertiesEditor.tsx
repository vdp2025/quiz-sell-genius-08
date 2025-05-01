import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { PaintBucket, BorderAll, LayoutGrid } from 'lucide-react';

interface StylePropertiesEditorProps {
  style: Record<string, any>;
  onUpdate: (updates: Record<string, any>) => void;
}

export const StylePropertiesEditor: React.FC<StylePropertiesEditorProps> = ({
  style = {},
  onUpdate
}) => {
  const handleUpdate = (key: string, value: any) => {
    onUpdate({ ...style, [key]: value });
  };

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Light Gray', value: '#F9F9F9' },
    { name: 'Beige', value: '#F7F4EF' },
    { name: 'Light Brown', value: '#F0EBE4' },
    { name: 'Mid Brown', value: '#B89B7A' },
    { name: 'Dark Brown', value: '#432818' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#E53935' },
    { name: 'Pink', value: '#D81B60' },
    { name: 'Purple', value: '#8E24AA' },
    { name: 'Deep Purple', value: '#5E35B1' },
    { name: 'Indigo', value: '#3949AB' },
    { name: 'Blue', value: '#1E88E5' },
    { name: 'Light Blue', value: '#039BE5' },
    { name: 'Cyan', value: '#00ACC1' },
    { name: 'Teal', value: '#00897B' },
    { name: 'Green', value: '#43A047' },
    { name: 'Light Green', value: '#7CB342' },
    { name: 'Lime', value: '#C0CA33' },
    { name: 'Yellow', value: '#FDD835' },
    { name: 'Amber', value: '#FFB300' },
    { name: 'Orange', value: '#FB8C00' },
    { name: 'Deep Orange', value: '#F4511E' },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="colors">
            <PaintBucket className="h-4 w-4 mr-1.5" /> Cores
          </TabsTrigger>
          <TabsTrigger value="borders">
            <BorderAll className="h-4 w-4 mr-1.5" /> Bordas
          </TabsTrigger>
          <TabsTrigger value="spacing">
            <LayoutGrid className="h-4 w-4 mr-1.5" /> Espaçamento
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="pt-4 space-y-4">
          {/* Background Color */}
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Cor de fundo</span>
              {style.backgroundColor && (
                <div 
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: style.backgroundColor }} 
                />
              )}
            </Label>
            
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="w-full flex items-center justify-between bg-white border rounded-md px-3 py-2 text-left"
                >
                  <span className="text-sm">
                    {style.backgroundColor || 'Selecionar cor'}
                  </span>
                  <div 
                    className="h-5 w-5 rounded border"
                    style={{ backgroundColor: style.backgroundColor || 'transparent' }} 
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-5 gap-1">
                  <button 
                    className="h-6 w-6 rounded-full border flex items-center justify-center"
                    onClick={() => handleUpdate('backgroundColor', '')}
                  >
                    <span className="text-xs">✕</span>
                  </button>
                  
                  {colors.map(color => (
                    <button
                      key={color.value}
                      className="h-6 w-6 rounded-full border hover:ring-2 hover:ring-offset-1 hover:ring-[#B89B7A]"
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleUpdate('backgroundColor', color.value)}
                      title={color.name}
                      type="button"
                    />
                  ))}
                </div>
                
                <div className="mt-2">
                  <Input
                    type="text"
                    value={style.backgroundColor || ''}
                    onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                    placeholder="#RRGGBB or rgba()"
                    className="text-xs"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Cor do texto</span>
              {style.textColor && (
                <div 
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: style.textColor }} 
                />
              )}
            </Label>
            
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="w-full flex items-center justify-between bg-white border rounded-md px-3 py-2 text-left"
                >
                  <span className="text-sm">
                    {style.textColor || 'Selecionar cor'}
                  </span>
                  <div 
                    className="h-5 w-5 rounded border"
                    style={{ backgroundColor: style.textColor || 'transparent' }} 
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-5 gap-1">
                  <button 
                    className="h-6 w-6 rounded-full border flex items-center justify-center"
                    onClick={() => handleUpdate('textColor', '')}
                  >
                    <span className="text-xs">✕</span>
                  </button>
                  
                  {colors.map(color => (
                    <button
                      key={color.value}
                      className="h-6 w-6 rounded-full border hover:ring-2 hover:ring-offset-1 hover:ring-[#B89B7A]"
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleUpdate('textColor', color.value)}
                      title={color.name}
                      type="button"
                    />
                  ))}
                </div>
                
                <div className="mt-2">
                  <Input
                    type="text"
                    value={style.textColor || ''}
                    onChange={(e) => handleUpdate('textColor', e.target.value)}
                    placeholder="#RRGGBB or rgba()"
                    className="text-xs"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Accent Color */}
          <div className="space-y-2">
            <Label className="flex items-center justify-between">
              <span>Cor de destaque</span>
              {style.accentColor && (
                <div 
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: style.accentColor }} 
                />
              )}
            </Label>
            
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  className="w-full flex items-center justify-between bg-white border rounded-md px-3 py-2 text-left"
                >
                  <span className="text-sm">
                    {style.accentColor || 'Selecionar cor'}
                  </span>
                  <div 
                    className="h-5 w-5 rounded border"
                    style={{ backgroundColor: style.accentColor || '#B89B7A' }} 
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-5 gap-1">
                  <button 
                    className="h-6 w-6 rounded-full border flex items-center justify-center"
                    onClick={() => handleUpdate('accentColor', '')}
                  >
                    <span className="text-xs">✕</span>
                  </button>
                  
                  {colors.map(color => (
                    <button
                      key={color.value}
                      className="h-6 w-6 rounded-full border hover:ring-2 hover:ring-offset-1 hover:ring-[#B89B7A]"
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleUpdate('accentColor', color.value)}
                      title={color.name}
                      type="button"
                    />
                  ))}
                </div>
                
                <div className="mt-2">
                  <Input
                    type="text"
                    value={style.accentColor || ''}
                    onChange={(e) => handleUpdate('accentColor', e.target.value)}
                    placeholder="#RRGGBB or rgba()"
                    className="text-xs"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
        
        <TabsContent value="borders" className="pt-4 space-y-4">
          {/* Border Radius */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Arredondamento</Label>
              <span className="text-sm text-gray-500">{style.borderRadius || 0}px</span>
            </div>
            <div className="flex gap-2 items-center">
              <Slider
                value={[parseInt(style.borderRadius || '0')]}
                min={0}
                max={32}
                step={1}
                onValueChange={(value) => handleUpdate('borderRadius', value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                min={0}
                max={32}
                value={style.borderRadius || 0}
                onChange={(e) => handleUpdate('borderRadius', parseInt(e.target.value) || 0)}
                className="w-16"
              />
            </div>
          </div>
          
          {/* Border Style */}
          <div className="space-y-2">
            <Label>Estilo da borda</Label>
            <Select 
              value={style.borderStyle || 'none'} 
              onValueChange={(value) => handleUpdate('borderStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem borda</SelectItem>
                <SelectItem value="solid">Sólida</SelectItem>
                <SelectItem value="dashed">Tracejada</SelectItem>
                <SelectItem value="dotted">Pontilhada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Border Width */}
          {style.borderStyle && style.borderStyle !== 'none' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Largura da borda</Label>
                <span className="text-sm text-gray-500">{style.borderWidth || 1}px</span>
              </div>
              <div className="flex gap-2 items-center">
                <Slider
                  value={[parseInt(style.borderWidth || '1')]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleUpdate('borderWidth', value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={style.borderWidth || 1}
                  onChange={(e) => handleUpdate('borderWidth', parseInt(e.target.value) || 1)}
                  className="w-16"
                />
              </div>
            </div>
          )}
          
          {/* Border Color */}
          {style.borderStyle && style.borderStyle !== 'none' && (
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Cor da borda</span>
                {style.borderColor && (
                  <div 
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: style.borderColor }} 
                  />
                )}
              </Label>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button 
                    className="w-full flex items-center justify-between bg-white border rounded-md px-3 py-2 text-left"
                  >
                    <span className="text-sm">
                      {style.borderColor || 'Selecionar cor'}
                    </span>
                    <div 
                      className="h-5 w-5 rounded border"
                      style={{ backgroundColor: style.borderColor || 'transparent' }} 
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-5 gap-1">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        className="h-6 w-6 rounded-full border hover:ring-2 hover:ring-offset-1 hover:ring-[#B89B7A]"
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleUpdate('borderColor', color.value)}
                        title={color.name}
                        type="button"
                      />
                    ))}
                  </div>
                  
                  <div className="mt-2">
                    <Input
                      type="text"
                      value={style.borderColor || ''}
                      onChange={(e) => handleUpdate('borderColor', e.target.value)}
                      placeholder="#RRGGBB or rgba()"
                      className="text-xs"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="spacing" className="pt-4 space-y-4">
          {/* Padding */}
          <div>
            <Label className="mb-2 block">Espaçamento interno (padding)</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Vertical</Label>
                  <span className="text-xs text-gray-500">{style.paddingY || 16}px</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[parseInt(style.paddingY || '16')]}
                    min={0}
                    max={64}
                    step={4}
                    onValueChange={(value) => handleUpdate('paddingY', value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={64}
                    step={4}
                    value={style.paddingY || 16}
                    onChange={(e) => handleUpdate('paddingY', parseInt(e.target.value) || 0)}
                    className="w-16"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Horizontal</Label>
                  <span className="text-xs text-gray-500">{style.paddingX || 16}px</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[parseInt(style.paddingX || '16')]}
                    min={0}
                    max={64}
                    step={4}
                    onValueChange={(value) => handleUpdate('paddingX', value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={64}
                    step={4}
                    value={style.paddingX || 16}
                    onChange={(e) => handleUpdate('paddingX', parseInt(e.target.value) || 0)}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Margin */}
          <div>
            <Label className="mb-2 block">Espaçamento externo (margin)</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Vertical</Label>
                  <span className="text-xs text-gray-500">{style.marginY || 0}px</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[parseInt(style.marginY || '0')]}
                    min={0}
                    max={64}
                    step={4}
                    onValueChange={(value) => handleUpdate('marginY', value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={64}
                    step={4}
                    value={style.marginY || 0}
                    onChange={(e) => handleUpdate('marginY', parseInt(e.target.value) || 0)}
                    className="w-16"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Horizontal</Label>
                  <span className="text-xs text-gray-500">{style.marginX || 0}px</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Slider
                    value={[parseInt(style.marginX || '0')]}
                    min={0}
                    max={64}
                    step={4}
                    onValueChange={(value) => handleUpdate('marginX', value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={0}
                    max={64}
                    step={4}
                    value={style.marginX || 0}
                    onChange={(e) => handleUpdate('marginX', parseInt(e.target.value) || 0)}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StylePropertiesEditor;
