
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, Loader2, Monitor, Smartphone, LayoutTemplate } from 'lucide-react';
import { EditorTab } from '../UnifiedVisualEditor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

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
  const [isSaving, setIsSaving] = useState(false);
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'quiz':
        return 'Editor de Quiz';
      case 'result':
        return 'Editor de Página de Resultado';
      case 'sales':
        return 'Editor de Página de Vendas';
      default:
        return 'Editor Unificado';
    }
  };

  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-medium text-[#432818]">{getTabTitle()}</h1>
        <div className="ml-8 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewportSize('sm')}
            className={cn(viewportSize === 'sm' && 'bg-[#FAF9F7]')}
            title="Celular"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewportSize('md')}
            className={cn(viewportSize === 'md' && 'bg-[#FAF9F7]')}
            title="Tablet"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewportSize('lg')}
            className={cn(viewportSize === 'lg' && 'bg-[#FAF9F7]')}
            title="Desktop"
          >
            <Monitor className="w-4 h-4 scale-125" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Escolher Template</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button 
                variant="outline" 
                className="h-32 flex flex-col p-2 items-center justify-center gap-2 hover:bg-[#FAF9F7]"
                onClick={() => setIsTemplateModalOpen(false)}
              >
                <div className="w-full h-16 bg-[#B89B7A]/20 rounded flex items-center justify-center text-[#8F7A6A]">
                  Pré-visualização
                </div>
                <span className="text-xs">Template Básico</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-32 flex flex-col p-2 items-center justify-center gap-2 hover:bg-[#FAF9F7]"
                onClick={() => setIsTemplateModalOpen(false)}
              >
                <div className="w-full h-16 bg-[#B89B7A]/20 rounded flex items-center justify-center text-[#8F7A6A]">
                  Pré-visualização
                </div>
                <span className="text-xs">Template Profissional</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
          className="group"
        >
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4 mr-2 group-hover:hidden" />
              <span className="group-hover:hidden">Editar</span>
              <Eye className="w-4 h-4 mr-2 hidden group-hover:block" />
              <span className="hidden group-hover:block">Visualizar</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2 group-hover:hidden" />
              <span className="group-hover:hidden">Visualizar</span>
              <EyeOff className="w-4 h-4 mr-2 hidden group-hover:block" />
              <span className="hidden group-hover:block">Editar</span>
            </>
          )}
        </Button>
        
        <Button
          variant={isSaving ? "outline" : "default"}
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            !isSaving && "bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
