
import React from 'react';
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
    [key: string]: any;
  };
  onSave: (styles: any) => void;
  onCancel: () => void;
}

export const GlobalStylesEditor: React.FC<GlobalStylesEditorProps> = ({
  globalStyles,
  onSave,
  onCancel
}) => {
  const [styles, setStyles] = React.useState({
    primaryColor: globalStyles.primaryColor || '#B89B7A',
    secondaryColor: globalStyles.secondaryColor || '#432818',
    textColor: globalStyles.textColor || '#1A1818',
    backgroundColor: globalStyles.backgroundColor || '#fffaf7',
    fontFamily: globalStyles.fontFamily || 'Inter, sans-serif'
  });

  const handleChange = (key: string, value: string) => {
    setStyles({
      ...styles,
      [key]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(styles);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Estilos Globais</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={styles.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={styles.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
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
                  value={styles.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={styles.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={styles.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={styles.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
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
                  value={styles.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={styles.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família de Fonte</Label>
            <Input
              id="fontFamily"
              value={styles.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              placeholder="Inter, sans-serif"
            />
            <p className="text-xs text-[#8F7A6A]">
              Exemplo: "Inter, sans-serif", "Playfair Display, serif"
            </p>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
              Salvar Estilos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalStylesEditor;
