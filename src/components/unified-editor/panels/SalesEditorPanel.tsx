
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { Button } from '@/components/ui/button';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle 
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <UnifiedComponentsSidebar
          activeTab="sales"
          onComponentSelect={() => {}}
          activeStageType={null}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={55}>
        <div className="h-full bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md text-center max-w-md">
            <h3 className="text-xl font-semibold mb-4">Editor de Página de Vendas</h3>
            <p className="mb-6 text-gray-600">
              O editor de página de vendas está em desenvolvimento. Em breve você poderá criar
              lindas páginas de vendas conectadas aos resultados do seu quiz.
            </p>
            <Button>Explorar Templates</Button>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={25}>
        <div className="h-full border-l border-gray-200 bg-white p-4">
          <h3 className="font-medium text-lg mb-4">Propriedades</h3>
          <p className="text-gray-500 text-sm">
            Selecione um componente na página para editar suas propriedades.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SalesEditorPanel;
