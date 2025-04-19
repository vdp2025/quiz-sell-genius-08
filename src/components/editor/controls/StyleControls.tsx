
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from './ColorPicker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface StyleControlsProps {
  style: Record<string, any>;
  onUpdate: (style: Record<string, any>) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdate }) => {
  const handleChange = (prop: string, value: any) => {
    onUpdate({ ...style, [prop]: value });
  };
  
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="font-medium text-[#432818]">Texto</h3>
        
        <div className="space-y-2">
          <Label htmlFor="textAlign">Alinhamento</Label>
          <Select
            value={style.textAlign || 'left'}
            onValueChange={(value) => handleChange('textAlign', value)}
          >
            <SelectTrigger id="textAlign">
              <SelectValue placeholder="Alinhamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Esquerda</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Direita</SelectItem>
              <SelectItem value="justify">Justificado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontSize">Tamanho do Texto</Label>
          <Input
            id="fontSize"
            type="text"
            value={style.fontSize || ''}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            placeholder="16px, 1.2rem, etc."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontWeight">Peso da Fonte</Label>
          <Select
            value={style.fontWeight || '400'}
            onValueChange={(value) => handleChange('fontWeight', value)}
          >
            <SelectTrigger id="fontWeight">
              <SelectValue placeholder="Peso da Fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">Leve (300)</SelectItem>
              <SelectItem value="400">Normal (400)</SelectItem>
              <SelectItem value="500">Médio (500)</SelectItem>
              <SelectItem value="600">Semi-Bold (600)</SelectItem>
              <SelectItem value="700">Bold (700)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-[#432818]">Cores</h3>
        
        <div className="space-y-2">
          <Label>Cor do Texto</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: style.color || '#000000' }} 
                  />
                  <span>{style.color || 'Selecionar cor'}</span>
                </div>
                <Palette className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <ColorPicker 
                color={style.color || '#000000'} 
                onChange={(color) => handleChange('color', color)} 
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label>Cor de Fundo</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: style.backgroundColor || 'transparent' }} 
                  />
                  <span>{style.backgroundColor || 'Transparente'}</span>
                </div>
                <Palette className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <ColorPicker 
                color={style.backgroundColor || '#ffffff'} 
                onChange={(color) => handleChange('backgroundColor', color)} 
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-[#432818]">Espaçamento</h3>
        
        <div className="space-y-2">
          <Label htmlFor="padding">Padding</Label>
          <Input
            id="padding"
            type="text"
            value={style.padding || ''}
            onChange={(e) => handleChange('padding', e.target.value)}
            placeholder="10px ou 10px 20px"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            type="text"
            value={style.margin || ''}
            onChange={(e) => handleChange('margin', e.target.value)}
            placeholder="10px ou 10px 20px"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-[#432818]">Borda</h3>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Arredondamento</Label>
          <Input
            id="borderRadius"
            type="text"
            value={style.borderRadius || ''}
            onChange={(e) => handleChange('borderRadius', e.target.value)}
            placeholder="4px, 1rem, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default StyleControls;
