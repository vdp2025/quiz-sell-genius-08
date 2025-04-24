
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, LayoutTemplate } from 'lucide-react';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onShowTemplates: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  isPreviewing,
  onPreviewToggle,
  onShowTemplates,
}) => {
  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <h1 className="text-xl font-semibold text-[#432818]">Editor de Página de Resultados</h1>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? "Editar" : "Visualizar"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onShowTemplates}
        >
          <LayoutTemplate className="w-4 h-4 mr-2" />
          Templates
        </Button>
      </div>
    </div>
  );
};
