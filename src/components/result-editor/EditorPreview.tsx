
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Block } from '@/types/editor';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks?: (sourceIndex: number, destinationIndex: number) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
}) => {
  return (
    <div className="h-full overflow-auto bg-[#FAF9F7] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px]">
          {blocks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#8F7A6A] text-center p-10">
              <p className="mb-4">Adicione componentes do painel lateral para começar a construir sua página de resultados.</p>
              <p className="text-sm">Clique em um componente para adicioná-lo aqui.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${
                    selectedBlockId === block.id
                      ? 'border-[#B89B7A]'
                      : isPreviewing
                      ? 'border-transparent'
                      : 'border-dashed border-gray-300 hover:border-[#B89B7A]/50'
                  }`}
                  onClick={() => !isPreviewing && onSelectBlock(block.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-[#8F7A6A]">
                      {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                    </div>
                  </div>
                  
                  {block.type === 'header' && (
                    <div className="text-center py-4">
                      <h1 className="text-2xl font-bold text-[#432818]">{block.content.title || 'Título do Cabeçalho'}</h1>
                      {block.content.subtitle && (
                        <p className="text-[#8F7A6A] mt-2">{block.content.subtitle}</p>
                      )}
                    </div>
                  )}
                  
                  {block.type === 'headline' && (
                    <div className="text-center py-4">
                      <h2 className="text-xl font-bold text-[#432818]">{block.content.title || 'Título Principal'}</h2>
                      {block.content.subtitle && (
                        <p className="text-[#8F7A6A] mt-2">{block.content.subtitle}</p>
                      )}
                    </div>
                  )}
                  
                  {block.type === 'text' && (
                    <p className="py-2">{block.content.text || 'Texto do bloco'}</p>
                  )}
                  
                  {block.type === 'style-result' && (
                    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#FAF9F7] rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#432818] mb-2">
                          Estilo {primaryStyle.category}
                        </h3>
                        <p className="text-[#8F7A6A]">
                          {block.content.description || 'Descrição personalizada do estilo predominante.'}
                        </p>
                      </div>
                      <div className="w-full md:w-1/3">
                        {block.content.customImage ? (
                          <img 
                            src={block.content.customImage} 
                            alt="Imagem personalizada" 
                            className="w-full h-auto rounded-lg" 
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Imagem do estilo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
