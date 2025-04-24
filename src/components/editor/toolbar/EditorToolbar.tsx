
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, Undo, Redo, LayoutTemplate } from 'lucide-react';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}) => {
  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {/* Implement template selection */}}
        >
          <LayoutTemplate className="w-4 h-4 mr-2" />
          Templates
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
