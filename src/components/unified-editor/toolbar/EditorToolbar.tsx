
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff } from 'lucide-react';

export interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  isSaving?: boolean;
  activeTab?: string;
  onOpenTemplateModal?: () => void;
  viewportSize?: 'sm' | 'md' | 'lg' | 'xl';
  onViewportSizeChange?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onSave,
  isSaving = false,
  activeTab,
  onOpenTemplateModal,
  viewportSize,
  onViewportSizeChange
}) => {
  return (
    <div className="w-full border-b bg-white py-2 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-medium">Editor Visual</h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewing ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Editar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </>
          )}
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
