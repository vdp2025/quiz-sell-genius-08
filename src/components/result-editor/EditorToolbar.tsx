
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, LayoutTemplate, Save, Undo, Settings } from 'lucide-react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { JsonConfigEditor } from './JsonConfigEditor';

interface EditorToolbarProps {
  isPreviewMode?: boolean;
  onPreviewToggle: () => void;
  onShowTemplates?: () => void;
  onSave?: () => void;
  onReset?: () => void;
  onEditGlobalStyles?: () => void;
  resultPageConfig?: ResultPageConfig;
  onUpdateConfig?: (newConfig: any) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewMode = false,
  onPreviewToggle,
  onShowTemplates,
  onSave,
  onReset,
  onEditGlobalStyles,
  resultPageConfig,
  onUpdateConfig,
}) => {
  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <h1 className="text-xl font-semibold text-[#432818]">Editor de Página de Resultados</h1>
      
      <div className="flex gap-2">
        {resultPageConfig && onUpdateConfig && (
          <JsonConfigEditor
            config={resultPageConfig}
            onUpdate={onUpdateConfig}
          />
        )}

        {onEditGlobalStyles && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEditGlobalStyles}
          >
            <Settings className="w-4 h-4 mr-2" />
            Estilos Globais
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? "Editar" : "Visualizar"}
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

        {onReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
          >
            <Undo className="w-4 h-4 mr-2" />
            Redefinir
          </Button>
        )}
        
        {onSave && (
          <Button
            variant="default"
            size="sm"
            onClick={onSave}
            className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        )}
      </div>
    </div>
  );
};
