
import React from 'react';
import { Button } from '@/components/ui/button';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { 
  Eye, 
  EyeOff, 
  Save, 
  Undo, 
  Palette, 
  FileDown, 
  FileUp, 
  LayoutTemplate
} from 'lucide-react';

interface EditorToolbarProps {
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onSave: () => Promise<boolean>;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig;
  onUpdateConfig: (config: ResultPageConfig) => void;
  onShowTemplates?: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewMode,
  onPreviewToggle,
  onSave,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
  onShowTemplates
}) => {
  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(resultPageConfig, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileName = `${resultPageConfig.styleType}_page_config.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting config:', error);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string);
        onUpdateConfig(importedConfig);
      } catch (error) {
        console.error('Error parsing import file:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset input value to allow importing the same file multiple times
    event.target.value = '';
  };

  // Create a hidden file input for importing
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
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
          <Palette className="w-4 h-4 mr-2" />
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
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <FileUp className="w-4 h-4 mr-2" />
          Importar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <FileDown className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          <Undo className="w-4 h-4 mr-2" />
          Resetar
        </Button>
        
        <Button
          size="sm"
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
          onClick={async () => {
            const success = await onSave();
            // Note: We're ignoring the returned value since the implementation of onSave has changed
          }}
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={handleImport}
      />
    </div>
  );
};

export default EditorToolbar;
