
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, Download, Upload, Code, RefreshCw } from 'lucide-react';
import { BlockFactory } from '@/utils/blocks/BlockFactory';
import { resultPageStorage } from '@/services/resultPageStorage';
import { toast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Block } from '@/types/editor';
import JsonEditorPanel from './JsonEditorPanel';
import { exportProjectAsJson } from '@/utils/exportUtils';

interface EditorToolbarProps {
  onSave: () => Promise<void>;
  isPreviewMode: boolean;
  onPreviewToggle: () => void;
  onReset: () => void;
  onUpdateBlocks: (blocks: Block[]) => void;
  styleType: string;
  config: ResultPageConfig;
  onUpdateConfig: (config: ResultPageConfig) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  isPreviewMode,
  onPreviewToggle,
  onReset,
  onUpdateBlocks,
  styleType,
  config,
  onUpdateConfig
}) => {
  const [isJsonPanelOpen, setIsJsonPanelOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleReset = async () => {
    try {
      await resultPageStorage.reset(styleType);
      onReset();
      toast({
        title: "Configuração resetada",
        description: "A página foi resetada para o padrão",
        variant: "default"
      });
    } catch (error) {
      console.error('Error resetting config:', error);
      toast({
        title: "Erro ao resetar",
        description: "Não foi possível resetar a configuração",
        variant: "destructive"
      });
    }
  };

  const handleApplySalesTemplate = () => {
    try {
      const salesBlocks = BlockFactory.createSalesPageBlocks(styleType);
      console.log("Aplicando template de vendas:", salesBlocks);
      onUpdateBlocks(salesBlocks);
      toast({
        title: "Template de vendas aplicado",
        description: "O template de vendas foi aplicado com sucesso",
        variant: "default"
      });
    } catch (error) {
      console.error('Erro ao aplicar template de vendas:', error);
      toast({
        title: "Erro ao aplicar template",
        description: "Não foi possível aplicar o template de vendas",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      toast({
        title: "Configuração salva",
        description: "As alterações foram salvas com sucesso",
        variant: "default"
      });
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJson = () => {
    exportProjectAsJson(config);
    toast({
      title: "JSON exportado",
      description: "O arquivo JSON foi baixado com sucesso",
      variant: "default"
    });
  };

  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="font-playfair text-xl text-[#432818] mr-6">Editor de Página de Resultados</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Editar" : "Visualizar"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleApplySalesTemplate}
          className="border-green-500 text-green-500 hover:bg-green-50"
        >
          Aplicar Template de Vendas
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJson}
          className="border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar JSON
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsJsonPanelOpen(true)}
          className="border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          <Code className="w-4 h-4 mr-2" />
          Editor JSON
        </Button>
        
        <Button
          variant={isSaving ? "secondary" : "default"}
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
      
      <JsonEditorPanel 
        isOpen={isJsonPanelOpen}
        onClose={() => setIsJsonPanelOpen(false)}
        config={config}
        onUpdate={onUpdateConfig}
      />
    </div>
  );
};

export default EditorToolbar;
