
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Save, 
  FileText,
  Settings,
  LayoutTemplate
} from 'lucide-react';
import { EditorTab } from '../UnifiedVisualEditor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  activeTab: EditorTab;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab,
  isPreviewing,
  onPreviewToggle,
  onSave
}) => {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  
  const getTabLabel = () => {
    switch (activeTab) {
      case 'quiz': return 'Quiz';
      case 'result': return 'Página de Resultado';
      case 'sales': return 'Página de Vendas';
      default: return 'Editor';
    }
  };

  const closeTemplateDialog = () => {
    setIsTemplateDialogOpen(false);
  };

  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium text-[#432818] mr-2">
          Editor de {getTabLabel()}
        </h1>
        
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-[#8F7A6A]">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Templates para {getTabLabel()}</DialogTitle>
              <DialogDescription>
                Escolha um template para aplicar ao seu {getTabLabel()}.
              </DialogDescription>
            </DialogHeader>
            <TemplateList onSelectTemplate={closeTemplateDialog} />
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="sm" className="text-[#8F7A6A]">
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
          className="text-[#8F7A6A]"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Modo Edição' : 'Visualizar'}
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          className="text-[#8F7A6A]"
          onClick={() => {
            toast({
              title: "Exportando...",
              description: "Funcionalidade de exportação em desenvolvimento.",
              duration: 3000,
            });
          }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};
