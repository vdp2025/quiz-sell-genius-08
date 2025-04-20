
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface GlobalStylesEditorProps {
  globalStyles: Record<string, any>;
  onSave: (styles: Record<string, any>) => void;
  onCancel: () => void;
}

export const GlobalStylesEditor: React.FC<GlobalStylesEditorProps> = ({
  globalStyles,
  onSave,
  onCancel
}) => {
  const [styles, setStyles] = React.useState({ ...globalStyles });

  const handleChange = (key: string, value: string) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Sheet open={true} onOpenChange={onCancel}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Estilos Globais</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família de Fonte</Label>
            <Input
              id="fontFamily"
              value={styles.fontFamily || ''}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              placeholder="Ex: system-ui, sans-serif"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                className="w-12 h-10 p-1"
                value={styles.primaryColor || '#B89B7A'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
              />
              <Input
                value={styles.primaryColor || '#B89B7A'}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                placeholder="Ex: #B89B7A"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Cor Secundária</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                className="w-12 h-10 p-1"
                value={styles.secondaryColor || '#4A3828'}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
              />
              <Input
                value={styles.secondaryColor || '#4A3828'}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                placeholder="Ex: #4A3828"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                className="w-12 h-10 p-1"
                value={styles.backgroundColor || '#FAF9F7'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
              />
              <Input
                value={styles.backgroundColor || '#FAF9F7'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                placeholder="Ex: #FAF9F7"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textColor">Cor do Texto</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                className="w-12 h-10 p-1"
                value={styles.textColor || '#333333'}
                onChange={(e) => handleChange('textColor', e.target.value)}
              />
              <Input
                value={styles.textColor || '#333333'}
                onChange={(e) => handleChange('textColor', e.target.value)}
                placeholder="Ex: #333333"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headingColor">Cor de Títulos</Label>
            <div className="flex gap-2">
              <Input
                id="headingColor"
                type="color"
                className="w-12 h-10 p-1"
                value={styles.headingColor || '#432818'}
                onChange={(e) => handleChange('headingColor', e.target.value)}
              />
              <Input
                value={styles.headingColor || '#432818'}
                onChange={(e) => handleChange('headingColor', e.target.value)}
                placeholder="Ex: #432818"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(styles)}>
            Salvar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
