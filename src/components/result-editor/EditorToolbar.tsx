import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Save,
  Eye,
  EyeOff,
  LayoutTemplate,
  Plus,
  ChevronDown,
  FileJson
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockFactory } from '@/utils/blocks/BlockFactory';
import { toast } from '@/components/ui/use-toast';
import { JsonEditorPanel } from './JsonEditorPanel';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset?: () => void;
  onUpdateBlocks?: (blocks: any[]) => void;
  styleType?: string;
  config?: ResultPageConfig;
  onUpdateConfig?: (config: ResultPageConfig) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onUpdateBlocks,
  styleType = 'Natural',
  config,
  onUpdateConfig
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({
        title: "Salvo com sucesso",
        description: "Suas alterações foram salvas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateSalesPage = () => {
    if (onUpdateBlocks) {
      const salesBlocks = BlockFactory.createSalesPageBlocks(styleType);
      onUpdateBlocks(salesBlocks);
      toast({
        title: "Modelo de página de vendas criado",
        description: "O modelo de página de vendas foi criado com sucesso.",
      });
    }
  };

  return (
    <>
      <div className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/resultado">
            <Button variant="outline" size="sm">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-playfair text-[#432818]">
            Editor da Página de Resultados
          </h1>
        </div>
        
        <div className="flex gap-2">
          {onUpdateBlocks && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Modelos
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCreateSalesPage}>
                  Criar Página de Vendas
                </DropdownMenuItem>
                {onReset && (
                  <DropdownMenuItem onClick={onReset}>
                    Reiniciar Página
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsJsonEditorOpen(true)}
          >
            <FileJson className="w-4 h-4 mr-2" />
            Editor JSON
          </Button>
        
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            {isPreviewMode ? (
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
          
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {config && onUpdateConfig && (
        <JsonEditorPanel
          isOpen={isJsonEditorOpen}
          onClose={() => setIsJsonEditorOpen(false)}
          config={config}
          onUpdate={onUpdateConfig}
        />
      )}
    </>
  );
};

export default EditorToolbar;
