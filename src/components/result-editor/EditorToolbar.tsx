
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, Undo, Palette } from 'lucide-react';

interface EditorToolbarProps {
  onPreviewToggle: () => void;
  isPreviewMode: boolean;
  onSave: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onPreviewToggle,
  isPreviewMode,
  onSave,
  onReset,
  onEditGlobalStyles
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-playfair text-[#432818]">
              Editor da Página de Resultados
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditGlobalStyles}
              className="hidden sm:flex"
            >
              <Palette className="w-4 h-4 mr-2" />
              Estilos Globais
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="hidden sm:flex"
            >
              <Undo className="w-4 h-4 mr-2" />
              Redefinir
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviewToggle}
            >
              {isPreviewMode ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Modo Editor</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Visualizar</span>
                </>
              )}
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Salvar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
