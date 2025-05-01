
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, Undo, Redo, Download, Upload, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  activeTab: 'quiz' | 'result' | 'sales';
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab,
  isPreviewing,
  onPreviewToggle,
  onSave,
}) => {
  return (
    <div className="bg-white border-b border-[#B89B7A]/20 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
        <Button variant="ghost" size="sm" disabled>
          <Undo className="w-4 h-4 mr-2" />
          Desfazer
        </Button>
        <Button variant="ghost" size="sm" disabled>
          <Redo className="w-4 h-4 mr-2" />
          Refazer
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={isPreviewing ? "default" : "outline"}
          size="sm"
          onClick={onPreviewToggle}
          className={cn(
            isPreviewing && "bg-[#B89B7A] hover:bg-[#A38A69]"
          )}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? "Editar" : "Visualizar"}
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button variant="ghost" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Button>
      </div>
    </div>
  );
};
