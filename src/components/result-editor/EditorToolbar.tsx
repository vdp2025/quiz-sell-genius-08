
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, Undo, Palette, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="p-4 border-b bg-white flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link to="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Editor de Página de Resultados</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onEditGlobalStyles}
          className="flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          <span>Estilos Globais</span>
        </Button>
        
        <Button
          variant="outline"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <Undo className="w-4 h-4" />
          <span>Resetar</span>
        </Button>
        
        <Button
          variant="outline"
          onClick={onPreviewToggle}
          className="flex items-center gap-2"
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Editar</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Visualizar</span>
            </>
          )}
        </Button>
        
        <Button
          onClick={onSave}
          className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
