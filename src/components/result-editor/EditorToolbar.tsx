
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
}) => {
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/resultado">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-playfair text-[#432818]">
          Editor da Página de Resultados
        </h1>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Modo Edição
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </>
          )}
        </Button>
        <Button 
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};
