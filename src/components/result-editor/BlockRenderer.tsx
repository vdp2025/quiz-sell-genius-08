
import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StyleResult } from '@/types/quiz';

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
  primaryStyle: StyleResult;
}

export function BlockRenderer({
  block,
  isSelected,
  onSelect,
  isPreview,
  primaryStyle
}: BlockRendererProps) {
  return (
    <div
      onClick={() => !isPreview && onSelect()}
      className={cn(
        "group relative p-4 mb-4 rounded-lg transition-all duration-200",
        !isPreview && "cursor-pointer hover:bg-[#FAF9F7]",
        !isPreview && isSelected && "ring-2 ring-[#B89B7A] bg-[#FAF9F7]",
        !isPreview && "border-2 border-dashed border-[#B89B7A]/40"
      )}
    >
      {/* Block Content */}
      {renderBlockContent(block, primaryStyle)}

      {/* Edit Controls */}
      {!isPreview && isSelected && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="text-[#8F7A6A]">
            Editar
          </Button>
        </div>
      )}
    </div>
  );
}

function renderBlockContent(block: Block, primaryStyle: StyleResult) {
  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-2">
          {block.content.title && (
            <h2 className="text-2xl md:text-4xl font-playfair text-[#aa6b5d]">
              {block.content.title}
            </h2>
          )}
          {block.content.subtitle && (
            <p className="text-[#3a3a3a] text-lg md:text-xl">{block.content.subtitle}</p>
          )}
        </div>
      );
    case 'text':
      return <p className="text-[#432818]">{block.content.text}</p>;
    case 'image':
      return block.content.imageUrl ? (
        <img
          src={block.content.imageUrl}
          alt={block.content.imageAlt || ''}
          className="max-w-full rounded-lg mx-auto"
        />
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center rounded-lg">
          <p className="text-gray-400">Selecione uma imagem</p>
        </div>
      );
    case 'style-result':
      return (
        <div className="p-4 bg-[#ffefec] rounded-lg inline-block">
          <p className="text-[#aa6b5d] font-medium">
            Seu estilo predominante é <span className="font-semibold">{primaryStyle.category}</span>
          </p>
        </div>
      );
    case 'benefits':
      return (
        <div>
          <h3 className="text-xl font-bold mb-3 text-[#aa6b5d]">{block.content.title || 'Benefícios'}</h3>
          <ul className="space-y-2">
            {(block.content.items || []).map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#aa6b5d] mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'pricing':
      return (
        <div className="text-center space-y-4 p-6 bg-[#ffefec] rounded-lg">
          <div className="space-y-2">
            {block.content.regularPrice && (
              <p className="text-[#666] line-through">
                De R$ {block.content.regularPrice}
              </p>
            )}
            {block.content.salePrice && (
              <p className="text-2xl font-bold text-[#aa6b5d]">
                Por R$ {block.content.salePrice}
              </p>
            )}
          </div>
          <Button className="bg-[#aa6b5d] hover:bg-[#965c4f] text-white w-full py-6">
            {block.content.buttonText || 'Comprar Agora'}
          </Button>
        </div>
      );
    default:
      return (
        <p className="text-[#8F7A6A]">Bloco tipo: {block.type}</p>
      );
  }
}
