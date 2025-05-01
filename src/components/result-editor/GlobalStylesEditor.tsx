
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDefaultGlobalStyles } from '@/utils/editorDefaults';

interface GlobalStylesEditorProps {
  globalStyles: Partial<StyleOptions>;
  onSave: (styles: Partial<StyleOptions>) => void;
  onCancel: () => void;
}

interface StyleOptions {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  spacing: 'compact' | 'comfortable' | 'spacious';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  [key: string]: any;
}

export const GlobalStylesEditor: React.FC<GlobalStylesEditorProps> = ({
  globalStyles,
  onSave,
  onCancel
}) => {
  const [styles, setStyles] = useState<Partial<StyleOptions>>(globalStyles || getDefaultGlobalStyles());
  const [activeTab, setActiveTab] = useState<string>('colors');

  const handleChange = (key: keyof StyleOptions, value: any) => {
    setStyles(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(styles);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Estilos Globais</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="typography">Tipografia</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Principal</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-full border" 
                  style={{ backgroundColor: styles.primaryColor }}
                />
                <Input
                  id="primaryColor"
                  type="color"
                  value={styles.primaryColor || '#B89B7A'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.primaryColor || '#B89B7A'}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-full border" 
                  style={{ backgroundColor: styles.secondaryColor }}
                />
                <Input
                  id="secondaryColor"
                  type="color"
                  value={styles.secondaryColor || '#8F7A6A'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.secondaryColor || '#8F7A6A'}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-full border" 
                  style={{ backgroundColor: styles.textColor }}
                />
                <Input
                  id="textColor"
                  type="color"
                  value={styles.textColor || '#432818'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.textColor || '#432818'}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-full border" 
                  style={{ backgroundColor: styles.backgroundColor }}
                />
                <Input
                  id="backgroundColor"
                  type="color"
                  value={styles.backgroundColor || '#FAF9F7'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.backgroundColor || '#FAF9F7'}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Família da Fonte</Label>
              <Select 
                value={styles.fontFamily || 'sans-serif'}
                onValueChange={(value) => handleChange('fontFamily', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans-serif">Sans-serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="monospace">Monospace</SelectItem>
                  <SelectItem value="cursive">Cursive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-md bg-[#FAF9F7]">
              <p className="mb-2 text-sm text-[#8F7A6A]">Exemplo de texto:</p>
              <p style={{ 
                fontFamily: styles.fontFamily || 'sans-serif',
                color: styles.textColor || '#432818'
              }} className="text-lg">
                Este é um exemplo de como o texto aparecerá em sua página de resultados.
              </p>
              <p style={{ 
                fontFamily: styles.fontFamily || 'sans-serif',
                color: styles.textColor || '#432818'
              }}>
                O estilo da fonte afetará todos os textos em sua página, a menos que um componente específico sobrescreva esta configuração.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spacing">Espaçamento</Label>
              <Select 
                value={styles.spacing || 'comfortable'}
                onValueChange={(value) => handleChange('spacing', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o espaçamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compacto</SelectItem>
                  <SelectItem value="comfortable">Confortável</SelectItem>
                  <SelectItem value="spacious">Espaçoso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="borderRadius">Raio das Bordas</Label>
              <Select 
                value={styles.borderRadius || 'medium'}
                onValueChange={(value) => handleChange('borderRadius', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o raio das bordas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem bordas arredondadas</SelectItem>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-md bg-[#FAF9F7]">
              <div 
                className="p-4 border" 
                style={{ 
                  backgroundColor: styles.primaryColor || '#B89B7A',
                  color: '#FFFFFF',
                  borderRadius: 
                    styles.borderRadius === 'small' ? '4px' :
                    styles.borderRadius === 'medium' ? '8px' :
                    styles.borderRadius === 'large' ? '16px' : '0px',
                  padding: 
                    styles.spacing === 'compact' ? '8px' :
                    styles.spacing === 'comfortable' ? '16px' :
                    styles.spacing === 'spacious' ? '24px' : '16px',
                }}
              >
                <h3 className="font-medium mb-2">Exemplo de Componente</h3>
                <p>Este é um exemplo de como os componentes aparecerão com as configurações de layout escolhidas.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalStylesEditor;
