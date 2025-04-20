
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: any;
  onUpdateConfig: (config: any) => void;
  onShowTemplates?: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles
}) => {
  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/resultado">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        
        <h1 className="text-xl font-playfair text-[#432818]">
          Editor da Página de Resultados
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Editar' : 'Visualizar'}
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
