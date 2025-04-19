
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Upload, Save, RefreshCw } from 'lucide-react';
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
  const [jsonText, setJsonText] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setJsonText(JSON.stringify(config, null, 2));
      setParseError(null);
    } catch (error) {
      console.error('Error stringifying JSON:', error);
      setParseError('Erro ao converter configuração para JSON');
    }
  }, [config]);

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      onUpdate(parsedConfig);
      setParseError(null);
      toast({
        title: "Configuração atualizada",
        description: "As alterações foram salvas com sucesso",
        variant: "default"
      });
    } catch (error) {
      setParseError("JSON inválido. Verifique o formato.");
      toast({
        title: "Erro ao salvar",
        description: "JSON inválido. Verifique o formato e tente novamente.",
        variant: "destructive"
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
          setJsonText(JSON.stringify(parsedConfig, null, 2));
          setParseError(null);
        } catch (error) {
          toast({
            title: "Erro ao importar",
            description: "Arquivo JSON inválido",
            variant: "destructive"
          });
          setParseError("Erro ao importar arquivo. JSON inválido.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    try {
      setJsonText(JSON.stringify(config, null, 2));
      setParseError(null);
    } catch (error) {
      console.error('Error resetting JSON:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#432818]">Editor JSON</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-1" />
            Exportar
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('import-json')?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            Importar
          </Button>
          <input
            id="import-json"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
          <Button 
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Resetar
          </Button>
          <Button 
            className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
            size="sm"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-1" />
            Aplicar
          </Button>
        </div>
      </div>
      
      <Textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="flex-1 font-mono text-sm resize-none p-4 h-full"
        placeholder="JSON da configuração da página"
      />
      
      {parseError && (
        <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
          {parseError}
        </div>
      )}
    </div>
  );
};
