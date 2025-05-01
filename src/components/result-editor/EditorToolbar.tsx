
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, RotateCcw, Palette, Copy, Download, Upload, Template } from 'lucide-react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { downloadJSON, uploadJSON } from '@/utils/fileUtils';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onSave: () => boolean;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => boolean;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig | null;
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
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    const success = onSave();
    
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
    
    return success;
  };

  const handleExport = () => {
    if (!resultPageConfig) {
      toast({
        title: "Erro ao exportar",
        description: "Não há configuração para exportar",
        variant: "destructive"
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      downloadJSON(resultPageConfig, `resultado-${resultPageConfig.styleType.toLowerCase()}`);
      toast({
        title: "Exportação concluída",
        description: "A configuração foi exportada com sucesso"
      });
    } catch (error) {
      console.error('Error exporting config:', error);
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao exportar a configuração",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    
    try {
      const imported = await uploadJSON<ResultPageConfig>();
      
      if (imported) {
        onUpdateConfig(imported);
        toast({
          title: "Importação concluída",
          description: "A configuração foi importada com sucesso"
        });
      }
    } catch (error) {
      console.error('Error importing config:', error);
      toast({
        title: "Erro ao importar",
        description: "Ocorreu um erro ao importar a configuração",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsImporting(false);
      }, 1000);
    }
  };

  return (
    <div className="border-b bg-white p-3 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-lg font-medium mr-4 text-[#432818]">
          Editor de Página de Resultados
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        {onShowTemplates && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowTemplates}
            className="flex items-center"
          >
            <Template className="h-4 w-4 mr-2" />
            Templates
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleImport}
          disabled={isImporting}
          className="flex items-center"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isImporting ? 'Importando...' : 'Importar'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={isExporting || !resultPageConfig}
          className="flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exportando...' : 'Exportar'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditGlobalStyles}
          className="flex items-center"
        >
          <Palette className="h-4 w-4 mr-2" />
          Estilos Globais
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Resetar
        </Button>
        
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={onPreviewToggle}
          className="flex items-center"
        >
          <Eye className="h-4 w-4 mr-2" />
          {isPreviewMode ? 'Editando' : 'Visualizar'}
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center bg-[#B89B7A] hover:bg-[#9A7F5F] text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
