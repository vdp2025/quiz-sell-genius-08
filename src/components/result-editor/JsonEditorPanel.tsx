
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, RefreshCw, Play } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';
import JsonApplyInstructions from './JsonApplyInstructions';

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
  const [showInstructions, setShowInstructions] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Atualiza o texto do JSON sempre que o config mudar ou quando o painel abrir
  useEffect(() => {
    if (isOpen) {
      try {
        setJsonText(JSON.stringify(config, null, 2));
        setParseError(null);
        setHasApplied(false);
      } catch (error) {
        console.error('Error stringifying JSON:', error);
        setParseError('Erro ao converter configuração para JSON');
      }
    }
  }, [config, isOpen]);

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      onUpdate(parsedConfig);
      setParseError(null);
      setHasApplied(true);
      toast({
        title: "JSON aplicado com sucesso",
        description: "As alterações foram aplicadas. Clique em 'Salvar' na barra de ferramentas para persistir as mudanças.",
        duration: 5000
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setParseError("JSON inválido. Verifique o formato.");
      toast({
        title: "Erro ao aplicar JSON",
        description: "JSON inválido. Verifique o formato e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    try {
      setJsonText(JSON.stringify(config, null, 2));
      setParseError(null);
      setHasApplied(false);
      toast({
        title: "JSON resetado",
        description: "O editor foi resetado para a última configuração salva",
      });
    } catch (error) {
      console.error('Error resetting JSON:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <SheetContent side="right" className="w-[600px] sm:w-[540px] overflow-hidden flex flex-col">
        <SheetHeader className="mb-4">
          <SheetTitle>Editor JSON</SheetTitle>
        </SheetHeader>
        
        {showInstructions ? (
          <JsonApplyInstructions onClose={() => setShowInstructions(false)} />
        ) : (
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
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
                onClick={handleSave}
              >
                <Play className="w-4 h-4 mr-1" />
                Aplicar JSON
              </Button>
            </div>
            
            <Textarea
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setHasApplied(false);
              }}
              className="flex-1 font-mono text-sm resize-none p-4 h-full"
              placeholder="JSON da configuração da página"
            />
            
            {parseError && (
              <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                {parseError}
              </div>
            )}
            
            {hasApplied && !parseError && (
              <div className="mt-2 p-2 bg-green-50 text-green-600 text-sm rounded border border-green-200">
                JSON aplicado com sucesso! Não esqueça de salvar as alterações clicando no botão "Salvar" na barra de ferramentas.
              </div>
            )}
            
            <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
              <p className="text-sm text-amber-700">
                <strong>Importante:</strong> Após aplicar o JSON, clique no botão "Salvar" na barra de ferramentas para persistir as mudanças.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default JsonEditorPanel;
