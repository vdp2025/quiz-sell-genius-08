
import React from 'react';
import { Button } from '@/components/ui/button';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Eye, EyeOff, Save, RotateCcw, Palette, FileUp, FileDown, LayoutTemplate } from 'lucide-react';

export interface EditorToolbarProps {
  onSave: () => void;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig | null;
  onUpdateConfig: (newConfig: any) => void;
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
  const handleExportConfig = () => {
    if (!resultPageConfig) return;

    const dataStr = JSON.stringify(resultPageConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `result-page-config-${resultPageConfig.styleType || 'default'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportConfig = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target?.result as string);
          onUpdateConfig(config);
        } catch (error) {
          console.error('Error parsing config file:', error);
          alert('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className="flex items-center justify-between border-b border-[#B89B7A]/20 px-4 py-2 bg-white">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Editar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onEditGlobalStyles}
        >
          <Palette className="h-4 w-4 mr-2" />
          Estilos Globais
        </Button>
        
        {onShowTemplates && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onShowTemplates}
          >
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Templates
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline"
          size="sm"
          onClick={handleImportConfig}
        >
          <FileUp className="h-4 w-4 mr-2" />
          Importar
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={handleExportConfig}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Resetar
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
