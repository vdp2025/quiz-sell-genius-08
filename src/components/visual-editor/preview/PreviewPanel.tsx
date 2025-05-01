
import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelect: (id: string) => void;
}

export function PreviewPanel({ blocks, selectedBlockId, onSelect }: PreviewPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="p-4 border-b border-[#B89B7A]/20">
        <h2 className="font-semibold text-[#432818]">Visualização</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        <div className="min-h-full bg-white rounded-lg shadow-sm p-6">
          {blocks.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
              <p className="text-[#8F7A6A]">Adicione componentes usando o painel lateral</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blocks.sort((a, b) => a.order - b.order).map(block => (
                <div 
                  key={block.id}
                  className={cn(
                    "p-4 border rounded transition-colors",
                    selectedBlockId === block.id 
                      ? "border-[#B89B7A] bg-[#FAF9F7]" 
                      : "border-gray-200 hover:border-[#B89B7A]/50"
                  )}
                  onClick={() => onSelect(block.id)}
                >
                  <h3 className="font-medium text-[#432818] mb-1">{block.type}</h3>
                  
                  {block.content.title && (
                    <p className="text-sm text-[#8F7A6A] line-clamp-1">
                      {block.content.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
