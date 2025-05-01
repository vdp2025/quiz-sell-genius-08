
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Save, Undo, Upload, Download, PaintBucket, FileCode, LayoutTemplate } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface EditorToolbarProps {
  onPreviewToggle: () => void;
  isPreviewMode: boolean;
  onSave: () => Promise<boolean> | boolean;
  onReset: () => boolean | void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig;
  onUpdateConfig: (config: ResultPageConfig) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onPreviewToggle,
  isPreviewMode,
  onSave,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
}) => {
  const { toast } = useToast();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [configJson, setConfigJson] = useState('');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportConfigJson, setExportConfigJson] = useState('');
  const [exportName, setExportName] = useState(resultPageConfig.title || 'config_export');
  
  const handleSaveClick = async () => {
    try {
      const result = await onSave();
      if (result) {
        toast({
          title: "Salvo com sucesso",
          description: "As alterações foram salvas com sucesso.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleResetClick = () => {
    const confirmed = window.confirm('Tem certeza que deseja reverter todas as alterações para os valores padrão? Esta ação não pode ser desfeita.');
    if (confirmed) {
      onReset();
      toast({
        title: "Configurações redefinidas",
        description: "As configurações foram redefinidas para os valores padrão.",
        duration: 3000,
      });
    }
  };

  const handleOpenImport = () => {
    setConfigJson('');
    setImportDialogOpen(true);
  };

  const handleImport = () => {
    try {
      const parsedConfig = JSON.parse(configJson);
      onUpdateConfig(parsedConfig);
      setImportDialogOpen(false);
      toast({
        title: "Configuração importada",
        description: "A configuração foi importada com sucesso.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error importing config:', error);
      toast({
        title: "Erro ao importar",
        description: "O JSON fornecido é inválido ou incompleto.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleOpenExport = () => {
    const configForExport = { ...resultPageConfig };
    setExportConfigJson(JSON.stringify(configForExport, null, 2));
    setExportName(`${resultPageConfig.styleType}_config_${new Date().toISOString().split('T')[0]}`);
    setExportDialogOpen(true);
  };

  const handleDownloadConfig = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportConfigJson);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${exportName}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setExportDialogOpen(false);
    } catch (error) {
      console.error('Error downloading config:', error);
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o arquivo de configuração.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="border-b bg-white sticky top-0 z-10 flex items-center justify-between p-2 shadow-sm">
        <div className="flex items-center space-x-2">
          <Button
            variant={isPreviewMode ? "secondary" : "outline"}
            size="sm"
            onClick={onPreviewToggle}
          >
            {isPreviewMode ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {isPreviewMode ? "Modo Edição" : "Visualizar"}
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveClick}
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetClick}
          >
            <Undo className="h-4 w-4 mr-1" />
            Redefinir
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditGlobalStyles}
          >
            <PaintBucket className="h-4 w-4 mr-1" />
            Estilos Globais
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenImport}
          >
            <Upload className="h-4 w-4 mr-1" />
            Importar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenExport}
          >
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <LayoutTemplate className="h-4 w-4 mr-1" />
            Templates
          </Button>
        </div>
      </div>
      
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Configuração</DialogTitle>
            <DialogDescription>
              Cole o JSON de configuração abaixo para importar as configurações.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={configJson}
              onChange={(e) => setConfigJson(e.target.value)}
              placeholder="Cole o JSON de configuração aqui..."
              rows={10}
              className="font-mono text-xs"
            />
            <Button onClick={handleImport}>Importar Configuração</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Configuração</DialogTitle>
            <DialogDescription>
              Personalize o nome do arquivo e clique em "Baixar" para salvar a configuração.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="exportName" className="block text-sm font-medium">
                Nome do arquivo
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="exportName"
                  value={exportName}
                  onChange={(e) => setExportName(e.target.value)}
                />
                <span>.json</span>
              </div>
            </div>
            <Textarea
              value={exportConfigJson}
              readOnly
              rows={10}
              className="font-mono text-xs"
            />
            <Button onClick={handleDownloadConfig}>Baixar Configuração</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditorToolbar;
