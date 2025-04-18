
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
  
  const handleChange = (property: string, value: string) => {
    setStyles({
      ...styles,
      [property]: value
    });
  };
  
  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Estilos Globais</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={styles.primaryColor || '#aa6b5d'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={styles.primaryColor || '#aa6b5d'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                placeholder="#aa6b5d"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Cor Secundária</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={styles.secondaryColor || '#B89B7A'}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={styles.secondaryColor || '#B89B7A'}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                placeholder="#B89B7A"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textColor">Cor do Texto</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={styles.textColor || '#1A1818'}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={styles.textColor || '#1A1818'}
                onChange={(e) => handleChange('textColor', e.target.value)}
                placeholder="#1A1818"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={styles.backgroundColor || '#fffaf7'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={styles.backgroundColor || '#fffaf7'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                placeholder="#fffaf7"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Fonte Principal</Label>
            <Input
              id="fontFamily"
              value={styles.fontFamily || ''}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              placeholder="'Playfair Display', serif"
            />
            <p className="text-xs text-[#8F7A6A]">
              Exemplo: 'Playfair Display', serif ou 'Inter', sans-serif
            </p>
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

export default GlobalStylesEditor;
