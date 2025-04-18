
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
    setStyles(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Estilos Globais</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Cor Primária</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={styles.primaryColor || '#aa6b5d'}
                onChange={(color) => handleChange('primaryColor', color)}
              />
              <span className="text-sm">{styles.primaryColor || '#aa6b5d'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cor Secundária</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={styles.secondaryColor || '#432818'}
                onChange={(color) => handleChange('secondaryColor', color)}
              />
              <span className="text-sm">{styles.secondaryColor || '#432818'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cor do Texto</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={styles.textColor || '#1A1818'}
                onChange={(color) => handleChange('textColor', color)}
              />
              <span className="text-sm">{styles.textColor || '#1A1818'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cor de Fundo</Label>
            <div className="flex items-center gap-4">
              <ColorPicker
                color={styles.backgroundColor || '#fffaf7'}
                onChange={(color) => handleChange('backgroundColor', color)}
              />
              <span className="text-sm">{styles.backgroundColor || '#fffaf7'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Fonte Principal</Label>
            <select
              className="w-full border rounded-md p-2"
              value={styles.fontFamily || "'Playfair Display', serif"}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
            >
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="'Inter', sans-serif">Inter</option>
              <option value="'Arial', sans-serif">Arial</option>
              <option value="'Georgia', serif">Georgia</option>
            </select>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(styles)} className="bg-[#B89B7A] hover:bg-[#A38A69]">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
