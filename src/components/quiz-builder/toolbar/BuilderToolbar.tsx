
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  EyeOff, 
  Save, 
  LayoutDashboard, 
  Play,
  Download,
  Upload
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface BuilderToolbarProps {
  activeView: 'editor' | 'preview';
  isPreviewing: boolean;
  onViewChange: (view: 'editor' | 'preview') => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onImportTemplate?: () => void;
  onExportTemplate?: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  activeView,
  isPreviewing,
  onViewChange,
  onPreviewToggle,
  onSave,
  onImportTemplate,
  onExportTemplate
}) => {
  return (
    <div className="border-b border-[#333333] bg-[#1A1F2C] p-2 flex items-center justify-between">
      <div className="flex items-center">
        <Tabs value={activeView} onValueChange={(v) => onViewChange(v as 'editor' | 'preview')}>
          <TabsList className="bg-[#333333]">
            <TabsTrigger value="editor" className="data-[state=active]:bg-[#9b87f5] text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-[#9b87f5] text-white">
              <Play className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center gap-2">
        {activeView === 'editor' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreviewToggle}
            className="text-white hover:bg-[#333333]"
          >
            {isPreviewing ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Modo Edição
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
        )}

        {onImportTemplate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onImportTemplate}
            className="text-white hover:bg-[#333333]"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
        )}
        
        {onExportTemplate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExportTemplate}
            className="text-white hover:bg-[#333333]"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        )}
        
        <Separator orientation="vertical" className="mx-2 h-6 bg-[#333333]" />

        <Button 
          onClick={onSave} 
          size="sm"
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
