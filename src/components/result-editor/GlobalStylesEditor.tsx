
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ColorPicker } from './ColorPicker';

interface GlobalStylesEditorProps {
  globalStyles: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  onSave: (styles: any) => void;
  onCancel: () => void;
}

export const GlobalStylesEditor: React.FC<GlobalStylesEditorProps> = ({
  globalStyles,
  onSave,
  onCancel
}) => {
  const [styles, setStyles] = useState(globalStyles);

  const handleChange = (key: string, value: string) => {
    setStyles({
      ...styles,
      [key]: value
    });
  };
  
  const fontOptions = [
    "'Playfair Display', serif",
    "'Montserrat', sans-serif",
    "'Roboto', sans-serif",
    "'Open Sans', sans-serif",
    "'Lato', sans-serif"
  ];

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Estilos Globais</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={styles.primaryColor || '#aa6b5d'}
                onChange={(color) => handleChange('primaryColor', color)}
              />
              <Input
                id="primaryColor"
                value={styles.primaryColor || '#aa6b5d'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="secondaryColor">Cor Secundária</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={styles.secondaryColor || '#432818'}
                onChange={(color) => handleChange('secondaryColor', color)}
              />
              <Input
                id="secondaryColor"
                value={styles.secondaryColor || '#432818'}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="textColor">Cor do Texto</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={styles.textColor || '#1A1818'}
                onChange={(color) => handleChange('textColor', color)}
              />
              <Input
                id="textColor"
                value={styles.textColor || '#1A1818'}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2 items-center">
              <ColorPicker
                color={styles.backgroundColor || '#fffaf7'}
                onChange={(color) => handleChange('backgroundColor', color)}
              />
              <Input
                id="backgroundColor"
                value={styles.backgroundColor || '#fffaf7'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="fontFamily">Fonte Principal</Label>
            <select
              id="fontFamily"
              value={styles.fontFamily || "'Playfair Display', serif"}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option>
              ))}
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={() => onSave(styles)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
