
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, RotateCcw, PaletteIcon, LayoutTemplate } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface EditorToolbarProps {
  onSave: () => Promise<boolean>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig;
  onUpdateConfig: (config: ResultPageConfig) => void;
  onShowTemplates?: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
  onShowTemplates
}) => {
  const { toast } = useToast();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importedConfig, setImportedConfig] = useState('');

  const handleExport = () => {
    setExportDialogOpen(true);
  };

  const handleImport = () => {
    setImportDialogOpen(true);
  };

  const handleSaveClick = async () => {
    const success = await onSave();
    if (success) {
      toast({
        title: "Salvo com sucesso",
        description: "Suas alterações foram salvas.",
      });
    }
  };

  const handleImportSubmit = () => {
    try {
      const parsedConfig = JSON.parse(importedConfig);
      onUpdateConfig(parsedConfig);
      setImportDialogOpen(false);
      setImportedConfig('');
      toast({
        title: "Configuração importada",
        description: "A configuração foi importada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao importar",
        description: "A configuração fornecida é inválida.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="border-b border-[#B89B7A]/20 bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onEditGlobalStyles}
          >
            <PaletteIcon className="w-4 h-4 mr-2" />
            Estilos Globais
          </Button>
          
          {onShowTemplates && (
            <Button
              variant="outline"
              size="sm"
              onClick={onShowTemplates}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Templates
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            Exportar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
          >
            Importar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-amber-600"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Redefinir
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleSaveClick}
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
      
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Configuração</DialogTitle>
            <DialogDescription>
              Copie o JSON abaixo para salvar sua configuração atual.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            value={JSON.stringify(resultPageConfig, null, 2)}
            readOnly
            rows={15}
            className="font-mono text-sm"
          />
          
          <Button 
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(resultPageConfig, null, 2));
              toast({
                title: "Copiado!",
                description: "Configuração copiada para a área de transferência.",
              });
            }}
          >
            Copiar para Área de Transferência
          </Button>
        </DialogContent>
      </Dialog>
      
      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Configuração</DialogTitle>
            <DialogDescription>
              Cole o JSON de configuração para importar.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            value={importedConfig}
            onChange={(e) => setImportedConfig(e.target.value)}
            placeholder="Cole o JSON aqui..."
            rows={15}
            className="font-mono text-sm"
          />
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleImportSubmit}>
              Importar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorToolbar;
