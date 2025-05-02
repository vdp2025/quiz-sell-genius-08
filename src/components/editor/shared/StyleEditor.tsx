
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ColorPicker } from './ColorPicker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StyleOptions {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  width?: string;
  height?: string;
  [key: string]: any;
}

interface StyleEditorProps {
  style: StyleOptions;
  onChange: (style: StyleOptions) => void;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({
  style,
  onChange
}) => {
  const handleChange = (key: string, value: string) => {
    onChange({
      ...style,
      [key]: value
    });
  };
  
  const fontWeightOptions = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
    { value: '900', label: 'Black' },
  ];
  
  const textAlignOptions = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita' },
    { value: 'justify', label: 'Justificado' },
  ];
  
  const displayOptions = [
    { value: 'block', label: 'Block' },
    { value: 'flex', label: 'Flex' },
    { value: 'grid', label: 'Grid' },
    { value: 'inline', label: 'Inline' },
    { value: 'inline-block', label: 'Inline Block' },
    { value: 'inline-flex', label: 'Inline Flex' },
    { value: 'none', label: 'None' },
  ];
  
  const flexDirectionOptions = [
    { value: 'row', label: 'Row' },
    { value: 'column', label: 'Column' },
    { value: 'row-reverse', label: 'Row Reverse' },
    { value: 'column-reverse', label: 'Column Reverse' },
  ];
  
  const justifyContentOptions = [
    { value: 'flex-start', label: 'Start' },
    { value: 'flex-end', label: 'End' },
    { value: 'center', label: 'Center' },
    { value: 'space-between', label: 'Space Between' },
    { value: 'space-around', label: 'Space Around' },
    { value: 'space-evenly', label: 'Space Evenly' },
  ];
  
  const alignItemsOptions = [
    { value: 'flex-start', label: 'Start' },
    { value: 'flex-end', label: 'End' },
    { value: 'center', label: 'Center' },
    { value: 'stretch', label: 'Stretch' },
    { value: 'baseline', label: 'Baseline' },
  ];
  
  return (
    <div className="space-y-1">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="typography">
          <AccordionTrigger>Tipografia</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                <Input
                  id="fontSize"
                  value={style.fontSize || ''}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                  placeholder="Ex: 16px, 1rem"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fontWeight">Peso da Fonte</Label>
                <Select
                  value={style.fontWeight || ''}
                  onValueChange={(value) => handleChange('fontWeight', value)}
                >
                  <SelectTrigger id="fontWeight">
                    <SelectValue placeholder="Selecione o peso" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeightOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="color">Cor do Texto</Label>
                <ColorPicker
                  value={style.color || '#000000'}
                  onChange={(color) => handleChange('color', color)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="textAlign">Alinhamento do Texto</Label>
                <Select
                  value={style.textAlign || ''}
                  onValueChange={(value) => handleChange('textAlign', value as any)}
                >
                  <SelectTrigger id="textAlign">
                    <SelectValue placeholder="Selecione o alinhamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {textAlignOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="colors">
          <AccordionTrigger>Cores</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <ColorPicker
                  value={style.backgroundColor || 'transparent'}
                  onChange={(color) => handleChange('backgroundColor', color)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="spacing">
          <AccordionTrigger>Espaçamento</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  value={style.padding || ''}
                  onChange={(e) => handleChange('padding', e.target.value)}
                  placeholder="Ex: 16px, 1rem, 1rem 2rem"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="margin">Margin</Label>
                <Input
                  id="margin"
                  value={style.margin || ''}
                  onChange={(e) => handleChange('margin', e.target.value)}
                  placeholder="Ex: 16px, 1rem, 1rem 2rem"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="gap">Gap</Label>
                <Input
                  id="gap"
                  value={style.gap || ''}
                  onChange={(e) => handleChange('gap', e.target.value)}
                  placeholder="Ex: 8px, 0.5rem"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="layout">
          <AccordionTrigger>Layout</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="width">Largura</Label>
                <Input
                  id="width"
                  value={style.width || ''}
                  onChange={(e) => handleChange('width', e.target.value)}
                  placeholder="Ex: 100%, 300px"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="height">Altura</Label>
                <Input
                  id="height"
                  value={style.height || ''}
                  onChange={(e) => handleChange('height', e.target.value)}
                  placeholder="Ex: 100%, 300px"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="borderRadius">Raio da Borda</Label>
                <Input
                  id="borderRadius"
                  value={style.borderRadius || ''}
                  onChange={(e) => handleChange('borderRadius', e.target.value)}
                  placeholder="Ex: 4px, 0.25rem"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="display">Display</Label>
                <Select
                  value={style.display || ''}
                  onValueChange={(value) => handleChange('display', value)}
                >
                  <SelectTrigger id="display">
                    <SelectValue placeholder="Selecione o display" />
                  </SelectTrigger>
                  <SelectContent>
                    {displayOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {style.display === 'flex' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="flexDirection">Direção do Flex</Label>
                    <Select
                      value={style.flexDirection || ''}
                      onValueChange={(value) => handleChange('flexDirection', value)}
                    >
                      <SelectTrigger id="flexDirection">
                        <SelectValue placeholder="Selecione a direção" />
                      </SelectTrigger>
                      <SelectContent>
                        {flexDirectionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="justifyContent">Justify Content</Label>
                    <Select
                      value={style.justifyContent || ''}
                      onValueChange={(value) => handleChange('justifyContent', value)}
                    >
                      <SelectTrigger id="justifyContent">
                        <SelectValue placeholder="Selecione o justify content" />
                      </SelectTrigger>
                      <SelectContent>
                        {justifyContentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="alignItems">Align Items</Label>
                    <Select
                      value={style.alignItems || ''}
                      onValueChange={(value) => handleChange('alignItems', value)}
                    >
                      <SelectTrigger id="alignItems">
                        <SelectValue placeholder="Selecione o align items" />
                      </SelectTrigger>
                      <SelectContent>
                        {alignItemsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
