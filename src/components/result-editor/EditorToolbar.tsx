
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, RefreshCw, Palette } from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles
}) => {
  return (
    <div className="border-b bg-white px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-medium text-[#432818]">
          Editor da Página de Resultados
        </h1>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Modo Edição' : 'Visualizar'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditGlobalStyles}
        >
          <Palette className="w-4 h-4 mr-2" />
          Estilos Globais
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-amber-600 hover:text-amber-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Resetar
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
