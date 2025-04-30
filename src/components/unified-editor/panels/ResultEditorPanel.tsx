
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';

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
    actions
  } = useResultPageEditor(primaryStyle.category);

  if (isPreviewing && !blocks.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#8F7A6A] text-lg">
          Nenhum bloco para visualizar. Adicione blocos para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Painel esquerdo - Biblioteca de componentes */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={actions.handleAddBlock} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Painel central - Preview */}
        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={selectBlock}
            isPreviewing={isPreviewing}
            primaryStyle={primaryStyle}
            onReorderBlocks={actions.handleReorderBlocks}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Painel direito - Propriedades */}
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

      {/* Modal de Estilos Globais */}
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
