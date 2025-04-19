
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { StyleResultSection } from '@/components/result/StyleResult';
import StyleHeroBlockPreview from '@/components/result-editor/block-previews/StyleHeroBlockPreview';
import StyleOfferBlockPreview from '@/components/result-editor/block-previews/StyleOfferBlockPreview';

interface BlockRendererProps {
  block: EditorBlock;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
  primaryStyle?: StyleResult;
}

export function BlockRenderer({
  block,
  isSelected,
  onSelect,
  isPreview,
  primaryStyle
}: BlockRendererProps) {
  // Create mock secondary styles for preview
  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Contemporâneo', score: 4, percentage: 30 },
    { category: 'Clássico', score: 3, percentage: 20 }
  ];

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
      {renderBlockContent(block, primaryStyle, mockSecondaryStyles)}

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

function renderBlockContent(block: EditorBlock, primaryStyle?: StyleResult, secondaryStyles?: StyleResult[]) {
  if (!primaryStyle) {
    return <div>Carregando...</div>;
  }

  switch (block.type) {
    case 'headline':
      return (
        <div className="space-y-2">
          {block.content.title && (
            <h2 className="text-2xl font-playfair text-[#432818]">
              {block.content.title}
            </h2>
          )}
          {block.content.subtitle && (
            <p className="text-[#8F7A6A]">{block.content.subtitle}</p>
          )}
        </div>
      );
    case 'text':
      return <p className="text-[#432818]">{block.content.text}</p>;
    case 'style-result':
      return (
        <StyleResultSection
          primaryStyle={primaryStyle}
          description={block.content.description || styleConfig[primaryStyle.category].description}
          image={block.content.imageUrl || styleConfig[primaryStyle.category].image}
          secondaryStyles={secondaryStyles || []}
        />
      );
    case 'style-hero':
      return <StyleHeroBlockPreview content={block.content} styleType={primaryStyle?.category || 'Natural'} />;
    case 'offer':
      return <StyleOfferBlockPreview content={block.content} />;
    default:
      return (
        <p className="text-[#8F7A6A]">Bloco tipo: {block.type}</p>
      );
  }
}
