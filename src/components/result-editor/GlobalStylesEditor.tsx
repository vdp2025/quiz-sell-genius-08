
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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
  const [styles, setStyles] = useState({
    primaryColor: globalStyles.primaryColor || '#aa6b5d',
    secondaryColor: globalStyles.secondaryColor || '#B89B7A',
    textColor: globalStyles.textColor || '#3a3a3a',
    backgroundColor: globalStyles.backgroundColor || '#fffaf7',
    fontFamily: globalStyles.fontFamily || 'system-ui'
  });

  const handleChange = (key: string, value: string) => {
    setStyles((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Estilos Globais</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: styles.primaryColor }}
                />
                <Input
                  id="primaryColor"
                  value={styles.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: styles.secondaryColor }}
                />
                <Input
                  id="secondaryColor"
                  value={styles.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: styles.textColor }}
                />
                <Input
                  id="textColor"
                  value={styles.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: styles.backgroundColor }}
                />
                <Input
                  id="backgroundColor"
                  value={styles.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família de Fonte</Label>
            <Select
              value={styles.fontFamily}
              onValueChange={(value) => handleChange('fontFamily', value)}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Selecione uma fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system-ui">Fonte do Sistema</SelectItem>
                <SelectItem value="sans-serif">Sans Serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="monospace">Monospace</SelectItem>
                <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Pré-visualização</h3>
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: styles.backgroundColor,
                fontFamily: styles.fontFamily,
                color: styles.textColor
              }}
            >
              <h4 
                style={{ color: styles.primaryColor }}
                className="text-xl font-medium mb-2"
              >
                Título da Seção
              </h4>
              <p className="mb-2">
                Este é um exemplo de texto com suas configurações de estilo global.
              </p>
              <button
                style={{ 
                  backgroundColor: styles.primaryColor,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none'
                }}
              >
                Botão de Exemplo
              </button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={() => onSave(styles)}>Salvar Estilos</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
