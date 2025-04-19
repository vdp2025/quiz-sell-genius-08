
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, RotateCcw, PaintBucket } from 'lucide-react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onEditGlobalStyles: () => void;
  resultPageConfig: ResultPageConfig;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onEditGlobalStyles,
  resultPageConfig
}) => {
  const [isSaving, setIsSaving] = React.useState(false);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave();
      toast({
        title: "Alterações salvas",
        description: "As alterações foram salvas com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Você tem certeza que deseja resetar todas as alterações? Esta ação não pode ser desfeita.")) {
      onReset();
      toast({
        title: "Alterações resetadas",
        description: "Todas as alterações foram resetadas para os valores padrão.",
      });
    }
  };

  return (
    <div className="bg-white border-b border-[#B89B7A]/20 p-4 flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Link to={`/resultado/${resultPageConfig.styleType}`}>
          <Button variant="outline" size="sm">
            Visualizar Página
          </Button>
        </Link>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditGlobalStyles}
        >
          <PaintBucket className="w-4 h-4 mr-2" />
          Cores e Estilos
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          {isPreviewMode ? (
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
          variant="default"
          size="sm"
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
