
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

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
  const [styles, setStyles] = React.useState(globalStyles);

  const handleChange = (key: string, value: string) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-playfair text-[#432818]">
              Estilos Globais
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  value={styles.primaryColor || '#B89B7A'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  placeholder="#B89B7A"
                />
                <input
                  type="color"
                  value={styles.primaryColor || '#B89B7A'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-10 h-10 p-1 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  value={styles.secondaryColor || '#432818'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  placeholder="#432818"
                />
                <input
                  type="color"
                  value={styles.secondaryColor || '#432818'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-10 h-10 p-1 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  value={styles.textColor || '#1A1818'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  placeholder="#1A1818"
                />
                <input
                  type="color"
                  value={styles.textColor || '#1A1818'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-10 h-10 p-1 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  value={styles.backgroundColor || '#fffaf7'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  placeholder="#fffaf7"
                />
                <input
                  type="color"
                  value={styles.backgroundColor || '#fffaf7'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-10 h-10 p-1 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontFamily">Fonte Principal</Label>
              <Input
                id="fontFamily"
                value={styles.fontFamily || 'Playfair Display'}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                placeholder="Playfair Display"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
              onClick={() => onSave(styles)}
            >
              Aplicar Estilos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
