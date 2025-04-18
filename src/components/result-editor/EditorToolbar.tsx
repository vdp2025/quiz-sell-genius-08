
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff } from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewing,
  onPreviewToggle
}) => {
  return (
    <div className="flex-shrink-0 border-b bg-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-playfair text-[#432818]">Editor da Página de Resultados</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onPreviewToggle}
        >
          {isPreviewing ? (
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
          className="bg-[#B89B7A] hover:bg-[#A38A69]" 
          onClick={onSave}
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
