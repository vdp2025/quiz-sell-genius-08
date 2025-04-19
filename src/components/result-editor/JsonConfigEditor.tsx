
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Download, Upload, Save } from 'lucide-react';
import { exportProjectAsJson } from '@/utils/exportUtils';
import { toast } from '@/components/ui/use-toast';

interface JsonConfigEditorProps {
  config: any;
  onUpdate: (newConfig: any) => void;
}

export const JsonConfigEditor: React.FC<JsonConfigEditorProps> = ({
  config,
  onUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  const handleOpen = () => {
    try {
      setJsonText(JSON.stringify(config, null, 2));
      setIsOpen(true);
      setParseError(null);
    } catch (error) {
      toast({
        title: "Erro ao abrir JSON",
        description: "Não foi possível carregar a configuração atual.",
        type: 'error'
      });
    }
  };

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      onUpdate(parsedConfig);
      setIsOpen(false);
      setParseError(null);
      toast({
        title: "Configuração atualizada",
        description: "As alterações foram salvas com sucesso",
        type: 'success'
      });
    } catch (error) {
      setParseError("JSON inválido. Verifique o formato.");
      toast({
        title: "Erro ao salvar",
        description: "JSON inválido. Verifique o formato e tente novamente.",
        type: 'error'
      });
    }
  };

  const handleExport = () => exportProjectAsJson(config);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedConfig = JSON.parse(content);
          onUpdate(parsedConfig);
          toast({
            title: "Configuração importada",
            description: "O arquivo foi importado com sucesso",
            type: 'success'
          });
        } catch (error) {
          toast({
            title: "Erro ao importar",
            description: "Arquivo JSON inválido",
            type: 'error'
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpen}
      >
        Editar JSON
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Configuração JSON</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            {parseError && (
              <div className="text-red-500 text-sm">{parseError}</div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button 
                onClick={() => document.getElementById('import-json')?.click()}
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
              <input
                id="import-json"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
