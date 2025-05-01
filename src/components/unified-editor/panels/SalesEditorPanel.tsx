
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r bg-white p-3">
          <h2 className="text-base font-medium mb-3">Componentes de Vendas</h2>
          <p className="text-sm text-gray-500">
            Esta parte do editor está em desenvolvimento. Em breve você poderá arrastar e soltar componentes para criar sua página de vendas.
          </p>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Main preview area */}
      <ResizablePanel defaultSize={60}>
        <ScrollArea className="h-full p-3 bg-slate-50">
          <div className="bg-white shadow-sm rounded-lg p-6 min-h-[500px] flex items-center justify-center">
            <div className="text-center max-w-md">
              <h2 className="text-lg font-medium mb-2">Editor de Página de Vendas</h2>
              <p className="text-gray-500 text-sm mb-4">
                O editor visual de página de vendas está em desenvolvimento. Logo mais você poderá criar e editar suas ofertas.
              </p>
              <button
                onClick={() => toast({
                  title: "Funcionalidade em desenvolvimento",
                  description: "O editor de página de vendas estará disponível em breve."
                })}
                className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Saiba mais
              </button>
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Properties panel */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-l bg-white p-3">
          <h2 className="text-base font-medium mb-3">Propriedades</h2>
          <p className="text-sm text-gray-500">
            Selecione um elemento da página de vendas para editar suas propriedades.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SalesEditorPanel;
