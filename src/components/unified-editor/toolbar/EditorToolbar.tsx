
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Save, Redo, Undo } from 'lucide-react';
import { EditorTab } from '@/components/unified-editor/UnifiedVisualEditor';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  activeTab?: EditorTab;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onOpenTemplateModal?: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab = 'quiz',
  isPreviewing,
  onPreviewToggle,
  onSave,
  onOpenTemplateModal
}) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const getTabTitle = () => {
    switch (activeTab) {
      case 'quiz': return 'Quiz';
      case 'result': return 'Página de Resultado';
      case 'sales': return 'Página de Vendas';
      default: return 'Editor';
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="border-b bg-white p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="text-gray-600 hover:text-gray-900">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-medium">Editor de {getTabTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewing ? (
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
        
        {onOpenTemplateModal && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenTemplateModal}
          >
            Templates
          </Button>
        )}
        
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};
