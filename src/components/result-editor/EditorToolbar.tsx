
import React from 'react';
import { Button } from '@/components/ui/button';
import { JsonConfigEditor } from './JsonConfigEditor';
import { 
  Eye, 
  Save, 
  Download, 
  RefreshCw, 
  Palette,
  Code,
  Layout
} from 'lucide-react';
import { exportProjectAsJson } from '@/utils/exportUtils';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig;
  onUpdateConfig: (newConfig: any) => void;
  onShowTemplates?: () => void;
  onToggleJsonMode?: () => void;
  isJsonMode?: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
  onShowTemplates,
  onToggleJsonMode,
  isJsonMode
}) => {
  const handleExport = () => {
    exportProjectAsJson(resultPageConfig);
  };

  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {onToggleJsonMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleJsonMode}
            className={isJsonMode ? "bg-[#FAF9F7]" : ""}
          >
            {isJsonMode ? (
              <>
                <Layout className="w-4 h-4 mr-2" />
                Modo Visual
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Modo JSON
              </>
            )}
          </Button>
        )}
        
        {!isJsonMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Editar" : "Visualizar"}
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditGlobalStyles}
        >
          <Palette className="w-4 h-4 mr-2" />
          Estilos Globais
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        {onShowTemplates && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowTemplates}
          >
            Templates
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Redefinir
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
