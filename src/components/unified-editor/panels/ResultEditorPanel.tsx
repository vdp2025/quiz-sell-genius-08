
import React, { useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const {
    resultPageConfig,
    blocks,
    selectedBlockId,
    selectBlock,
    isGlobalStylesOpen,
    actions,
    loading
  } = useResultPageEditor(primaryStyle.category);

  useEffect(() => {
    // Carregar configuração inicial
    if (!blocks.length && !loading) {
      actions.handleLoadDefaultTemplate();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#8F7A6A] text-lg">Carregando editor...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onComponentSelect={actions.handleAddBlock}
            onError={(error) => {
              toast({
                title: "Erro ao adicionar componente",
                description: error,
                variant: "destructive"
              });
            }}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={selectBlock}
            isPreviewing={isPreviewing}
            primaryStyle={primaryStyle}
            onReorderBlocks={actions.handleReorderBlocks}
            onError={(error) => {
              toast({
                title: "Erro na visualização",
                description: error,
                variant: "destructive"
              });
            }}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => selectBlock(null)}
            onUpdate={actions.handleUpdateBlock}
            onDelete={actions.handleDeleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {isGlobalStylesOpen && resultPageConfig && (
        <GlobalStylesEditor
          globalStyles={resultPageConfig.globalStyles || {}}
          onSave={(styles) => {
            actions.updateSection('globalStyles', styles);
            actions.toggleGlobalStyles();
          }}
          onCancel={actions.toggleGlobalStyles}
        />
      )}
    </div>
  );
};

export default ResultEditorPanel;


          <div>
            <label className="text-sm font-medium text-[#432818]">Animação de Entrada</label>
            <Select
              value={resultData.animations.entrance.type}
              options={[
                { label: 'Fade', value: 'fade' },
                { label: 'Slide', value: 'slide' },
                { label: 'Zoom', value: 'zoom' }
              ]}
              onChange={(value) => handleChange('animations', {
                ...resultData.animations,
                entrance: { ...resultData.animations.entrance, type: value }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select animation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Replace other Select components with this pattern */}
          <div>
            <label className="text-sm font-medium text-[#432818]">Shadows Intensity</label>
            <Select
              value={resultData.styles.shadows.intensity}
              onValueChange={(value) => handleChange('styles', {
                ...resultData.styles,
                shadows: { ...resultData.styles.shadows, intensity: value }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select shadow intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="strong">Strong</SelectItem>
              </SelectContent>
            </Select>
          </div>
