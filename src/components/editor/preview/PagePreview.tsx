
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { EyeIcon, Smartphone, Monitor, PlusIcon } from 'lucide-react';
import { EditorBlock } from '@/types/editor';

interface PagePreviewProps {
  primaryStyle: StyleResult;
  onSelectComponent: (id: string) => void;
  blocks: EditorBlock[];
  onAddBlock: () => void;
}

const PagePreview = ({ primaryStyle, onSelectComponent, blocks, onAddBlock }: PagePreviewProps) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  const renderBlockContent = (block: EditorBlock) => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="space-y-3 p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.title && (
              <h2 className="text-3xl font-playfair text-[#432818]">{block.content.title}</h2>
            )}
            {block.content.subtitle && (
              <p className="text-xl text-[#8F7A6A]">{block.content.subtitle}</p>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.imageAlt || "Imagem"} 
                className="max-w-full rounded-md"
              />
            ) : (
              <div className="h-40 bg-[#F0EBE5] rounded-md flex items-center justify-center text-[#8F7A6A]">
                Imagem Placeholder
              </div>
            )}
          </div>
        );
      case 'benefits':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-4">Benefícios</h3>
            <div className="space-y-2">
              {(block.content.items || ['Benefício 1', 'Benefício 2', 'Benefício 3']).map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#B89B7A] flex-shrink-0 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-4">Depoimentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(num => (
                <div key={num} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="italic text-[#432818]">"Este produto transformou meu estilo completamente!"</p>
                  <p className="font-medium mt-2">Cliente {num}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <p className="text-[#8F7A6A]">Bloco do tipo: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      {/* Preview Toolbar */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-[#FAF9F7]' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-[#FAF9F7]' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Canvas */}
      <div className={`flex-1 overflow-y-auto p-8 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
        <div className="min-h-full bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6">
          {blocks.length > 0 ? (
            <div className="space-y-6">
              {blocks.map((block) => (
                <div key={block.id} className="relative">
                  {renderBlockContent(block)}
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center h-64 text-[#8F7A6A] text-sm border-2 border-dashed border-[#B89B7A]/40 rounded-lg"
            >
              <p className="mb-4">Arraste componentes para esta área</p>
              <Button 
                variant="outline"
                onClick={onAddBlock}
                className="border-[#B89B7A] text-[#B89B7A]"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Adicionar Componente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
