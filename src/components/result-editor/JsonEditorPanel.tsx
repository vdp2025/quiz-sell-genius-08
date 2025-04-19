
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface JsonEditorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: ResultPageConfig;
  onUpdate: (newConfig: ResultPageConfig) => void;
}

export const JsonEditorPanel: React.FC<JsonEditorPanelProps> = ({
  isOpen,
  onClose,
  config,
  onUpdate,
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
        description: "As alterações foram aplicadas com sucesso"
      });
      onClose();
    } catch (error) {
      setParseError("JSON inválido. Verifique o formato.");
      toast({
        title: "Erro ao salvar",
        description: "JSON inválido. Verifique o formato e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    try {
      setJsonText(JSON.stringify(config, null, 2));
      setParseError(null);
      toast({
        title: "Configuração resetada",
        description: "O editor foi resetado para a última configuração salva",
      });
    } catch (error) {
      console.error('Error resetting JSON:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[600px] sm:w-[540px] overflow-hidden flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle>Editor JSON</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-end gap-2 mb-4">
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
      </SheetContent>
    </Sheet>
  );
};
