
import React from 'react';
import { Button } from '@/components/ui/button';
import { EditorTab } from '../UnifiedVisualEditor';
import { 
  Eye, 
  EyeOff, 
  Save, 
  Layout, 
  FilePlus, 
  Loader2,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EditorToolbarProps {
  activeTab: EditorTab;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onOpenTemplateModal: () => void;
  viewportSize?: 'mobile' | 'tablet' | 'desktop';
  onViewportChange?: (size: 'mobile' | 'tablet' | 'desktop') => void;
  onExportConfig?: () => void;
  onImportConfig?: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  activeTab,
  isPreviewing,
  onPreviewToggle,
  onSave,
  onOpenTemplateModal,
  viewportSize = 'desktop',
  onViewportChange,
  onExportConfig,
  onImportConfig
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
        
        {!isPreviewing && onViewportChange && (
          <div className="hidden sm:flex items-center space-x-1 ml-2 border-l pl-2">
            <Button
              variant={viewportSize === 'mobile' ? "secondary" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => onViewportChange('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant={viewportSize === 'tablet' ? "secondary" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => onViewportChange('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewportSize === 'desktop' ? "secondary" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => onViewportChange('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-sm font-medium">
          {activeTab === 'quiz' && 'Editor de Quiz'}
          {activeTab === 'result' && 'Editor de Página de Resultado'}
          {activeTab === 'sales' && 'Editor de Página de Vendas'}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        {onExportConfig && onImportConfig && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onExportConfig}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Configuração
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onImportConfig}>
                <Upload className="h-4 w-4 mr-2" />
                Importar Configuração
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

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
