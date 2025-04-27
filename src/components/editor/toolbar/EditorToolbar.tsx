
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, Undo, Redo } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  isPreviewing: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onUndo,
  onRedo,
  onPreviewToggle,
  onSave,
  isPreviewing,
  canUndo,
  canRedo
}) => {
  return (
    <div className="bg-white border-b p-3 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4 mr-1" />
          Desfazer
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRedo}
          disabled={!canRedo}
        >
          <Redo className="w-4 h-4 mr-1" />
          Refazer
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-1" />
          {isPreviewing ? "Editar" : "Visualizar"}
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
        >
          <Save className="w-4 h-4 mr-1" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
