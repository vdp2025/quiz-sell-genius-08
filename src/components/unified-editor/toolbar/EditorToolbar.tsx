
import React from 'react';
import { Button } from '@/components/ui/button';
import { EditorTab } from '../UnifiedVisualEditor';
import { 
  Eye, 
  EyeOff, 
  Save, 
  Layout, 
  FilePlus, 
  Loader2 
} from 'lucide-react';

interface EditorToolbarProps {
  activeTab: EditorTab;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onOpenTemplateModal: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab,
  isPreviewing,
  onPreviewToggle,
  onSave,
  onOpenTemplateModal
}) => {
  return (
    <div className="flex items-center justify-between p-2 border-b bg-white">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
          className="flex items-center gap-1"
        >
          {isPreviewing ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span className="hidden sm:inline">Editor</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visualizar</span>
            </>
          )}
        </Button>
      </div>

      <div className="text-center">
        <h2 className="text-sm font-medium">
          {activeTab === 'quiz' && 'Editor de Quiz'}
          {activeTab === 'result' && 'Editor de Página de Resultado'}
          {activeTab === 'sales' && 'Editor de Página de Vendas'}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenTemplateModal}
          className="flex items-center gap-1"
        >
          <FilePlus className="h-4 w-4" />
          <span className="hidden sm:inline">Modelos</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-1 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Salvar</span>
        </Button>
      </div>
    </div>
  );
};
